import './PostInput.css'
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { createPost } from '../../services/PostService';

const initialValues = {
    message: "",
    images: [],
    urls: []
}

const PostInput = (props) => {

    const [post, setPost] = useState(initialValues);

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

    const [messageError, setMessageError] = useState("");


    const { updatePost } = props

    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            images: files,
            urls: urlsElem
        }));
        handleMaxFiles();
        handleMaxUrls();
    }, [files, urlsElem]);

    const handleChange = (ev) => {
        console.log('handleChange', ev)
        const key = ev.target.name;
        const value = ev.target.value;

        setPost(prevPost => ({
            ...prevPost,
            [key]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!post.message) {
            setMessageError("El comentario es obligatorio");
            return;
        }

        const formData = new FormData();
        formData.append('message', post.message);
        post.images.forEach((image) => {
            formData.append('multimedia', image);
        })
        post.urls.forEach((url) => {
            formData.append('urls', url);
        })
        createPost(formData)
            .then(() => {
                console.log('post creado')
                setPost(initialValues)
                setFiles([])
                setUrlsElem([])
                updatePost()
            })
            .catch(err => console.error(err))
    }

    const handleFocus = () => {
        setMessageError(""); // Ocultar el mensaje de error cuando el campo de entrada recibe foco
    };

    const handleBlur = () => {
        if (!post.message) {
            setMessageError("El comentario es obligatorio"); // Mostrar el mensaje de error si el campo de entrada está vacío cuando el usuario deja el campo
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
        if (files.length >= 4) {
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
            <form onSubmit={handleSubmit}>
                <h4 className="mb-4 text-center">Haz una publicación</h4>
                <div className="mb-3">
                    <input onChange={handleChange} id="post-message" type="text" name="message" className={`form-control ${messageError && 'is-invalid'}`} placeholder="Publicación..." value={post.message} onFocus={handleFocus} onBlur={handleBlur} />
                    {messageError && <div className="text-danger">{messageError}</div>}
                </div>
                <div className="post-input-media-container">
                    {/* Images */}
                    <div className="image-input-container">
                        {showImgBtn && <div className="btn-media"><button type="button" className="btn" onClick={showInputHandler}><i className="bi bi-card-image fs-3"></i></button></div>} {files.length >= 4 && <p>{messageImg}</p>}
                        <div className="image-input">
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
                                        <li className="mt-2" key={file.name}>
                                            <img
                                                src={file.preview}
                                                onLoad={() => {
                                                    URL.revokeObjectURL(file.preview)
                                                }}
                                                width={80}
                                            />
                                            <button className="btn delete-media ms-3" onClick={() => removeFile(file.name)}><i className="bi bi-x-circle-fill"></i></button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Urls */}
                    <div className="url-input-container mb-3">
                        {showUrlBtn && <div className="btn-media"><button type="button" className="btn" onClick={showUrlInputHandler}><i className="bi bi-link-45deg fs-3"></i></button></div>}
                        <div className="url-input mt-2">
                            {showUrlInput && <>
                                <input
                                    id="urls"
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese la URL"
                                    value={urlInput}
                                    onChange={handleUrlInputChange}
                                />
                                <div className="add-url-button mb-2">
                                    <button type="button" className="btn mt-2" onClick={handleAddUrl}>Agregar url</button>
                                </div></>} {urlsElem.length >= 4 && <p>{messageUrl}</p>}
                            <div className="url-preview">
                                {urlsElem ? urlsElem.map((url, index) => (
                                    <div className="d-flex align-items-center" key={index}>
                                        <a className="mb-0 ms-4" href={url}>{url}</a>
                                        <button id='delete-media' onClick={() => handleDeleteUrl(url)} className="btn delete-media"><i className="bi bi-x-circle-fill"></i></button>
                                    </div>
                                )) : (null)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-button d-flex justify-content-center mt-5">
                    <button type="submit" className="btn">Publicar</button>
                </div>
            </form>
        </div>
    )
}

export default PostInput;