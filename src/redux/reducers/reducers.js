import { DELETE_API_DATA, GET_API_DATA, UPDATE_API_DATA } from "../constant/actionTypes";
const initialState = {
    userData: [],
    isDeleteResponse: false,
    isUpdateResponse: false,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_API_DATA:
            console.log("Get Reducer called")
            return{
                ...state,
                userData:  action.payload,
            }
        case DELETE_API_DATA:
                console.log("Delete Reducer called")
                return{
                    ...state,
                    isDeleteResponse: action.payload,
                }
        case UPDATE_API_DATA:
                    console.log("Update Reducer called")
                    return{
                        ...state,
                        isUpdateResponse: action.payload
                    }
        default:
                return state
        }
}

export default Reducer;