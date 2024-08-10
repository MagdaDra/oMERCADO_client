import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServicesAPIService from '../services/services.api';
import axios from 'axios';

const servicesService = new ServicesAPIService();

const AddService = () => {
	const [serviceName, setServiceName] = useState('');
	const [serviceDescription, setServiceDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [date, setDate] = useState('');
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState('');

	const navigate = useNavigate();

	const handleServiceName = (e) => {
		setServiceName(e.target.value);
	};

	const handleServiceDescription = (e) => {
		setServiceDescription(e.target.value);
	};

	const handlePrice = (e) => {
		setPrice(e.target.value);
	};

	const handleQuantity = (e) => {
		setQuantity(e.target.value);
	};

	const handleDate = (e) => {
		setDate(e.target.value);
	};

	const handleImg = async (e) => {
		// configuring how to send a file
		const uploadData = new FormData();

		// appending the data with the server data. FormData is interpreting input as a file
		uploadData.append('imgUrl', e.target.files[0]);

		try {
			setLoading(true);
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/upload`,
				uploadData,
			);
			setLoading(false);
			setImg(response.data.fileUrl);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	const handleCategory = (e) => {
		setCategory(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requestBody = {
			serviceName,
			serviceDescription,
			price,
			quantity,
			date,
			img,
			category,
		};
		try {
			await servicesService.createService(requestBody);
			navigate('/main');
			navigate(0);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Add Service</h2>

			<form onSubmit={handleSubmit}>
				<label>Name</label>
				<input
					type='text'
					name='serviceName'
					value={serviceName}
					onChange={handleServiceName}
				/>

				<label>Description</label>
				<textarea
					rows={15}
					cols={5}
					itemType='text'
					name='serviceDescription'
					value={serviceDescription}
					onChange={handleServiceDescription}></textarea>

				<label>Price</label>
				<input
					type='number'
					name='price'
					value={price}
					onChange={handlePrice}
				/>

				<label>Quantity</label>
				<input
					type='number'
					name='quantity'
					value={quantity}
					onChange={handleQuantity}
				/>

				<label>Date</label>
				<input
					type='date'
					name='date'
					value={date}
					onChange={handleDate}
				/>

				<label>Image</label>
				<input
					type='file'
					name='img'
					onChange={handleImg}
				/>

				<label>Category</label>
				<input
					type='text'
					name='category'
					value={category}
					onChange={handleCategory}
				/>

				<button
					type='submit'
					disabled={loading}>
					Add Service
				</button>
			</form>
		</div>
	);
};

export default AddService;
