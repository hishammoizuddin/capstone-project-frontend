const CheckoutCard = ({ product, promptRemove }) => {
    const selectImage = (cid) => {
        // Just placeholders for images, if time permits will change this to maybe using S3 bucket
        if (cid === 1) {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrW1oog8OnHiaZNzgGv3Qpn6VUWyayICtMSbUFhbOjUeyGIj8PcNTfFtp1_VBK19RKjN4&usqp=CAU"
        } else if (cid === 2) {
            return "https://t4.ftcdn.net/jpg/01/67/28/69/360_F_167286969_jAEAfUY47qQ1SHqf1SyqSYypOsl0fWYF.jpg"
        } else {
            return "https://i5.walmartimages.com/asr/16062593-5d6a-4293-966e-a0757d011a5a.1a4af15cf03d358ec950a03e5c8ba5e8.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
        }
    }
    return (
        <div className="col-sm-6 col-lg-8 col-md-8 mb-4">
            <div className="card">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-6 col-lg-6 col-md-6 d-flex justify-content-center">
                        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                            <img alt='' src={selectImage(product.category.id)} className="img-fluid" style={{height: "160px"}}/>
                            <a href="#!">
                                <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15", }}></div>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-6 col-md-6">
                        <div className="card-body">
                            <h5 className="card-title"> {product.title} </h5>
                            <p className="card-text"> {product.tagline} </p>
                            <p className="card-text"> {product.description} </p>
                            <p className="card-text"> Price: {product.price}$ </p>
                            {/* <div className="row">
                                <div className="col-sm-6 col-lg-6 col-md-6">
                                    <input type="number" id="typeNumber" class="form-control" />
                                    <label className="form-label" for="typeNumber"> Quantity </label>
                                </div>
                            </div> */}
                            <a href="#!" className="btn btn-primary" onClick={()=>promptRemove(product.id)}>Remove from Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCard;