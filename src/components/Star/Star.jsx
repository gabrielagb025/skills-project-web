import './Star.css';

const Star = ({ selected, onSelect }) => {
    return selected ? <i className="bi rating-star bi-star-fill" onClick={onSelect}></i> : <i className="bi rating-star bi-star" onClick={onSelect}></i>
}

export default Star;