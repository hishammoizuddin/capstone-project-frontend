const initialState={
    list : []
}

const manager = (state = initialState, action)=>{
    if(action.type === 'GET_ORDER_LIST'){
        //give the payload to the state.list
        return {...state, list: action.payload }
    }
    if(action.type==='UPDATE_STATUS'){
        //destructure the payload, meaning read values from payload object 
        const {orderId,status} = action.payload;
       //list =[o1,o2,o3,o4]
        //Step 1: find the object from the list - o1
        const orderObj =  state.list.find(o=>o.id === orderId); 

        //Step 2: remove the object we want to update from the list - [o2,o3,o4]
        const tempList = state.list.filter(o=>o.id !== orderId);  //orderObj is removed.

        //step 3: make a clone and update object by setting new status - o1.status=status
        const clonedObj =  Object.assign({},orderObj);
        clonedObj.status = status; 

        //step 4: push the object back into list clone - ...state.list.push(o1)
        tempList.push(clonedObj);  //[o1,o2,o3,o4]

        //step 5: return new list 
        return {...state, list:  tempList}
   }
     
    return state;
}

export default manager;