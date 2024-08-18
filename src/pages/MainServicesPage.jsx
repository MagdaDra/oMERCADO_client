import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ServicesAPIService from '../services/services.api';
import Search from '../components/Search';

const servicesService = new ServicesAPIService();

const MainServicesPage = () => {
	const [services, setServices] = useState([]);
	const [servicesBeforeSearch, setServicesBeforeSearch] = useState([])
	const [search, setSearch] = useState('')
	const location = useLocation()
	const {category} = location.state || {}

	const fetchData = async () => {
		try {
			const response = await servicesService.getAllServices();
			console.log('All services: ', response.data);

			// Filter services based on the received category (if there is a category!)
			const filteredServices = category
				? response.data.filter((service) => service.category.includes(category))
				: response.data;
		
				setServices(filteredServices);
				setServicesBeforeSearch(filteredServices);
			
		} catch (error) {
			console.error('Error fetching data of all services in MainServicePage', error);
		}
	};

	useEffect(() => {
		console.log('useEffect: Mounting');
		fetchData();
	}, []);


	const handleSearch = value => {

		
		setSearch(value);
		if (value==='') {
			setServices(servicesBeforeSearch)
		} else {
			const servicesAfterSearch = servicesBeforeSearch.filter(service => {
				return service.serviceName.toLowerCase().includes(value.toLowerCase())
			});
		
			setServices(servicesAfterSearch);
		}
		
		
	}

	return (
		<>
			<Search searchValue={search} searchedService={handleSearch} />
			<h1>Services</h1>
			{services.length === 0 ? (
				<p>No services found</p>
			) : (services.map((service) => {
				return (
					<div key={service._id}>
						<Link to={`/services/${service._id}`}>
							<h2>{service.serviceName}</h2>
							<img className='service-img' src={service.img}></img>
						</Link>
						<p>Price: {service.price} € </p>
					</div>
				);
			}))}
		</>
	);
};

export default MainServicesPage;
