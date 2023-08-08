import axios from 'axios';

const API_URL = 'http://18.140.60.194:8080/';

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
