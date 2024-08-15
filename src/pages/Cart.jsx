import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart.contex';
import ServicesAPIService from '../services/services.api';

const servicesService = new ServicesAPIService();

const Cart = () => {
	const { services } = useContext(CartContext);
	const [servicesFromAPI, setServicesFromAPI] = useState([]);
	const [total, setTotal] = useState(0);
	//const [count, setCount] = useState(0)

	// Getting details of the services stored in the 'services' from cart context as they are only stored as _id and quantity. (To get Img, Name, etc)
	const getServicesFromAPI = async () => {
		try {
			const responses = await Promise.all(
				services.map((service) => servicesService.getServiceById(service._id)),
			);

			//The services.map(...) part creates an array of promises. Each promise is an API call to getServiceById with a corresponding _id.
			//Promise.all(...) waits for all these promises to resolve and returns an array of their results, which is assigned to responses.

			// Data stored inside const responses:

			// [
			//   {
			//     data: {
			//       _id: 'service1',
			//       name: 'Service 1',
			//       description: 'Description of Service 1',
			//       price: 100
			//     }
			//   },
			//   {
			//     data: {
			//       _id: 'service2',
			//       name: 'Service 2',
			//       description: 'Description of Service 2',
			//       price: 200
			//     }
			//   }]

			const fetchedServices = responses.map((response) => response.data);
			setServicesFromAPI(fetchedServices);
		} catch (error) {
			console.error('Error fetching services from API in Cart', error);
		}
	};

	useEffect(() => {
		if (services.length > 0) {
			getServicesFromAPI();
		}
	}, [services]);

	// const AddSubstractButton = (service) => {
	// 	return (
	// 		<div className='add-substr-button'>
	// 			<button onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}>
	// 				-
	// 			</button>
	// 			<p>{service.quantity}</p>
	// 			<button onClick={() => (count < service.quantity ? setCount(count + 1): setCount(service.quantity))}>
	// 				+
	// 			</button>
	// 		</div>
	// 	);
	// };

	useEffect(() => {
		const calculateTotal = () => {
			const totalAmount = servicesFromAPI.reduce((acc, item) => {
				const serviceInCart = services.find(
					(service) => service._id === item._id,
				);
				return acc + item.price * serviceInCart.quantity;
			}, 0);
			setTotal(totalAmount);
		};

		calculateTotal();
	}, [servicesFromAPI, services]);

	return (
		<div>
			<h1>Cart</h1>

			{servicesFromAPI.length === 0 && <h3>No items in the cart</h3>}
			{servicesFromAPI.length > 0 && (
				<>
					{servicesFromAPI.map((item) => {
						const serviceInCart = services.find(
							(service) => service._id === item._id,
						);
						//setTotal((prevTotal) => prevTotal + item.price * serviceInCart.quantity)
						return (
							<div
								className='single-cart-line'
								key={item._id}>
								<img
									className='cart-img'
									src={item.img}
									alt={`${item.serviceName} image`}
								/>
								<p>{item.serviceName}</p>
								<p>Unit price: {item.price} €</p>

								<div className='add-substr-button'>
									{/* <div>
									<AddSubstractButton service={serviceInCart} />
								</div> */}
									<button onClick={() => serviceInCart.quantity - 1}>-</button>
									<p>{serviceInCart.quantity}</p>
									<button onClick={() => serviceInCart.quantity + 1}>+</button>
								</div>

								<p>Total: {item.price * serviceInCart.quantity} €</p>
							</div>
						);
					})}
				</>
			)}

			<div>Total: {total} €</div>
			<Link to={'/payment'}>
				<button>Payment</button>
			</Link>
		</div>
	);
};

export default Cart;
