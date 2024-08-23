import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ServicesAPIService from '../services/services.api';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.contex';
import UserAPIService from '../services/user.api';
//import AddSubstractButton from '../components/AddSubstractButton';


const userService = new UserAPIService();
const servicesService = new ServicesAPIService();

const SingleServicePage = () => {
	const [service, setService] = useState(null);
	const { serviceId } = useParams();
	const [servicesOffered, setServicesOffered] = useState([]);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [count, setCount] = useState(0);
	const { addToCart} = useContext(CartContext);

	const getUserDetails = async () => {
		try {
			const response = await userService.getUserById(user._id);
			setServicesOffered(response.data.servicesOffered);
		} catch (error) {
			console.error('Failed to fetch user details in SingleServicePage', error);
		}
	};

	useEffect(() => {
		if (user && user._id) {
			getUserDetails();
		}
	}, [user]);

	const getSingleService = async () => {
		try {
			const response = await servicesService.getServiceById(serviceId);
			setService(response.data);
			
		} catch (error) {
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

	const handleDelete = async (serviceId) => {
		try {
			await servicesService.deleteService(serviceId);
			navigate('/main');
		} catch (error) {
			console.error(
				'Failed to delete the service from SingleServicePage',
				error,
			);
		}
	};

	console.log('serviceId: ', serviceId)

	// Add/Substract button

	const AddSubstractButton = () => {
		return (
			<div className='add-substr-button'>
				<button onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}>
					-
				</button>
				<p>{count}</p>
				<button onClick={() => (count < service.quantity ? setCount(count + 1): setCount(service.quantity))}>
					+
				</button>
			</div>
		);
	};


	return (
		<div>
			{!service && <h3>No service found</h3>}

			{service && (
				<div className='single-service'>
					<h2>{service.serviceName}</h2>
					<img
						className='service-img'
						src={service.img}
						alt={`${service.serviceName} image`}></img>
					<p>{service.serviceDescription}</p>
					{service.category.map((item) => {
						return (
							<div key={service.category.indexOf(item)}>
								<p>#{item}</p>
							</div>
						);

					})}
					<p>Date: {service.date}</p>
					<p>Available quantity: {service.quantity}</p>
					<p>Price: {service.price} €</p>
					{isServiceOffered ? (
						<>
							<Link to={`/services/edit/${serviceId}`}>
								<button>Edit</button>
							</Link>
							<button onClick={() => handleDelete(serviceId)}>Delete</button>
						</>
					) : (
						<>
							<div>
							
								<AddSubstractButton />
							</div>
							<button onClick={() => addToCart({_id: serviceId, quantity: count, unitPrice: service.price}, service.quantity)}>Add to cart</button>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default SingleServicePage;
