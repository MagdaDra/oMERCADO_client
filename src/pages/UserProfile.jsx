import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

const UserProfile = () => {
	const [servicesOffered, setServicesOffered] = useState([]);
	const [servicesBought, setServicesBought] = useState([]);
	const [userDetails, setUserDetails] = useState(null);

	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	const getUserDetails = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/user/${user._id}`,
			);
			setUserDetails(response.data);
			setServicesOffered(response.data.servicesOffered);
			setServicesBought(response.data.servicesBought);
			// console.log(`User details:`, response.data)
			// console.log(`Services offered: `, response.data.servicesOffered)
			// console.log(`Services bought: `, response.data.servicesBought)
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

  return(
    <>
      <h1>Services Offered</h1>
      {servicesOffered.map((service) => {
        return (
          <div key={service._id}>
            <Link to={`/services/${service._id}`}>
							<img className='service-img' src={service.img}></img>
							<h2>{service.serviceName}</h2>
						</Link>
						<p>Price: {service.price} € </p>
            <p>Quantity: {service.quantity} </p>
          </div>
        )
      })}

    </>
  )
};

export default UserProfile;
