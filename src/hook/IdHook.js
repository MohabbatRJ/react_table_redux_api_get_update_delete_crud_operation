import { useEffect, useState } from "react";
import { GetApiDataById } from "../api/axioisRequest";

export default (props) =>{

    const [dataById, setDataByid] = useState({})

    const getDataByHooks = (requestId) => {
        console.log('Get request id ....', requestId)
            return GetApiDataById(requestId).then((response) => {
                console.log("Get ID Response Data....", response);
                setDataByid(response)
            });
    };

    useEffect(() => {
        getDataByHooks(props);
    }, [props]);
        return [dataById];
}


