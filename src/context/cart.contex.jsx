import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CartContext = createContext();


const CartProviderWrapper = ({ children }) => {
	// Total sum to pay in the cart
	const [totalCartSum, setTotalCartSum] = useState(0);

	// All services in the cart stored as serviceId and quantity
	const [services, setServices] = useState([]);
	const [loadedCart, setLoadedCart] = useState(false);
	const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

	const navigate = useNavigate();

	// this is setting the total items quantity that appears in the navbar
	useEffect(() => {
		const storedCartQuantity = localStorage.getItem('Cart_Quantity');
		setCartTotalQuantity(storedCartQuantity ? +storedCartQuantity : 0);
		const storedCart = localStorage.getItem('Cart');
		console.log(storedCart);
		setServices(storedCart ? JSON.parse(storedCart) : []); // JSON.parse: the data has to be converted from a JSON string to JavaScript object
		setLoadedCart(true);
		const totalAmount = localStorage.getItem('Cart_Total')
		setTotalCartSum(totalAmount ? JSON.parse(totalAmount) : 0)
		
	}, []);

	// Update localStorage whenever number of items in cart changes
	useEffect(() => {
		if (loadedCart) {
			localStorage.setItem('Cart_Quantity', JSON.stringify(cartTotalQuantity));
		}
	}, [cartTotalQuantity]);

	// Load the initial cart from localStorage
	/* useEffect(() => {
	}, []); */

	// Update localStorage whenever services change
	useEffect(() => {
		if (loadedCart) {
			localStorage.setItem('Cart', JSON.stringify(services)); // JSON.stringify: the data has to be converted from a JavaScript object to JSON string
		}
	}, [services]);

	// item has to be an object with id and quantity

	const addToCart = (item, availableQuantity) => {
		const foundServiceIndex = services.findIndex(
			(service) => service._id === item._id,
		);
		const servicesCopy = [...services];

		if (foundServiceIndex !== -1) {
			console.log(servicesCopy[foundServiceIndex].quantity, availableQuantity);
			if (
				servicesCopy[foundServiceIndex].quantity + item.quantity >
				availableQuantity
			) {
				return 'This quantity is not available';
			} else if (servicesCopy[foundServiceIndex].quantity + item.quantity < 1) {
				return "Quantity can't be less than 0";
			} else {
				servicesCopy[foundServiceIndex].quantity += item.quantity;
				setServices(servicesCopy);
			}
		} else {
			servicesCopy.push(item);
			setServices(servicesCopy);
		}

		const cartTotal = () => {
			const sum = servicesCopy.reduce(
				(total, service) => total + service.quantity,
				0,
			);
			setCartTotalQuantity(sum);
		};

		cartTotal();
	};


	const removeFromCart = (item) => {
		const servicesCopy = services.filter((service) => service._id !== item._id);

		if (servicesCopy.length === 0) {
			localStorage.removeItem('Cart');
			localStorage.removeItem('Cart_Quantity');
			localStorage.removeItem('Cart_Total');
			navigate(0);
		} else {

		setServices(servicesCopy);

		const cartTotal = () => {
			const sum = servicesCopy.reduce(
				(total, service) => total + service.quantity,
				0,
			);
			setCartTotalQuantity(sum);
		};

		cartTotal();}
	};

	return (
		<CartContext.Provider
			value={{
				services,
				cartTotalQuantity,
				addToCart,
				totalCartSum,
				setTotalCartSum,
				removeFromCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export { CartContext, CartProviderWrapper };
