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
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.getUser, formData);
    },
    register(formData) {
        return axios.post(path.baseUrl + path.register, formData);
    },
    isAdmin() {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.isAdmin, formData);
    },
    saveArticle(formData) {
        let token= localStorage.getItem("token");
        formData.append("token", token);
        return axios.post(path.baseUrl + path.saveArticle, formData);
    },
    getArticleDetail(id) {
        return axios.get(path.baseUrl + path.getArticleDetail + "/" + id);
    },
    getAllArticles(pageNum) {
        return axios.get(path.baseUrl + path.getAllArticles + "?pageNum=" + pageNum);
    },
    getAllPublicArticles(pageNum) {
        return axios.get(path.baseUrl + path.getAllPublicArticles + "?pageNum=" + pageNum);
    },
    getArticlesByCategories(category, pageNum) {
        return axios.get(path.baseUrl + path.getArticlesByCategories + "?category=" + category + "&pageNum=" + pageNum);
    },
    deleteArticle(id) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.deleteArticle + "/" + id, formData);
    },
    getAllCategoriesTree() {
        return axios.get(path.baseUrl + path.getAllCategoriesTree);
    },
    addCategory(name, ancestorId) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("token", token);
        if (ancestorId != null)
            formData.append("ancestorId", ancestorId);

        return axios.post(path.baseUrl + path.addCategory, formData);
    },
    deleteCategory(id) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.deleteCategory + "/" + id, formData);
    },
    uploadFile(file) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        formData.append('multipartFile', file);
        return axios.post(path.baseUrl + path.uploadFile, formData);
    },
    getAllResources(pageNum, pageSize) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.getAllResources + "?pageNum=" + pageNum + "&pageSize=" + pageSize, formData);
    },
    deleteResource(id) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        return axios.post(path.baseUrl + path.deleteResource + "/" + id, formData);
    },
    getBasic() {
        return axios.get(path.baseUrl + path.getBasic);
    },
    saveBasic(websiteName, websiteThumbnail) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        formData.append("websiteName", websiteName);
        formData.append("websiteThumbnail", websiteThumbnail);
        return axios.post(path.baseUrl + path.saveBasic, formData);
    },
    addComment(comment, articleId) {
        let token= localStorage.getItem("token");
        const formData = new FormData();
        formData.append("token", token);
        formData.append("comment", comment);
        formData.append("articleId", articleId);
        return axios.post(path.baseUrl + path.addComment, formData);
    },
    getCommentsByArticleId(articleId) {
        return axios.get(path.baseUrl + path.getCommentsByArticleId + "?articleId=" + articleId);
    }
}