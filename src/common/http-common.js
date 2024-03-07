import axios from "axios";
const baseURl = "http://3.1.195.111:8080/api"

export const jsonRequest = axios.create({
    baseURL: baseURl,
    headers: {
        "Content-type": 'application/json',
        processData: false
    }
});

export default axios.create({
    baseURL: baseURl,
    headers: {
        enctype:"multipart/form-data",
        "Content-type": false,
        processData: false
    }
});