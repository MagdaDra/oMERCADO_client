import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import UserAPIService from '../services/user.api';
import ServicesAPIService from '../services/services.api';

const userService = new UserAPIService();
const servicesService = new ServicesAPIService();

const UserProfile = () => {
	const [servicesOffered, setServicesOffered] = useState([]);
	const [servicesBought, setServicesBought] = useState([]);
	const [servicesSold, setServicesSold] = useState([]);
	const [userDetails, setUserDetails] = useState({});

	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	const getUserDetails = async () => {
		try {
			console.log('Hello world');
			const response = await userService.getUserById(user._id);
			setUserDetails(response.data);
			setServicesOffered(response.data.servicesOffered);
			console.log('servicesOffered: ', response.data.servicesOffered);
			setServicesBought(response.data.servicesBought);
			console.log('servicesBought: ', response.data.servicesBought);
			setServicesSold(response.data.servicesSold);
			console.log('servicesSold: ', response.data.servicesSold);
		} catch (error) {
			console.error('Failed to fetch user details in UserProfile', error);
		}
	};

	// const handleDelete = async (serviceId) => {
	// 	try {
	// 		await servicesService.deleteService(serviceId);
	// 		// navigate('/user-profile')
	// 		// updating the state is faster to reload as we don't need a new API call, it's better for UI. We wold use navigate if there was a need to leave the page -> e.g. deleting user account
	// 		/* setServicesOffered((prevServices) =>
	// 			prevServices.filter((service) => service._id !== serviceId),
	// 		); */
	// 		await getUserDetails();
	// 	} catch (error) {
	// 		console.error('Failed to delete the service from UserProfile', error);
	// 	}
	// };

	const handleDesactivate = async (serviceId) => {
		const desactivateService = {
			isActive: false,
		};
		try {
			await servicesService.desactivateService(serviceId, desactivateService);
		} catch (error) {
			console.error('Error desactivating the service', error);
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	let typeOfUserString;

	if (userDetails.typeOfUser && userDetails.typeOfUser.length > 0) {
		userDetails.typeOfUser.length === 1
			? (typeOfUserString = userDetails.typeOfUser[0])
			: userDetails.typeOfUser.join(', ');
	}

	return (
		<>
			<div className='pt-3 pl-5 rounded-t-3xl bg-white text-gray-900 overflow-hidden flex-col justify-start h-32 ml-5 mr-5 mt-5'>
				<h1 className='font-bold text-lg'>User details</h1>
				<p>
					<span className='font-bold'>Name: </span>
					{userDetails.name}
				</p>
				<p>
					<span className='font-bold'>Email: </span>
					{userDetails.email}{' '}
				</p>
				<p>
					<span className='font-bold'>Type of account: </span>{' '}
					{typeOfUserString}
				</p>
			</div>

			<div className='mt-5 ml-5 mr-5 font-semibold text-lg border-b border-[#F5F581]'>
				Services Offered
			</div>

			<div className='flex flex-wrap'>
				{servicesOffered.map((service) => {
					if (service.isActive === false) {
						return '';
					}

					return (
						<div
							key={service._id}
							className='rounded-3xl bg-white text-gray-900 overflow-hidden shadow-lg shadow-gray-200 flex-col justify-start h-96 w-2/6 m-5'>
							<div
								className={'h-3/5'}
								style={{
									backgroundImage: `url(${service.img})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}></div>

							<div className='px-6 py-6 flex justify-between'>
								<div>
									<h2 className='font-bold text-gray-900 text-xl mb-2'>
										{service.serviceName}
									</h2>
									<p className='text-gray-700 text-base'>
										Unit price: {service.price} €
									</p>
									<p className='text-gray-700 text-base'>
										Quantity: {service.quantity}
									</p>
								</div>

								<div>
									<div>
										<Link to={`/services/edit/${service._id}`}>
											<button className='text-white text-sm items-center rounded-full justify-center p-2 w-24 border bg-black hover:bg-[#9a9a9a]'>
												Edit
											</button>
										</Link>

										<button
											onClick={() => {
												handleDesactivate(service._id);
												navigate(0);
											}}
											className='text-white text-sm items-center rounded-full justify-center p-2 w-24 border bg-black hover:bg-[#9a9a9a]'>
											Delete
										</button>
									</div>

									<div className='mt-2'>
										<Link to={`/services/${service._id}`}>
											<button className='text-white text-sm items-center rounded-full justify-center p-2 w-48 border bg-black hover:bg-[#9a9a9a]'>
												Go to service
											</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className='mt-5 ml-5 mr-5 font-semibold text-lg border-b border-[#F5F581]'>
				Services Sold
			</div>

			<div className='flex flex-wrap'>
				{servicesSold.map((item) => {
					return (
						<div
							key={servicesSold.indexOf(item)}
							className='rounded-3xl bg-white text-gray-900 overflow-hidden shadow-lg shadow-gray-200 flex-col justify-start h-96 w-2/6 m-5'>
							<div
								className={'h-3/5'}
								style={{
									backgroundImage: `url(${item.service.img})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}></div>

							<div className='px-6 py-6 flex justify-between'>
								<div>
									<h2 className='font-bold text-gray-900 text-xl mb-2'>
										{item.service.serviceName}
									</h2>
									<p className='text-gray-700 text-base'>
										Total price: {item.service.price * item.quantity} €
									</p>
									<p className='text-gray-700 text-base'>
										Quantity: {item.quantity}
									</p>
								</div>

								<div className='mt-2'>
									{item.service.isActive ? (
										<Link to={`/services/${item.service._id}`}>
											<button className='text-white text-sm items-center rounded-full justify-center p-2 w-48 border bg-black hover:bg-[#9a9a9a]'>
												Go to service
											</button>
										</Link>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className='mt-5 ml-5 mr-5 font-semibold text-lg border-b border-[#F5F581]'>
				Services Bought
			</div>

			<div className='flex flex-wrap'>
				{servicesBought.map((item) => {
					return (
						<div
							key={servicesBought.indexOf(item)}
							className='rounded-3xl bg-white text-gray-900 overflow-hidden shadow-lg shadow-gray-200 flex-col justify-start h-96 w-2/6 m-5'>
							<div
								className={'h-3/5'}
								style={{
									backgroundImage: `url(${item.service.img})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}></div>

							<div className='px-6 py-6 flex justify-between'>
								<div>
									<h2 className='font-bold text-gray-900 text-xl mb-2'>
										{item.service.serviceName}
									</h2>
									<p className='text-gray-700 text-base'>
										Total price: {item.unitPrice * item.quantity} €
									</p>
									<p className='text-gray-700 text-base'>
										Quantity: {item.quantity}
									</p>
								</div>

								<div className='mt-2'>
								{item.service.isActive ? (
										<Link to={`/services/${item.service._id}`}>
											<button className='text-white text-sm items-center rounded-full justify-center p-2 w-48 border bg-black hover:bg-[#9a9a9a]'>
												Go to service
											</button>
										</Link>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default UserProfile;
