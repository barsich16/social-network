import * as axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a908b01d-1746-4d5a-b05c-fc0d2f121e8c"
    }
});

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return instanceAxios.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId) {
        return instanceAxios.post(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId) {
        return instanceAxios.delete(`follow/${userId}`).then(response => response.data)
    }
}
export const profileAPI = {
    getUserProfile(userId) {
        return instanceAxios.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instanceAxios.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instanceAxios.put(`profile/status`, {status});
    }
}
export const authAPI = {
    getAuthUserData() {
        return instanceAxios.get('auth/me').then(response => response.data);
    },
    login(email, password, rememberMe) {
        return instanceAxios.post(`auth/login`, {email, password, rememberMe}).then(response => response.data);
    },
    logout() {
        return instanceAxios.delete("auth/login").then(response => response.data);
    }
}
