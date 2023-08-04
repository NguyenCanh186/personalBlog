import axios from "axios"
import authHeader from "@/service/auth-header";
export class GetDataService {
    static serverURL = `http://localhost:8080`

    static createNews(news) {
        return axios.post(`${this.serverURL}/news`, news, { headers: authHeader() })
    }

    static getNews() {
        return axios.get(`${this.serverURL}/get-data/news`)
    }

    static getBlog() {
        return axios.get(`${this.serverURL}/get-data/getBlog`)
    }

    static getStoryById(id) {
        return axios.get(`${this.serverURL}/get-data/story/${id}`)
    }

    static getNewsById(id) {
        return axios.get(`${this.serverURL}/get-data/news/${id}`)
    }

    static deleteByNewsById(id) {
        return axios.delete(`${this.serverURL}/news/${id}`, { headers: authHeader() })
    }

    static updateNews(story) {
        return axios.post(`${this.serverURL}/news/update`, story, { headers: authHeader() })
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
