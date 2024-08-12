import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import ServicesAPIService from '../services/services.api';
import { AuthContext } from '../context/auth.context';
import UserAPIService from '../services/user.api';

const userService = new UserAPIService();
const servicesService = new ServicesAPIService();

const SingleServicePage = () => {
	const [service, setService] = useState(null);
	const { serviceId } = useParams();
	const [servicesOffered, setServicesOffered] = useState([]);
	const { user } = useContext(AuthContext);

	const getUserDetails = async () => {
		try {
			const response = await userService.getUserById(user._id);
            console.log('API response:', response.data.servicesOffered);
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
			console.error('Failed to fetch service details in SingleServicePage', error);
		}
	};

	useEffect(() => {
		getSingleService();
	}, []);

    const isServiceOffered = servicesOffered.some(service => service._id === serviceId)

	return (
		<div>

            {!service && <h3>No service found</h3>}

            {service && (
                <div>
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
                    <p>Available spots: {service.quantity}</p>
                    <p>Price: {service.price} €</p>
                    {isServiceOffered ? (
                        <>
                            <Link to={`/services/edit/${serviceId}`} >
                                <button>Edit</button>
                            </Link>
                            <button>Delete</button>
                        </>
                    ) : (
                        <button>Add to cart</button>
                    )}
                </div>


            )}

		</div>
	);
};

export default SingleServicePage;
