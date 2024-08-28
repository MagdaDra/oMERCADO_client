import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ServicesAPIService from '../../services/services.api';
import { AuthContext } from '../../context/auth.context';
import { CartContext } from '../../context/cart.contex';
import UserAPIService from '../../services/user.api';
import './SingleServicePage.css';
import { Skull, SpinnerGap } from 'phosphor-react';

const userService = new UserAPIService();
const servicesService = new ServicesAPIService();

const SingleServicePage = () => {
	const [service, setService] = useState(null);
	const { serviceId } = useParams();
	const [servicesOffered, setServicesOffered] = useState([]);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [count, setCount] = useState(0);
	const { addToCart } = useContext(CartContext);
	const [loading, setLoading] = useState(true);

	const getUserDetails = async () => {
		try {
			const response = await userService.getUserById(user._id);
			setServicesOffered(response.data.servicesOffered);
			console.log('Here', response.data.servicesOffered);
		} catch (error) {
			console.error('Failed to fetch user details in SingleServicePage', error);
		}
	};

	useEffect(() => {
		if (user && user._id) {
			console.log('logged in');
			getUserDetails();
		}
	}, []);

	const getSingleService = async () => {
		try {
			const response = await servicesService.getServiceById(serviceId);
			setService(response.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(
				'Failed to fetch service details in SingleServicePage',
				error,
			);
		}
	};

	useEffect(() => {
		getSingleService();
	}, []);

	// Checking if the user created the service (if the serviceId is in the servicesOffered array of the user). If yes they will only see 'edit' and 'delete' button.
	// Otherwise they will see 'add to cart' button

	const isServiceOffered = servicesOffered.some(
		(service) => service._id === serviceId,
	);

	// const handleDelete = async (serviceId) => {
	// 	try {
	// 		await servicesService.deleteService(serviceId);
	// 		navigate('/main');
	// 	} catch (error) {
	// 		console.error(
	// 			'Failed to delete the service from SingleServicePage',
	// 			error,
	// 		);
	// 	}
	// 	console.log('serviceId: ', serviceId);
	// };

	const handleDesactivate = async (serviceId) => {
		const desactivateService = {
			isActive: false,
		};
		try {
			await servicesService.desactivateService(serviceId, desactivateService);
			navigate('/main');
		} catch (error) {
			console.error('Error desactivating the service', error);
		}
	};

	// Add/Substract button

	const AddSubstractButton = () => {
		return (
			<div className='flex text-gray-900 text-sm items-center rounded-full justify-center p-2 w-24 border border-gray-400 hover:bg-[#9a9a9a]'>
				<button
					onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}
					className='mr-4'>
					-
				</button>
				<p>{count}</p>
				<button
					onClick={() =>
						count < service.quantity
							? setCount(count + 1)
							: setCount(service.quantity)
					}
					className='ml-4'>
					+
				</button>
			</div>
		);
	};

	if (loading) {
		return (
			<div className='flex flex-col items-center mt-18'>
				<div className='loader'>
					<SpinnerGap
						size={82}
						color='#f5f581'
					/>
				</div>
				<div className='text-white mt-10 text-center'>Loading</div>
			</div>
		);
	}

	return (
		<div>
			{!service && (
				<div className='flex flex-col items-center mt-32'>
					<div>
						<Skull
							size={82}
							color='#f5f581'
						/>
					</div>
					<div className='text-white mt-10 text-center'>
						500 <br /> Internal server error
					</div>
				</div>
			)}

			{service && (
				<div className='single-service rounded-3xl bg-white overflow-hidden shadow-lg shadow-gray-200 flex ml-20 mr-20 mt-20'>
					<div
						className='w-[1000px]'
						style={{
							backgroundImage: `url(${service.img})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}>
					</div>
					<div className='mt-7 ml-7 flex flex-col justify-evenly'>
						<div className='font-bold text-gray-900 text-xl'>
							{service.serviceName}
						</div>
						<p className='text-gray-900 mt-2 pr-5'>
							{service.serviceDescription}
						</p>
						<div className='flex mb-8'>
							<div>
								<div className='pt-4 pb-2'>
									{service.category.map((item) => {
										return (
											<div
												key={service.category.indexOf(item)}
												className='inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-sm font-semibold text-gray-700 mb-2'>
												#{item}
											</div>
										);
									})}
								</div>
								<p className='text-gray-900'>Date: {service.date}</p>
								<p className='text-gray-900 mt-2'>
									Available quantity: {service.quantity}
								</p>
								<p className='text-gray-900 mt-2'>Price: {service.price} €</p>
							</div>
							<div className='flex ml-20'>
								{isServiceOffered ? (
									<>
										<Link to={`/services/edit/${serviceId}`}>
											<button className='text-white text-sm items-center rounded-full font-bold justify-center p-2 w-24 border bg-black hover:bg-[#9a9a9a] mt-28 mr-5'>
												Edit
											</button>
										</Link>
										<div>
											<button
												onClick={() => handleDesactivate(serviceId)}
												className='text-white text-sm items-center rounded-full font-bold justify-center p-2 w-24 border bg-black hover:bg-[#9a9a9a] mt-28 mr-2'>
												Delete
											</button>
										</div>
									</>
								) : (
									<div>
										<div className='flex mb-3 mt-16'>
											<div className='text-gray-900 font-semibold mr-2'>
												<AddSubstractButton />
											</div>

											<div>
												<button
													onClick={() =>
														addToCart(
															{
																_id: serviceId,
																quantity: count,
																unitPrice: service.price,
															},
															service.quantity,
														)
													}
													className='text-white text-sm items-center rounded-full font-semibold justify-center p-2 w-24 border bg-black hover:bg-[#9a9a9a]'>
													Add to cart
												</button>
											</div>
										</div>

										<Link to={'/main'}>
											<button className='text-black text-sm font-semibold items-center rounded-full justify-center p-2 w-[200px] bg-[#F5F581] hover:bg-[#8d8d4a]'>
												Continue shopping
											</button>
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleServicePage;
