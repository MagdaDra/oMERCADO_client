import { createContext, useState} from 'react';

const CartContext = createContext();


const CartProviderWrapper = ({ children }) => {
	const [services, setServices] = useState([]); // this is storing serviceId and quantity
	const [cartTotalQuantity, setCartTotalQuantity] = useState(0); // this is storing the total items quantity that appears in the navbar

    // item has to be an objecty with id and quantity
	const addToCart = (item) => {

        const foundServiceIndex = services.findIndex((service) => service._id === item._id)
        const servicesCopy =[...services];

        if (foundServiceIndex !== -1) {
            servicesCopy[foundServiceIndex].quantity+=item.quantity
            setServices(servicesCopy)
        } else {
            servicesCopy.push(item);
            setServices(servicesCopy);
        }

        // add to local storage

        // reduce items from the cart

		const cartTotal = () => {
			const sum = servicesCopy.reduce((total, service) => total + service.quantity, 0)
			setCartTotalQuantity(sum)
		}

		cartTotal();

	};

	return <CartContext.Provider value={{services, cartTotalQuantity, addToCart}} >{children}</CartContext.Provider>;
};

export { CartContext, CartProviderWrapper };
