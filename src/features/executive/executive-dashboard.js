import { useSearchParams } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./components/home";
import Product from "./components/product";
import Sales from "./components/sales";
import Order from "./components/order";

function ExecutiveDashboard(){

    const [param] = useSearchParams();
    const process = ()=>{
        if(!param.get('page') ){
            return <div>
                <Sales /> 
            </div>
            }
            else
        if(param.get('page') === 'home' ){
        return <div>
            <Sales /> 
        </div>
        }
        else
        if(param.get('page') === 'product' ){
            return <div>
                <Product /> 
            </div>
        }
        else
        if(param.get('page') === 'sales' ){
            return <div>
                <Sales /> 
            </div>
        }
        else
        if(param.get('page') === 'order' ){
            return <div>
                <Order /> 
            </div>
        }
    }
    return(
        <div>
             <div className='mb-4'> 
                <Navbar />
            </div>
            {process()}
        </div>
    )
}
export default ExecutiveDashboard;