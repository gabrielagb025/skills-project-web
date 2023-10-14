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

    const [isEditing, setIsEditing] = useState(false);
    const [postIdToEdit, setPostIdToEdit] = useState(null);

    const [messageError, setMessageError] = useState("");

    /*IMAGES*/
    const [showInputFile, setShowInputFile] = useState(false);
    const [showImgBtn, setShowImgBtn] = useState(true);
    const [files, setFiles] = useState([]);
    const [messageImg, setMessageImg] = useState("");

    /*URLS*/
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [showUrlBtn, setShowUrlBtn] = useState(true);
    const [urlInput, setUrlInput] = useState('');
    const [urlsElem, setUrlsElem] = useState([]);
    const [messageUrl, setMessageUrl] = useState("");

    const { updateDescription } = props

    useEffect(() => {
        setDescription(prevDesc => ({
            ...prevDesc,
            images: files,
            urls: urlsElem
        }));
        handleMaxFiles();
        handleMaxUrls();
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

     /*IMAGES*/

     const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
            handleMaxFiles();
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png']
        },
    });

    const showInputHandler = () => {
        setShowInputFile(true);
    }

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name));
        handleMaxFiles();
    }

    const handleMaxFiles = () => {
        if (files.length >= 8) {
            setShowInputFile(false);
            setMessageImg("No puedes agregar más de 4 imágenes");
            setShowImgBtn(false);
        } else {
            setMessageImg(" ");
            setShowImgBtn(true);
        }
    }

    /*URLS*/ 
    const showUrlInputHandler = () => {
        setShowUrlInput(true);
    }

    const handleUrlInputChange = (event) => {
        event.preventDefault()
        setUrlInput(event.target.value);
    };

    const handleMaxUrls = () => {
        if (urlsElem.length >= 4) {
            setShowUrlInput(false);
            setMessageUrl("No puedes agregar más de 4 urls");
            setShowUrlBtn(false)
        } else {
            setMessageUrl("");
            setShowUrlBtn(true)
        }
    }

    const handleAddUrl = () => {
        if (urlInput.trim() !== '') {
            setUrlsElem(prevUrls => [...prevUrls, urlInput.trim()]);
            setUrlInput('');
        }
        handleMaxUrls();
    };

    const handleDeleteUrl = (urlToDelete) => {
        setUrlsElem(prevUrls => prevUrls.filter(url => url !== urlToDelete));
        handleMaxUrls();
    }

    return (
        <div className="PostInput post-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label id="description" className="form-label">Descripción</label>
                    <input onChange={handleChange} id="description" type="text" name="description" className={`form-control ${messageError && 'is-invalid'}`} placeholder="Descripción..." value={description.description} onFocus={handleFocus} onBlur={handleBlur} />
                    {messageError && <div className="text-danger">{messageError}</div>}
                </div>
                <div className="multimedia-buttons d-flex justify-content-around">
                    {showImgBtn && <button type="button" className="btn btn-primary" onClick={showInputHandler}>Imágenes</button>} {files.length >= 4 && <div className="text-danger">{messageImg}</div>}
                </div>
                {/* Images */}
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
                    {/* Urls */}
                    <div className="mb-3">
                        {showUrlBtn && <button type="button" className="btn btn-primary" onClick={showUrlInputHandler}>Urls</button>}
                        {showUrlInput && <>
                            <input
                                id="urls"
                                type="text"
                                className="form-control"
                                placeholder="Ingrese la URL"
                                value={urlInput}
                                onChange={handleUrlInputChange}
                            />
                            <button type="button" className="btn btn-primary mt-2" onClick={handleAddUrl}>Agregar</button></>} {urlsElem.length >= 4 && <div className="text-danger">{messageUrl}</div>}
                        {urlsElem ? urlsElem.map((url, index) => (
                            <div className="d-flex mt-2" key={index}>
                                <p>{url}</p>
                                <button onClick={() => handleDeleteUrl(url)} className="btn btn-danger">Delete</button>
                            </div>
                        )) : (null)}

                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    )
}

export default DescriptionInput;