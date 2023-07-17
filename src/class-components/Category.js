import { Component } from "react";

class Category extends Component {

    constructor() {
        super();
        this.state = {
            category: [],
            errorMsg:''
        }
    }

    // componentDidMount method - LIFECYCLE STEP 1
    componentDidMount() {

        // API call -> fetching from url ->  spring allows localhost 3000 -> response promise is given back
        // fetch('http://localhost:8181/category/all')
        // .then(response => response.json())
        // .then(cArray =>  this.setState({
        //     category: cArray
        // }),(error)=>{
        //     console.log(error)
        //     this.setState({
        //         errorMsg : 'Something went wrong...'
        //     })
        // });
       
    }

    render() {
        return (
            <div>
                {this.state.errorMsg ===''?'':
                <div class="alert alert-primary" role="alert">
                {this.state.errorMsg}
              </div>}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Priority</th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            this.state.category.map((c, index) => {
                                return (
                                        <tr key={index}>
                                            <th scope="row">{++index}</th>
                                            <td>{c.name}</td>
                                            <td>{c.priority}</td>
                                        </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
            </div>
        )

    }

}

export default Category;