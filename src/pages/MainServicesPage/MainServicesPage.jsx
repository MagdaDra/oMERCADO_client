import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ServicesAPIService from '../../services/services.api';
import Search from '../../components/Search';
import './MainServicesPage.css';

const servicesService = new ServicesAPIService();

const MainServicesPage = () => {
	const [services, setServices] = useState([]);
	const [servicesBeforeSearch, setServicesBeforeSearch] = useState([]);
	const [search, setSearch] = useState('');
	const location = useLocation();
	const { category } = location.state || {};

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
			console.error(
				'Error fetching data of all services in MainServicePage',
				error,
			);
		}
	};

	useEffect(() => {
		console.log('useEffect: Mounting');
		fetchData();
	}, []);

	const handleSearch = (value) => {
		setSearch(value);
		if (value === '') {
			setServices(servicesBeforeSearch);
		} else {
			const servicesAfterSearch = servicesBeforeSearch.filter((service) => {
				return service.serviceName.toLowerCase().includes(value.toLowerCase());
			});

			setServices(servicesAfterSearch);
		}
	};

	return (
		<>
			<Search
				searchValue={search}
				searchedService={handleSearch}
			/>

			<div className='all-services'>
				{services.length === 0 ? (
					<p>No services found</p>
				) : (
					services.map((service) => {
						return (
							<div
								key={service._id}
								className='rounded-3xl bg-white overflow-hidden shadow-lg shadow-gray-200 flex-col justify-start h-96 w-2/6 ml-5 mr-5'>
								<Link to={`/services/${service._id}`}>
									<div
										className={'h-3/5'}
										style={{
											backgroundImage: `url(${service.img})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
										}}>
									</div>
								</Link>
								<div className='px-6 py-4'>
									<Link to={`/services/${service._id}`}>
										<div className='font-bold text-gray-900 text-xl mb-2'>
											{service.serviceName}
										</div>
									</Link>
									<p className='text-gray-700 text-base'>
										Price: {service.price} €
									</p>
								</div>

								<div className='px-6 pt-4 pb-2'>
									{service.category.map((category) => {
										return (
											<span
												key={service.category.indexOf(category)}
												className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
												#{category}
											</span>
										);
									})}
								</div>
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default MainServicesPage;
