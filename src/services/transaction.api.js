import axios from 'axios';

class TransactionAPIService {
	constructor() {
		this.baseURL = import.meta.env.VITE_API_URL;
		this.authToken = localStorage.getItem('authToken');
	}

	createTransaction(userId, total, cart) {
		return axios.post(`${this.baseURL}/api/checkout`, userId, total, cart, {
			headers: {
				Authorization: `Bearer ${this.authToken}`,
			},
		});
	}
}

export default TransactionAPIService;
