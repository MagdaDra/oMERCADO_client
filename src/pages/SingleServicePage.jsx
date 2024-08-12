import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import ServicesAPIService from '../services/services.api';

const servicesService = new ServicesAPIService();

const SingleServicePage = () => {
    const [service, setService] = useState(null);
    const {serviceId} = useParams();


    const getSingleService = async () => {
        try {
            const response = await servicesService.getServiceById(serviceId)
            setService(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getSingleService()
    }, [])


    return (
        <div>
            {!service && <h3>No service found</h3>}

            {service && (
                <div>
                    <h2>{service.serviceName}</h2>
                    <img className='service-img' src={service.img}></img>
                    <p>{service.serviceDescription}</p>
                    {service.category.map((item) => {
                       return(
                        <div key={service.category.indexOf(item)}>
                            <p>#{item}</p>
                        </div> 
                        )
                    })}
                    <p>Date: {service.date}</p>
                    <p>Available spots: {service.quantity}</p>
                    <p>Price: {service.price} €</p>
                    <button type='submit'>Add to cart</button>

                </div>
            )}
        </div>
    )

}

export default SingleServicePage;