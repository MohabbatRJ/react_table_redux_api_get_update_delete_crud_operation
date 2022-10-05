import axios from "axios"


export async function AxiosRequest(url, method, headers, params) {
    return params ? axios({
        url: url,
        method: method,
        headers: headers,
        data: params,
        timeout: 1000?"":GetApiData()
    }) :
        axios({
            url: url,
            method: method,
            headers: headers,
            data: {},
            timeout: 1000
        })
}

const GetApiData = () => {
    const apiUrl = "https://api.escuelajs.co/api/v1/products";
    const apiMethod = "GET"
    const apiHeaders = {
        "Content-Type": "application/json",
    };
    return AxiosRequest(apiUrl, apiMethod, apiHeaders, {})
};



const DeleteApiData = (id) => {
    const apiUrl = 'https://api.escuelajs.co/api/v1/products/' + id;

    const apiMethod = "DELETE"
    const apiHeaders = {
        "Content-Type": "application/json",
    };
    // console.log("updateid",id)
    // console.log("updateapi",apiUrl)
    // console.log("update method",apiMethod)
    return (
        AxiosRequest(apiUrl, apiMethod, apiHeaders, {})
        )
};


const GetApiDataById = (id) => {
    const apiUrl = 'https://api.escuelajs.co/api/v1/products/' + id;
    const apiMethod = "GET"
    const apiHeaders = {
        "Content-Type": "application/json",
    };
    return AxiosRequest(apiUrl, apiMethod, apiHeaders, {})
};



const UpdateApiData = (data, id) => {
    const apiUrl = "https://api.escuelajs.co/api/v1/products/" + id;

    const apiMethod = "PUT"
    const apiHeaders = {
        "Content-Type": "application/json",
    };
    // console.log("updateid",id)
    // console.log("updateapi",apiUrl)
    // console.log("update method",apiMethod)
    return AxiosRequest(apiUrl, apiMethod, apiHeaders, data)
};


export {GetApiData, DeleteApiData, GetApiDataById, UpdateApiData};