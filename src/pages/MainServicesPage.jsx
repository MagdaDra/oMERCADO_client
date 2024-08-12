import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ServicesAPIService from '../services/services.api';

const servicesService = new ServicesAPIService();

const MainServicesPage = () => {
	const [services, setServices] = useState([]);

	const fetchData = async () => {
		try {
			const response = await servicesService.getAllServices();
			setServices(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		console.log('useEffect: Mounting');
		fetchData();
	}, []);

	return (
		<>
			<h1>Services</h1>
			{services.map((service) => {
				return (
					<div key={service._id}>
						<Link to={`/services/${service._id}`}>
							<h2>{service.serviceName}</h2>
							<img className='service-img' src={service.img}></img>
						</Link>
						<p>Price: {service.price} € </p>
					</div>
				);
			})}
		</>
	);
};

export default MainServicesPage;
