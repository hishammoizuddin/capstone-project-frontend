import Footer from "../core/footer";
import AdminNavbar from "./navbar";

function Admin() {

    const processAdmin = () => {
        return (
            <div className="container" style={{ fontFamily: "bold", fontSize: '18px' }}>
                <div className="text-center">
                    Welcome {localStorage.getItem('username').split("@")[0]}, Email: {localStorage.getItem('username')}
                    <br />
                    <br />
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                Add Manager
                            </div>
                            <div className="card-body">
                                <p className="card-text">Add a new Manager to the Inventory Database</p>
                                <a href="/add-manager" className="btn btn-primary">Add Manager</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                Add Supplier
                            </div>
                            <div className="card-body">
                                <p className="card-text">Add a new Supplier to the Inventory Database</p>
                                <a href="/add-supplier" className="btn btn-primary">Add Supplier</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                Add Executive
                            </div>
                            <div className="card-body">
                                <p className="card-text">Add a new Executive to the Inventory Database</p>
                                <a href="/add-executive" className="btn btn-primary">Add Executive</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='mb-4'>
                <AdminNavbar />
            </div>
            {processAdmin()}
        </div>
    )

}

export default Admin; 