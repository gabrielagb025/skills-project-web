import './InputGroup.css'

const InputGroup = (props) => {
    return (
        <div className="has-validation mt-3 mb-3">
            <label htmlFor={props.name} className="form-label">{props.label}</label>
            <input
                type={props.type}
                className={`form-control ${props.error ? "is-invalid" : ""}`}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            {props.error && <p className="invalid-feedback">{props.error}</p>}
        </div>
    )
}

export default InputGroup;