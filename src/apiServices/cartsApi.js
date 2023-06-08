import http from "./httpService";
const api = "/carts";
const paymentApi = "/payments";

//all carts
export function getCarts(token) {
    return http.get(api, token);
}

//specific cart

export function getCart(id) {
    return http.get(api + "/" + id);
}

// new cart
export function createCart(cart) {
    return http.post(api, cart);
}
//update cart
export function updateCart(id, cart) {
    return http.put(api + `/${id}`, cart);
}
//delete cart
export function deleteCart(id) {
    return http.delete(api + `/${id}`);
}

//make payment request
export function makePayments(payment) {
    return http.post(paymentApi, payment);
}




const cart = {
    getCarts, getCart, createCart, updateCart, deleteCart
}

export default cart;