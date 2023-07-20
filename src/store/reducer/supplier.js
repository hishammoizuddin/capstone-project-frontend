const initialState={
    list : []
}
const supplier = (state = initialState, action)=>{
    if(action.type === 'GET_ORDER_LIST'){
        //give the payload to the state.list
        return {...state, list: action.payload }
    }

    return state;
}

export default supplier;
/* action here is what is dispatched from action file, 
    action = {
        type: 'GET_ORDER_LIST',
        payload: orders
    }
*/