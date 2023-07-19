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
            <div style={{ margin: '20px' }}>
                <h1>Product Search</h1>
                <label>Enter Product Title : </label>
                <input type="text"
                    name="title"
                    value={this.state.search.title}
                    onChange={this.changeHandler}
                />
                <br /><br />
                <button type="button" class="btn btn-outline-primary" onClick={this.showResults}>Search</button>
                <br /><br />
                {   
                    this.state.searches.map((s, index) => {
                        return (
                            <div key={index}>
                                {/* <hr />
                                <h3>Search Results</h3>
                                <hr /> */}
                                <div className="card" style={{ width: "30rem" }}>
                                    <div className="card-header">
                                        {s.title}
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{s.price}</li>
                                        <li className="list-group-item">{s.tagline}</li>
                                        <li className="list-group-item">{s.description}</li>
                                    </ul>
                                </div>
                                <br/><br/>
                            </div>

                        );
                    })
                }
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