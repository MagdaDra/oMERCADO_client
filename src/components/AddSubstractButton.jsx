import { useState, useEffect } from 'react';
import ServicesAPIService from '../services/services.api';

const servicesService = new ServicesAPIService();


const AddSubstractButton = ({serviceId}) => {
    const [service, setService] = useState(null);
    const [count, setCount] = useState(0);

    const getSingleService = async () => {
		try {
			const response = await servicesService.getServiceById(serviceId);
			setService(response.data);
		} catch (error) {
			console.error(
				'Failed to fetch service details in SingleServicePage',
				error,
			);
		}
	};

	useEffect(() => {
		getSingleService();
	}, [serviceId]);

	return (
        <div className='add-substr-button'>
            <button onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}>
                -
            </button>
            <p>{count}</p>
            <button onClick={() => (count < service.quantity ? setCount(count + 1): setCount(service.quantity))}>
                +
            </button>
        </div>
    )
};

export default AddSubstractButton;
