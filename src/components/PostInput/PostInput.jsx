import './PostInput.css'
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { createPost } from '../../services/PostService';

const initialValues = {
    message: "",
    multimedia: []
}

const PostInput = (props) => {

    const [post, setPost] = useState(initialValues);
    const [files, setFiles] = useState([]);

    const [selectedFileType, setSelectedFileType] = useState(null);

    const [showInputFile, setShowInputFile] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [postIdToEdit, setPostIdToEdit] = useState(null);

    const [messageError, setMessageError] = useState("");


    const { updatePost } = props

    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            multimedia: files
        }));
    }, [files]);

    const handleChange = (ev) => {
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
            setMessageError("El comentario es obligatorio"); // Establecer el mensaje de error si el mensaje está vacío
            return;
        }

        const formData = new FormData();
        formData.append('message', post.message);
        post.multimedia.forEach((image) => {
            formData.append('multimedia', image);
        })
        console.log(formData);
        createPost(formData)
            .then(() => {
                console.log('post creado')
                setPost(initialValues)
                setFiles([])
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

    const showInputHandler = () => {
        setShowInputFile(true);
    }

    const handleFileSelect = (event, fileType) => {
        event.preventDefault();
        setSelectedFileType(fileType);
        showInputHandler();
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
            ...(selectedFileType === 'image' && {'image/*': ['.jpeg', '.png'] }),
            ...(selectedFileType === 'video' && {'video/*': ['.mp4', '.mov'] }),
            ...(selectedFileType === 'document' && {'text/*': ['.pdf', '.doc', '.docx'] }),
            ...(selectedFileType === 'audio' && {'audio/*': ['.mp3', '.wav'] })
        },
    });

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    return (
        <div className="PostInput post-form">
            <form onSubmit={handleSubmit}>
                <h4>Publica algo</h4>
                <div className="mb-3">
                    <label id="post-message" className="form-label">Comentario</label>
                    <input onChange={handleChange} id="post-message" type="text" name="message" className={`form-control ${messageError && 'is-invalid'}`} placeholder="Publicación..." value={post.message} onFocus={handleFocus} onBlur={handleBlur} />
                    {messageError && <div className="text-danger">{messageError}</div>}
                </div>
                <div className="multimedia-buttons d-flex justify-content-around">
                    <button className="btn btn-primary" onClick={(e) => handleFileSelect(e, 'image')}>Imágenes</button>
                    <button className="btn btn-primary" onClick={(e) => handleFileSelect(e,'video')}>Vídeo</button>
                    <button className="btn btn-primary" onClick={(e) => handleFileSelect(e,'document')}>Documento</button>
                    <button className="btn btn-primary" onClick={(e) => handleFileSelect(e,'audio')}>Audio</button>
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
                </div>
                <button type="submit" className="btn btn-primary">Publicar</button>
            </form>
        </div>
    )
}

export default PostInput;