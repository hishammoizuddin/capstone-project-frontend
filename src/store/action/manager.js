import axios from "axios";

export const getManagerOrders =()=> async (dispatch)=>{
    let token = localStorage.getItem("token"); 
    const response = await axios.get('http://localhost:8181/order/manager/all', 
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
export const updateStatus = (orderId,status)=>{
    /* Call the API and update the status */
    //this is to update the DB 
    axios.put(
        "http://localhost:8181/order/update/" +orderId + '/' + status ).then(response=> {}); 

    //this is to update the store 
    return {
        type: 'UPDATE_STATUS',
        payload: {
            'orderId' : orderId,
            'status' : status
        }
    }
}