import { createContext, useState, useEffect } from 'react';
import ServicesAPIService from '../services/services.api';

const CartContext = createContext();
const servicesService = new ServicesAPIService();

const CartProviderWrapper = ({ children }) => {
	const [services, setServices] = useState([]); // this is storing serviceId and quantity
	const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

    // item has to be an objecty with id and quantity
	const addToCart = (item) => {

        const foundService = services.findIndex((service) => service._id === item._id)
        const servicesCopy =[...services];

        if (foundService) {
            servicesCopy[foundService].quantity+=item.quantity
            setServices(servicesCopy)
        } else {
            servicesCopy.push(item);
            setServices(servicesCopy);
        }

        // add to local storage

        // reduce items from the drop down

		setCartTotalQuantity((prevCartItems) => {


			const newCartItems = { ...prevCartItems };

			if (newCartItems[item]) {
				newCartItems[item] += 1;
			} else {
				newCartItems[item] = 1;
			}

			return newCartItems;
		});
	};

	return <CartContext.Provider value={{services, cartTotalQuantity, addToCart}} >{children}</CartContext.Provider>;
};

export { CartContext, CartProviderWrapper };
