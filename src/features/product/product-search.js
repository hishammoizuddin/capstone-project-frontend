import axios from "axios";
import { Component } from "react";

class Search extends Component {

    constructor() {
        super();
        this.state = {
            searches: [],
            errorMsg: '',

            search: {
                title: '',
                tagline: '',
                price: '',
                description: '',
            },

        }

    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-primary rounded shadow">
                            <div className="card-header bg-primary text-white rounded-top">Product Search</div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Enter Product Title:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="title"
                                            value={this.state.search.title}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-primary mt-3" onClick={this.showResults}>Search</button>
                                </form>
                            </div>
                        </div>
                        <div className="mt-5">
                            {
                                this.state.searches.map((s, index) => {
                                    return (
                                        <div className="card border-primary mb-3" key={index}>
                                            <div className="card-header bg-primary text-white rounded-top">{s.title}</div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">{s.price}</li>
                                                <li className="list-group-item">{s.tagline}</li>
                                                <li className="list-group-item">{s.description}</li>
                                            </ul>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    

    showResults=()=>{
        axios.get('http://localhost:8181/product/search/'+this.state.search.title)
        .then(response => {
            this.setState({
                searches: response.data
            })
            console.log(response.data)
        })
        .catch(err => {
            this.setState({
                errorMsg: err.msg
            })
        })
        .finally(() => {
            //always gets executed
        })

    }

    changeHandler = (e) => {
        this.setState({
            search: {
                ...this.state.search,
                [e.target.name]: e.target.value
            }
        })
    }


}

export default Search;