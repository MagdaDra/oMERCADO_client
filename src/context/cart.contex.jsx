import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProviderWrapper = ({ children }) => {
	// Total sum to pay in the cart
	const [totalCartSum, setTotalCartSum] = useState(0);

	// All services in the cart stored as serviceId and quantity 
	const [services, setServices] = useState([]);

	const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

	// this is setting the total items quantity that appears in the navbar
	useEffect(() => {
		const storedCartQuantity = localStorage.getItem('Cart_Quantity');
		setCartTotalQuantity(
			storedCartQuantity ? JSON.parse(storedCartQuantity) : 0,
		);
	}, []);

	// Update localStorage whenever number of items in cart changes
	useEffect(() => {
		localStorage.setItem('Cart_Quantity', JSON.stringify(cartTotalQuantity));
	}, [cartTotalQuantity]);

	// Load the initial cart from localStorage
	useEffect(() => {
		const storedCart = localStorage.getItem('Cart');
		setServices(storedCart ? JSON.parse(storedCart) : []); // JSON.parse: the data has to be converted from a JSON string to JavaScript object
	}, []);

	// Update localStorage whenever services change
	useEffect(() => {
		localStorage.setItem('Cart', JSON.stringify(services)); // JSON.stringify: the data has to be converted from a JavaScript object to JSON string
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

		// add to local storage

		// reduce items from the cart

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
		const servicesCopy = services.filter(service => service._id !== item._id)
		setServices(servicesCopy)

		const cartTotal = () => {
			const sum = servicesCopy.reduce(
				(total, service) => total + service.quantity,
				0,
			);
			setCartTotalQuantity(sum);
		};

		cartTotal();
	}

	return (
		<CartContext.Provider
			value={{
				services,
				cartTotalQuantity,
				addToCart,
				totalCartSum,
				setTotalCartSum,
				removeFromCart
			}}>
			{children}
		</CartContext.Provider>
	);
};

export { CartContext, CartProviderWrapper };
