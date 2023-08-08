import axios from "axios"
import authHeader from "@/service/auth-header";
export class GetDataService {
    static serverURL = `http://52.221.184.235:8080`

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

    static getBlog() {
        return axios.get(`${this.serverURL}/get-data/getBlog`)
    }

    static getStoryById(id) {
        return axios.get(`${this.serverURL}/get-data/story/${id}`)
    }

    static getBlogById(id) {
        return axios.get(`${this.serverURL}/get-data/getBlog/${id}`)
    }

    static deleteByStoryById(id) {
        return axios.delete(`${this.serverURL}/story/${id}`, { headers: authHeader() })
    }

    static updateStory(story) {
        return axios.post(`${this.serverURL}/story/update`, story, { headers: authHeader() })
    }

    static updateBlog(blog) {
        return axios.post(`${this.serverURL}/blog/update`, blog, { headers: authHeader() })
    }

    static createBlog(blog) {
        return axios.post(`${this.serverURL}/blog`, blog, { headers: authHeader() })
    }

    static deleteBlogById(id) {
        return axios.delete(`${this.serverURL}/blog/${id}`, { headers: authHeader() })
    }
}
