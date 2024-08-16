import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth.context';

const CartContext = createContext();

const CartProviderWrapper = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	// If user is not loaded yet, don't initialize cart context
	if (loading) {
		return <div>Loading...</div>
	}

	// Use userId or guest if not logged in
	const userId = user ? user._id : 'guest'; 

	// Unique key for each user's cart
	const localStorageKey = `Cart_${userId}`

	// Total sum to pay in the cart
	const [totalCartSum, setTotalCartSum] = useState(0); 

	// Load the initial state from localStorage
	const [cartTotalQuantity, setCartTotalQuantity] = useState(() => {
		// this is storing the total items quantity that appears in the navbar
		const storedCartQuantity = localStorage.getItem(`${localStorageKey}_Quantity`);
		return storedCartQuantity ? JSON.parse(storedCartQuantity) : 0;
	});

	// Update localStorage whenever number of items in cart changes
	useEffect(() => {
		localStorage.setItem(
			`${localStorageKey}_Quantity`,
			JSON.stringify(cartTotalQuantity),
		);
	}, [cartTotalQuantity, localStorageKey]);

	// Load the initial state from localStorage
	const [services, setServices] = useState(() => {
		// services is storing serviceId and quantity
		const storedCart = localStorage.getItem(localStorageKey);
		return storedCart ? JSON.parse(storedCart) : []; // JSON.parse: the data has to be converted from a JSON string to JavaScript object
	});

	// Update localStorage whenever services change

	useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(services)); // JSON.stringify: the data has to be converted from a JavaScript object to JSON string
	}, [services, localStorageKey]);

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
			} else {
				servicesCopy[foundServiceIndex].quantity += item.quantity;
				setServices(servicesCopy);
			}
		} else {
			servicesCopy.push(item);
			setServices(servicesCopy);
		}

		// Sum items in the cart

		const cartTotal = () => {
			const sum = servicesCopy.reduce(
				(total, service) => total + service.quantity,
				0,
			);
			setCartTotalQuantity(sum);
		};

		cartTotal();
	};


	return (
		<CartContext.Provider
			value={{
				services,
				cartTotalQuantity,
				addToCart,
				totalCartSum,
				setTotalCartSum,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export { CartContext, CartProviderWrapper };
