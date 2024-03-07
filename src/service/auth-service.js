import axios from 'axios';

const API_URL = 'http://3.1.195.111:8080/';

class AuthService {
    login(password) {
        return axios
            .post(API_URL + 'login', {
                username: 'canh',
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
