import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart.contex';
import ServicesAPIService from '../services/services.api';
import {Trash} from 'phosphor-react';

const servicesService = new ServicesAPIService();

const Cart = () => {
	const { services, totalCartSum, setTotalCartSum, addToCart, removeFromCart } =
		useContext(CartContext);
	const [servicesFromAPI, setServicesFromAPI] = useState([]);

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


	useEffect(() => {
		const calculateTotal = () => {
			const totalAmount = servicesFromAPI.reduce((acc, item) => {
				const serviceInCart = services.find(
					service => service._id === item._id,
				);
				if(serviceInCart){
				return acc + item.price * serviceInCart.quantity;}
			}, 0);
			setTotalCartSum(totalAmount);
			localStorage.setItem('Cart_Total', JSON.stringify(totalAmount))
		};

		calculateTotal();
	}, [servicesFromAPI, services, setTotalCartSum]);

	return (
		<div>
			<h1>Cart</h1>

			{services.length === 0 && <h3>No items in the cart</h3>}

			{services.length > 0 && (
				<>
					{servicesFromAPI.map((item) => {
						const serviceInCart = services.find(
							(service) => service._id === item._id,
						);

						if(!serviceInCart) return null
					
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
									<button
										onClick={() =>
											addToCart({ _id: item._id, quantity: -1 }, item.quantity)
										}>
										-
									</button>
									<p>{serviceInCart.quantity}</p>
									<button
										onClick={() =>
											addToCart({ _id: item._id, quantity: 1 }, item.quantity)
										}>
										+
									</button>
								</div>

								<div onClick={() => removeFromCart({_id: item._id})}>
									<Trash size={20}/>
								</div>

								<p>Total: {item.price * serviceInCart.quantity} €</p>
							</div>
						);
					})}
				</>
			)}

			<div>Total: {totalCartSum} €</div>
			<Link to={'/checkout'}>
				<button>Checkout</button>
			</Link>
		</div>
	);
};

export default Cart;
