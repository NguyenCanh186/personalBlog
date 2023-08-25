import axios from "axios"
import authHeader from "@/service/auth-header";
export class GetDataService {
    static serverURL = `http://localhost:8080`

    static createNews(news) {
        return axios.post(`${this.serverURL}/news`, news, { headers: authHeader() })
    }

    static getNews(params) {
        return axios.get(`${this.serverURL}/get-data/news`, { params: params });
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
}
