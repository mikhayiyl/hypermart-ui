import http from "./httpService";
const api = "/products";

//all products
export function getProducts(token) {
    return http.get(api, token);
}
//products by category
// export function productCategory(category, token) {
//     return http.get(`${api}?category=${category}`, token);
// }


//specific product

export function getProduct(id) {
    return http.get(api + "/" + id);
}

export function createProduct(product) {
    //update product
    if (product._id) {
        const obj = { ...product };
        delete obj._id;
        return http.put(api + `/${product._id}`, obj);
    } else {
        // new product
        return http.post(api, product);
    }


}

//delete product
export function deleteProduct(id) {
    return http.delete(api + `/${id}`);
}

//create genre
export function createGenre(genre) {
    return http.post("/genres", genre);
};

//update genre
export function updateGenre(genre, id) {
    return http.put("/genres/" + id, genre);
};
//update category
export function updateCategory(category, id) {
    return http.put("/categories/" + id, category);
};

//delete genre
export function deleteGenre(id) {
    return http.delete("/genres/" + id);
};
//delete category
export function deleteCategory(id) {
    return http.delete("/categories/" + id);
};

//create category
export function createCategory(category) {
    return http.post("/categories", category);
};

//get genre
export function getGenres(token) {
    return http.get("/genres", token);
};

//get categories
export function getCategories(token) {
    return http.get("/categories", token);
}
//get categories
export function getCategory(id, token) {
    return http.get("/categories/" + id, token);
}
//add to wishlist
export function addWishlist(userId, productId) {
    return http.post("/wishlist", { userId, productId });
}
//remove from  wishlist
export function removeWishlist(id) {
    return http.delete("/wishlist/" + id);
}
//clear  wishlist
export function clearWishlist(id) {
    return http.delete("/wishlist/clear/" + id);
}


const product = {
    getProducts, getProduct, createProduct, deleteProduct
}

export default product;