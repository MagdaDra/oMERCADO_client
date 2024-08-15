import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ServicesAPIService from '../services/services.api';
import Search from '../components/Search';

const servicesService = new ServicesAPIService();

const MainServicesPage = () => {
	const [services, setServices] = useState([]);
	const [search, setSearch] = useState('')

	const fetchData = async () => {
		try {
			const response = await servicesService.getAllServices();
			console.log('All services: ', response.data);
			setServices(response.data);
		} catch (error) {
			console.error('Error fetching data of all services in MainServicePage', error);
		}
	};

	useEffect(() => {
		console.log('useEffect: Mounting');
		fetchData();
	}, []);

	const handleSearch = value => {

		const servicesAfterSearch = services.filter(service => {
			return service.serviceName.toLowerCase().includes(value.toLowerCase())
		});
		setServices(servicesAfterSearch);
		setSearch(value);
	}

	return (
		<>
			<Search searchValue={search} searchedService={handleSearch} />
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
