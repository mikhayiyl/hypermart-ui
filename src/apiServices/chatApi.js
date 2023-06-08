import http from "./httpService";
const messageApi = "/messages";
const conversationApi = "/conversations";



//messages by current conversationId
export function getMessages(conversationId, token) {
    return http.get(messageApi + `/${conversationId}`, token);
}
//create a new message
export function createMessage(message) {
    return http.post(messageApi, message);
}


//current user conversations
export function getConversations(currentUserId, token) {
    return http.get(conversationApi + `/${currentUserId}`, token);
}
//specific conversation
export function getConversation(currentUserId, friendId) {
    return http.get(conversationApi + `/find/${currentUserId}/${friendId}`);
}
//start a new conversation
// senderId ==> currentUserId
export function createConversation(senderId, receiverId) {
    return http.post(conversationApi, { senderId, receiverId });
}

const messenger = {
    getMessages, createMessage, getConversations, createConversation
}

export default messenger;