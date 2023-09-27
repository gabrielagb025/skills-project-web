const UserCard = ({ props }) => {
    return (
        <div className="card" style="width: 100%;">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="..." className="card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;