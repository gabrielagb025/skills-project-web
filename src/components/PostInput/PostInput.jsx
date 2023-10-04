import './PostInput.css'
import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";
import { createPost } from '../../services/PostService';

const initialValues = {
    message: "",
    multimedia: []
}

const PostInput = () => {

    const [post, setPost] = useState(initialValues);
    const [files, setFiles] = useState([]);
    const [selectedFileType, setSelectedFileType] = useState(null);

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
        
        const formData = new FormData();
        formData.append('message', post.message);
        post.multimedia.forEach((image) => {
            formData.append('multimedia', image);
        })
        console.log(formData);
        createPost(formData)
          .then(() => {
            setPost(initialValues)
            setFiles([])
          })
          .catch(err => console.error(err))
      }
    
    /*const handleFileSelect = (fileType, event) => {
        event.preventDefault()
        setSelectedFileType(fileType)
    }*/

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
            'image/*' : []
        }
        /*accept: selectedFileType === 'image' ? 'image/*' : 
            selectedFileType === 'video' ? 'video/*' : 
            selectedFileType === 'document' ? '.pdf,.doc,.docx' : 
            selectedFileType === 'audio' ? 'audio/*' : ''*/
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
                    <input onChange={handleChange} id="post-message" type="text" name="message" className="form-control" placeholder="Publicación..." value={post.message} />
                </div>
                {/*<div className="multimedia-buttons d-flex justify-content-around">
                    <button className="btn btn-primary" onClick={() => handleFileSelect('image', event)}>Imágenes</button>
                    <button className="btn btn-primary" onClick={() => handleFileSelect('video', event)}>Vídeo</button>
                    <button className="btn btn-primary" onClick={() => handleFileSelect('document', event)}>Documento</button>
                    <button className="btn btn-primary" onClick={() => handleFileSelect('audio', event)}>Audio</button>
                </div>*/}
                <div className="mb-3">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Coloca tus archivos aquí...</p>
                        ) : (
                            <p>Arrastra y suelta tus archivos aquí, o pulsa para seleccionar archivos.</p>
                        )}
                    </div>
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