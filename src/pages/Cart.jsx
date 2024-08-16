import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart.contex';
import ServicesAPIService from '../services/services.api';

const servicesService = new ServicesAPIService();

const Cart = () => {
	const { services, totalCartSum, setTotalCartSum } = useContext(CartContext);
	const [servicesFromAPI, setServicesFromAPI] = useState([]);
	//const [count, setCount] = useState(0)

	// Getting details of the services stored in the 'services' from cart context as they are only stored as _id and quantity. (To get Img, Name, etc)
	const getServicesFromAPI = async () => {
		try {
			const response = await servicesService.getCartInfo(services);
			console.log('Response:', response);

			setServicesFromAPI(response.data);
		} catch (error) {
			console.error('Error fetching services from API in Cart', error);
		}
	};

	useEffect(() => {
		if (services.length > 0) {
			getServicesFromAPI();
		}
	}, [services]);


	/* 	const handleUpdateQuantity = (id, quantity, availableQuantity) => {
		const foundServiceIndex = servicesCopy.findIndex(
			(service) => service._id === id,
		);
		const tempServices = [...servicesCopy];

		if (
			tempServices[foundServiceIndex].quantity + quantity >
			availableQuantity
		) {
			return 'This quantity is not available';
		} else {
			tempServices[foundServiceIndex].quantity += quantity;
			setServicesCopy(tempServices);
		}
	};
 */

	useEffect(() => {
		const calculateTotal = () => {
			const totalAmount = servicesFromAPI.reduce((acc, item) => {
				const serviceInCart = services.find(
					(service) => service._id === item._id,
				);
				return acc + item.price * serviceInCart.quantity;
			}, 0);
			setTotalCartSum(totalAmount);
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
									<button onClick={() => (serviceInCart.quantity -= 1)}>
										-
									</button>
									<p>{serviceInCart.quantity}</p>
									<button onClick={() => (serviceInCart.quantity += 1)}>
										+
									</button>
								</div>

								<p>Total: {item.price * serviceInCart.quantity} €</p>
							</div>
						);
					})}
				</>
			)}

			<div>Total: {totalCartSum} €</div>
			<Link to={'/payment'}>
				<button>Payment</button>
			</Link>
		</div>
	);
};

export default Cart;
