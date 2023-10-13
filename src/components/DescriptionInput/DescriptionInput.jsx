import './DescriptionInput.css'
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { createDescription } from '../../services/DescriptionService';

const initialValues = {
    description: "",
    images: [],
    urls: []
}

const DescriptionInput = (props) => {

    const [description, setDescription] = useState(initialValues);
    const [files, setFiles] = useState([]);

    const [showInputFile, setShowInputFile] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [postIdToEdit, setPostIdToEdit] = useState(null);

    const [messageError, setMessageError] = useState("");

    const [urlInput, setUrlInput] = useState('');
    const [urlsElem, setUrlsElem] = useState([]);

    const { updateDescription } = props

    useEffect(() => {
        setDescription(prevDesc => ({
            ...prevDesc,
            images: files,
            urls: urlsElem
        }));
    }, [files, urlsElem]);

    const handleChange = (ev) => {
        const key = ev.target.name;
        const value = ev.target.value;

        setDescription(prevDesc => ({
            ...prevDesc,
            [key]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!description.description) {
            setMessageError("La descripción es obligatioria"); // Establecer el mensaje de error si el mensaje está vacío
            return;
        }

        const formData = new FormData();
        formData.append('description', description.description);
        description.images.forEach((image) => {
            formData.append('images', image);
        });
        description.urls.forEach((url) => {
            formData.append('urls', url);
        })
        console.log(formData);
        createDescription(formData)
            .then(() => {
                setDescription(initialValues)
                setFiles([])
                setUrlsElem([])
                updateDescription()
            })
            .catch(err => console.error(err))
    }

    const handleFocus = () => {
        setMessageError(""); // Ocultar el mensaje de error cuando el campo de entrada recibe foco
    };

    const handleBlur = () => {
        if (!description.description) {
            setMessageError("La descripción es requerida"); // Mostrar el mensaje de error si el campo de entrada está vacío cuando el usuario deja el campo
        }
    };

    const showInputHandler = (e) => {
        e.preventDefault();
        setShowInputFile(true);
    }

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png']
        },
    });

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const handleUrlInputChange = (event) => {
        event.preventDefault()
        setUrlInput(event.target.value);
    };

    const handleAddUrl = () => {
        if (urlInput.trim() !== '') {
            setUrlsElem(prevUrls => [...prevUrls, urlInput.trim()]);
            setUrlInput('');
        }
    };

    const handleDeleteUrl = (urlToDelete) => {
        setUrlsElem(prevUrls => prevUrls.filter(url => url !== urlToDelete));
    }

    console.log(urlsElem)


    return (
        <div className="PostInput post-form">
            <form onSubmit={handleSubmit}  encType="multipart/form-data">
                <div className="mb-3">
                    <label id="description" className="form-label">Descripción</label>
                    <input onChange={handleChange} id="description" type="text" name="description" className={`form-control ${messageError && 'is-invalid'}`} placeholder="Descripción..." value={description.description} onFocus={handleFocus} onBlur={handleBlur} />
                    {messageError && <div className="text-danger">{messageError}</div>}
                </div>
                <div className="multimedia-buttons d-flex justify-content-around">
                    <button className="btn btn-primary" onClick={showInputHandler}>Imágenes</button>
                </div>
                <div className="mb-3">
                    {showInputFile &&
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Coloca tus archivos aquí...</p>
                            ) : (
                                <p>Arrastra y suelta tus archivos aquí, o pulsa para seleccionar archivos.</p>
                            )}
                        </div>}
                    <div className="multimedia-preview">
                        <ul className="multimedia-list">
                            {files.map(file => (
                                <li className="mt-4" key={file.name}>
                                    <img
                                        src={file.preview}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview)
                                        }}
                                    />
                                    <button className="btn btn-danger ms-3" onClick={() => removeFile(file.name)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-3">
                        <label id="urls" className="form-label">URLs</label>
                        <input
                            id="urls"
                            type="text"
                            className="form-control"
                            placeholder="Ingrese la URL"
                            value={urlInput}
                            onChange={handleUrlInputChange}
                        />
                        {urlsElem ? urlsElem.map((url, index) => (
                            <div className="d-flex mt-2" key={index}>
                            <p>{url}</p>
                            <button onClick={() => handleDeleteUrl(url)} className="btn btn-danger">Delete</button>
                            </div>
                        )): (null)}
                        <button type="button" className="btn btn-primary mt-2" onClick={handleAddUrl}>Agregar</button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}

export default DescriptionInput;