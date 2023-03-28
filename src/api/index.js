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
    },
    register(formData){
        return axios.post(path.baseUrl + path.register, formData);
    },
    isAdmin(){
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.isAdmin, formData);
    },
    createArticle(formData){
        return axios.post(path.baseUrl + path.createArticle, formData);
    },
    getArticleDetail(id){
        return axios.get(path.baseUrl + path.getArticleDetail + "/" + id);
    },
    uploadFile(file){
        const formData = new FormData();
        formData.append('multipartFile', file);
        return axios.post(path.baseUrl + path.uploadFile, formData);
    }
}