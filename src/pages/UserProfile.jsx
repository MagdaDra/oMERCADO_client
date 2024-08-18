import { Link} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import UserAPIService from '../services/user.api';
import ServicesAPIService from '../services/services.api';
import TransactionAPIService from '../services/transaction.api';

const userService = new UserAPIService();
const servicesService = new ServicesAPIService();
const transactionService = new TransactionAPIService();

const UserProfile = () => {
	const [servicesOffered, setServicesOffered] = useState([]);
	const [servicesBought, setServicesBought] = useState([]);
	const [userServicesBoughtByTransactionId, setServicesBoughtByTransactionId] = useState([]);
	const [servicesSold, setServicesSold] = useState([])
	const [userDetails, setUserDetails] = useState({});
	const [loading, setLoading] = useState(true)


	const { user } = useContext(AuthContext);

	const getUserDetails = async () => {
		try {
			const response = await userService.getUserById(user._id);

			setUserDetails(response.data);
			setServicesOffered(response.data.servicesOffered);
			setServicesBoughtByTransactionId(response.data.servicesBought);
			setServicesSold(response.data.servicesSold);
			setLoading(false)
			console.log('Transactions after loading data: ',response.data.servicesBought)

		} catch (error) {
			console.error('Failed to fetch user details in UserProfile', error);
		}
	};

	const getTransactionDetails = async () => {
		try {

			// Fetch transaction details for each transaction ID in parallel
			const transactionPromises = userServicesBoughtByTransactionId.map((transactionId) => transactionService.getTransaction(transactionId))

			// Wait for all promises to resolve
			const transactionResponses = await Promise.all(transactionPromises);

			// Extract the data from each response
			const servicesBoughtData = transactionResponses.map(response => response.data)

			console.log('servicesBoughtData', servicesBoughtData)

			// Flatten the results if necessary and update the state
			setServicesBought(servicesBoughtData);


		} catch (error) {
			console.error('Error fetching transaction details in UserProfile: ', error)
		}
	}

	useEffect(() => {
		if (!loading && userServicesBoughtByTransactionId.length > 0) {
			getTransactionDetails
		}
	}, [userServicesBoughtByTransactionId])




	const handleDelete = async (serviceId) => {
		try {
			await servicesService.deleteService(serviceId);
			// navigate('/user-profile')
			// updating the state is faster to reload as we don't need a new API call, it's better for UI. We wold use navigate if there was a need to leave the page -> e.g. deleting user account
			setServicesOffered((prevServices) =>
				prevServices.filter((service) => service._id !== serviceId)
			);

		} catch (error) {
			console.error('Failed to delete the service from UserProfile', error)
		}
	}



	useEffect(() => {
		getUserDetails();
	}, []);

	let typeOfUserString

	if (userDetails.typeOfUser && userDetails.typeOfUser.length > 0) {
		userDetails.typeOfUser.length === 1 ? typeOfUserString = userDetails.typeOfUser[0] : userDetails.typeOfUser.join(', ')
	}


	return (
		<>
			
			<h1>User details</h1>
			<p>Name: {userDetails.name}</p>
			<p>Email: {userDetails.email} </p>
			<p>Type of account: {typeOfUserString}</p>
			
			<h1>Services Offered</h1>
			{servicesOffered.map((service) => {
				return (
					<div key={service._id}>
						<Link to={`/services/${service._id}`}>
							<h2>{service.serviceName}</h2>
							<img
								className='service-img'
								src={service.img}></img>
						</Link>
						<p>Price: {service.price} € </p>
						<p>Quantity: {service.quantity} </p>
						<Link to={`/services/edit/${service._id}`}>
							<button>Edit</button>
						</Link>
						<button
							onClick={() => handleDelete(service._id)}>
							Delete
						</button>
					</div>
				);
			})}

			<h1>Services Sold</h1>
			{servicesSold.map((service) => {
				return (
					<div key={servicesSold.indexOf(service)}>
					<Link to={`/services/${service._id}`}>
							<h2>{service.serviceName}</h2>
							<img
								className='service-img'
								src={service.img}></img>
						</Link>				
						<p>Price: {service.price} € </p>
						<p>Quantity: {service.quantity} </p>					
					</div>
				)
			})}
			
			<h1>Services Bought</h1>
			{servicesBought.map((service) => {
				return (
					<div key={servicesBought.indexOf(service)}>
					<Link to={`/services/${service._id}`}>
							<h2>{service.serviceName}</h2>
							<img
								className='service-img'
								src={service.img}></img>
						</Link>				
					</div>
				)
			})}
		</>
	);
};

export default UserProfile;
