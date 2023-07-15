import axios from "axios"
import authHeader from "@/service/auth-header";
export class GetDataService {
    static serverURL = `http://localhost:8080`

    static getProfile() {
        return axios.get(`${this.serverURL}/get-data/profile`)
    }

    static update(profile) {
        return axios.post(`${this.serverURL}/home/update`, profile, { headers: authHeader() })
    }

    static createStory(story) {
        return axios.post(`${this.serverURL}/story`, story, { headers: authHeader() })
    }

    static getStory() {
        return axios.get(`${this.serverURL}/get-data/story`)
    }
}
