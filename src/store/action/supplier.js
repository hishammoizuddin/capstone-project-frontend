import axios from "axios";

export const getSupplierOrders =()=> async (dispatch)=>{
    let token = localStorage.getItem("token"); 
    const response = await axios.get('http://localhost:8181/order/all?page=0&size=10000', 
    {
        headers:{
            'Authorization' : 'Basic ' + token
        }
    });

    let orders = response.data;
    dispatch({
        type: 'GET_ORDER_LIST',
        payload: orders
    });
}
/* 
{
    type: 'GET_ORDER_LIST',
    payload: orders
}
*/