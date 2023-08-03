import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
    login(password) {
        return axios
            .post(API_URL + 'login', {
                username: 'admin',
                password: password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
        return true;
    }
}

export default new AuthService();
