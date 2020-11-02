import Axios from "axios"

const baseUrl = process.env.API_URL


const ajaxSinToken = (endpoint, data, method = 'GET', headers = { 'Content-type': 'application/json' }) => {
    const url = baseUrl + endpoint;
    if (method == 'GET') {
        return Axios.get(url);
    }


    if (method == 'POST') {
        return Axios.post(url, data, { headers });
    }
 

    if (method == 'PUT') {
        return Axios.put(url, data, { headers });
    }


    if (method == 'DELETE') {
        return Axios.delete(url);
    }
}


const ajaxConToken = (endpoint, data, method = 'GET', headers = { 'Content-type': 'application/json' }) => {
    const url = baseUrl + endpoint;
    if (method == 'GET') {
        return Axios.get(url);
    }


    if (method == 'POST') {
        return Axios.post(url, data, { headers });
    }


    if (method == 'PUT') {
        return Axios.put(url, data, { headers });
    }


    if (method == 'DELETE') {
        return Axios.delete(url);
    }
}


export {
    ajaxSinToken,
    ajaxConToken
}