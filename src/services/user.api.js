import axios from 'axios';

class UserAPIService {
	constructor() {
		this.baseURL = import.meta.env.VITE_API_URL;
		this.authToken = localStorage.getItem('authToken');
	}

	getUserById(userId) {
		return axios.get(`${this.baseUrl}/api/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${this.authToken}`,
			},
		});
	}

	editUser(userId) {
		return axios.put(`${this.baseUrl}/api/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${this.authToken}`,
			},
		});
	}

	deleteUser(userId) {
		return axios.delete(`${this.baseUrl}/api/user/${userId}`, {
			headers: {
				Authorization: `Bearer ${this.authToken}`,
			},
		});
	}
}

export default UserAPIService;
