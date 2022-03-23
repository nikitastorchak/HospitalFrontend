import api from "../http";

export default class UserService{
    static async ActionGetAppointments() {
        return api.get(`/show?user_id=${localStorage.getItem('user_id')}`)
    }
}