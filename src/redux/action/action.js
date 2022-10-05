import { DELETE_API_DATA, GET_API_DATA, UPDATE_API_DATA } from "../constant/actionTypes";
import { GetApiData, DeleteApiData, UpdateApiData } from "../../api/axioisRequest";

const actionGetData = () => {
    return function (dispatch) {
        return GetApiData().then((response) => {
            // console.log("Get action Response Data....", response.data);
            dispatch({
                type: GET_API_DATA,
                payload: response.data,
            });
        });
    };
};

const actionDeleteData = (id) => {
    console.log('Delete action Called....')
    return function (dispatch) {
        dispatch({
            type: DELETE_API_DATA,
            payload: false,
        });
        return DeleteApiData(id).then((response) => {
            // console.log("Delete Response Data....", response.data, 'id',id);
            dispatch({
                type: DELETE_API_DATA,
                payload: true,
            });
        }
        );
        
    };
    
};

const actionUpdateData = (request, id) => {
    console.log('Update action Called....')

    return function (dispatch) {
        dispatch({
            type: UPDATE_API_DATA,
            payload: false,
        });
        return UpdateApiData(request, id).then((response) => {
            // console.log("Update Response Data....", response.data);
            dispatch({
                type: UPDATE_API_DATA,
                payload: true,
            });
            
        });
    };
};


export  {actionGetData, actionDeleteData, actionUpdateData};