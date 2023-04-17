import path from "./path.js";
import axios from "axios";

export default {
    login(username, password) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        return axios.post(path.baseUrl + path.login, formData);
    },
    getUser() {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.getUser, formData);
    },
    register(formData) {
        return axios.post(path.baseUrl + path.register, formData);
    },
    isAdmin() {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.isAdmin, formData);
    },
    saveArticle(formData) {
        return axios.post(path.baseUrl + path.saveArticle, formData);
    },
    getArticleDetail(id) {
        return axios.get(path.baseUrl + path.getArticleDetail + "/" + id);
    },
    getAllArticles(pageNum) {
        return axios.get(path.baseUrl + path.getAllArticles + "?pageNum=" + pageNum);
    },
    getArticlesByCategories(category, pageNum) {
        return axios.get(path.baseUrl + path.getArticlesByCategories + "?category=" + category + "&pageNum=" + pageNum);
    },
    deleteArticle(id) {
        return axios.get(path.baseUrl + path.deleteArticle + "/" + id);
    },
    getAllCategoriesTree() {
        return axios.get(path.baseUrl + path.getAllCategoriesTree);
    },
    addCategory(name, ancestorId) {
        const formData = new FormData();
        formData.append("name", name);
        if (ancestorId != null)
            formData.append("ancestorId", ancestorId);

        return axios.post(path.baseUrl + path.addCategory, formData);
    },
    deleteCategory(id) {
        return axios.get(path.baseUrl + path.deleteCategory + "/" + id);
    },
    uploadFile(file) {
        const formData = new FormData();
        formData.append('multipartFile', file);
        return axios.post(path.baseUrl + path.uploadFile, formData);
    },
    getAllResources(pageNum, pageSize) {
        return axios.get(path.baseUrl + path.getAllResources + "?pageNum=" + pageNum + "&pageSize=" + pageSize);
    },
    deleteResource(id) {
        return axios.get(path.baseUrl + path.deleteResource + "/" + id);
    }
}