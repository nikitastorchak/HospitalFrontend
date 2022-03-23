import api from "../http";
import axios from "axios";

export default class AuthServise{
    static async login(login, password) {
        return api.post('/login',{login,password})
    }

    static async registration(login, password) {
        
        return api.post('/registration',{login,password})
    }

    static async logout() {
        return api.post('/logout',{})
    }
}