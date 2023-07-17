import { Component } from "react";

class Main extends Component{

    constructor(){
        super();
        this.state={
            arry:[4,7,2,5,9,1,6],
            count:0
        }
    }

    // must always have a render function
    render(){   // must return JSX - (JS + HTML)
        return (
            <div style={{margin: '10px'}}>
              <h1>Welcome to React class component</h1>
              {
                this.state.arry.map((e,index) => {
                    return(
                        <li key={index}>{e}</li> 
                    )
                })
              }
              <hr/>
              <button onClick={()=>{this.sortArray('ASC')}}>Sort - ASC</button>
              <button onClick={()=>{this.sortArray('DESC')}}>Sort - DESC</button>
            </div>
          );
    }

    sortArray(direction) {
        let arrLocal = this.state.arry
        switch(direction) {
            case 'ASC':
                arrLocal.sort((a, b) => a - b)  //Ascending order
                break;
            case 'DESC':
                arrLocal.sort((a, b) => b - a)  //Descending order
                break;
            default:
                break;
        }
        this.setState({
            arry: arrLocal
        })

    }

}

export default Main;