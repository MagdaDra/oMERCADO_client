import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ServicesAPIService from '../services/services.api';
import { AuthContext } from '../context/auth.context';

const servicesService = new ServicesAPIService();

const EditService = () => {
	const [serviceName, setServiceName] = useState('');
	const [serviceDescription, setServiceDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [date, setDate] = useState('');
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState([]);

	const { user } = useContext(AuthContext);
	const { serviceId } = useParams();

	const categories = [
		{ id: 1, label: 'IT' },
		{ id: 2, label: 'Art' },
		{ id: 3, label: 'Design' },
		{ id: 4, label: 'Sport' },
		{ id: 6, label: 'Food' },
		{ id: 8, label: 'Sightseeing' },
	];

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
		const selectedCategory = e.target.value;

		setCategory((prevCategories) => 
			prevCategories.includes(selectedCategory) 
			? prevCategories.filter((cat) => cat !== selectedCategory)
			: [...category, e.target.value]
			)
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updatedService = {
			serviceName,
			serviceDescription,
			price,
			quantity,
			date,
			img,
			category,
			createdBy: user._id,
		};
		try {
			await servicesService.editService(serviceId, updatedService);
			navigate(`/services/${serviceId}`);
		} catch (error) {
			console.error(error);
		}
	};

	const getSingleService = async () => {
		try {
			const response = await servicesService.getServiceById(serviceId);
			setServiceName(response.data.serviceName);
			setServiceDescription(response.data.serviceDescription);
			setPrice(response.data.price);
			setQuantity(response.data.quantity);
			setDate(response.data.date);
			setImg(response.data.img);
			setCategory(response.data.category);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getSingleService();
	}, []);

	return (
		<div>
			<h2>Edit Service</h2>

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
				{categories.map((categoryValue) => (
					<div key={categoryValue.id}>
						<input
							type='checkbox'
							name='category'
							value={categoryValue.label}
							onChange={handleCategory}
                            checked={category.includes(categoryValue.label)} // this checks if the category is selected
						/>
						{categoryValue.label}
					</div>
				))}

				<button
					type='submit'
					disabled={loading}>
					Edit
				</button>
			</form>
		</div>
	);
};

export default EditService;
