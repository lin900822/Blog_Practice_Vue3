const base = {
    baseUrl: "http://localhost:8080",
    login: "/auth/login",
    getUser: "/auth/user",
    register: "/auth/register",
    isAdmin: "/auth/isAdmin",
    saveArticle: "/article/save",
    uploadFile: "/resource/upload",
    getArticleDetail: "/article",
    getAllArticles: "/article/all",
    getAllPublicArticles: "/article/allPublic",
    getArticlesByCategories: "/article/category",
    deleteArticle: "/article/delete",
    getAllCategoriesTree: "/category/getAllCategoriesTree",
    addCategory: "/category/add",
    deleteCategory: "/category/delete",
    getAllResources: "/resource/allResources",
    deleteResource: "/resource/delete",
    getBasic: "/basic",
    saveBasic: "/basic/save"
}

export default base;