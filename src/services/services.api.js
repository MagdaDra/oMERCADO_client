import axios from 'axios';

class ServicesAPIService {
	constructor() {
		this.baseURL = import.meta.env.VITE_API_URL;
		this.authToken = localStorage.getItem('authToken');
	}

	getAllServices() {
		return axios.get(`${this.baseURL}/api/services`, {
			headers: {
				Authorization: `Bearer ${this.authToken}`,
			},
		});
	}

	createService(service) {
		return axios.post(`${this.baseURL}/api/services`, service, {
			headers: {
				Authorization: `Bearer ${this.authToken}`,
			},
		});
	}

	getServiceById(serviceId) {
		return axios.get(`${this.baseURL}/api/services/${serviceId}`, {
			headers: {
				Authorization: `Bearer ${this.authToken}`,
			},
		});
	}

	editService(serviceId, updatedService) {
		return axios.put(
			`${this.baseURL}/api/services/edit/${serviceId}`,
			updatedService,
			{
				headers: {
					Authorization: `Bearer ${this.authToken}`,
				},
			},
		);
	}

	deleteService(serviceId) {
		return axios
			.delete(`${this.baseURL}/api/services/${serviceId}`, {
				headers: {
					Authorization: `Bearer ${this.authToken}`,
				},
			})
			.catch((error) => {
				console.error('Error deleting the service', error);
			});
	}

	desactivateService(serviceId, desactivateService) {
		return axios.put(
			`${this.baseURL}/api/services/${serviceId}`,
			desactivateService,
			{
				headers: {
					Authorization: `Bearer ${this.authToken}`,
				},
			},
		);
	}

	getCartInfo(cart) {
		return axios.post(
			`${this.baseURL}/api/cartInfo`,
			{ cart },
			{
				headers: { Authorization: `Bearer ${this.authToken}` },
			},
		);
	}
}

export default ServicesAPIService;
