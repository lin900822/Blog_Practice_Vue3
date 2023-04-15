const base = {
    baseUrl: "http://localhost:8080",
    login: "/auth/login",
    getUser: "/auth/user",
    register: "/auth/register",
    isAdmin: "/auth/isAdmin",
    saveArticle: "/article/save",
    uploadFile: "/upload/file",
    getArticleDetail: "/article",
    getAllArticles: "/article/all",
    deleteArticle: "/article/delete",
    getAllCategoriesTree: "/category/getAllCategoriesTree",
    addCategory: "/category/add",
    deleteCategory: "/category/delete"
}

export default base;