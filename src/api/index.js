import path from "./path.js";
import axios from "axios";

export default {
    login(username, password){
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        return axios.post(path.baseUrl + path.login, formData);
    },
    getUser(){
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.getUser, formData);
    }
}