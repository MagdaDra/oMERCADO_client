import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServicesAPIService from '../../services/services.api';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import './AddService.css'

const servicesService = new ServicesAPIService();

const AddService = () => {
	const [serviceName, setServiceName] = useState('');
	const [serviceDescription, setServiceDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [date, setDate] = useState('');
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState([]);

	const { user } = useContext(AuthContext);

	const categories = [
		{ id: 1, label: 'Art' },
		{ id: 2, label: 'Design' },
		{ id: 3, label: 'Food' },
		{ id: 4, label: 'Sport' },
		{ id: 6, label: 'Technology' },
		{ id: 8, label: 'Travel' },
	];

	const navigate = useNavigate();

	const handleServiceName = (e) => {
		setServiceName(e.target.value);
	};

	const handleServiceDescription = (e) => {
		setServiceDescription(e.target.value);
	};

	const handlePrice = (e) => {
		e.preventDefault()
		setPrice(e.target.value);
	};

	const handleQuantity = (e) => {
		e.preventDefault()
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
			console.error('Error loading the image in AddService ', error);
		}
	};

	const handleCategory = (e) => {
		const selectedCategory = e.target.value;

		setCategory((prevCategories) =>
			prevCategories.includes(selectedCategory)
				? prevCategories.filter((cat) => cat !== selectedCategory)
				: [...category, e.target.value],
		);
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
			createdBy: user._id,
		};
		try {
			await servicesService.createService(requestBody);
			navigate('/main');
			navigate(0);
		} catch (error) {
			console.error('Error in AddService ', error);
		}
	};

	return (
		<div className='flex flex-col items-center bg-white text-gray-900 rounded-2xl w-1/2 m-auto mt-14 shadow-lg shadow-gray-200'>
			<h2 className='mt-5 mb-5 font-bold'>Add Service</h2>

			<form onSubmit={handleSubmit} className='w-3/4'>
				<label className='mt-2'>Name</label>
				<input
					className='rounded-md border border-gray-300 text-sm w-full'
					type='text'
					name='serviceName'
					value={serviceName}
					onChange={handleServiceName}
				/>

				<label className='mt-2'>Description</label>
				<textarea
					className='rounded-md border border-gray-300 text-sm w-full'
					rows={15}
					cols={5}
					itemType='text'
					name='serviceDescription'
					value={serviceDescription}
					onChange={handleServiceDescription}></textarea>

				<label className='mt-2'>Price</label>
				<input
					className='rounded-md border border-gray-300 text-sm w-full'
					type='number'
					name='price'
					value={price}
					onChange={handlePrice}
				/>

				<label className='mt-2'>Quantity</label>
				<input
					className='rounded-md border border-gray-300 text-sm w-full'
					type='number'
					name='quantity'
					value={quantity}
					onChange={handleQuantity}
				/>

				<label className='mt-2'>Date</label>
				<input
					className='rounded-md border border-gray-300 text-sm w-full'
					type='date'
					name='date'
					value={date}
					onChange={handleDate}
				/>

				<label className='mt-2'>Image</label>
				<input
					className='rounded-md border border-gray-300 text-sm w-full'
					type='file'
					name='img'
					onChange={handleImg}
				/>

				<label className='mt-2'>Category</label>
				<div className='flex flex-col items-start w-full mt-2'>
				{categories.map((categoryValue) => (
					<div key={categoryValue.id}>
						<input
							type='checkbox'
							name='category'
							value={categoryValue.label}
							onChange={handleCategory}
							className="h-3 w-5"
						/>
						{categoryValue.label}
					</div>
				))}
				</div>
				<div className='flex justify-center mt-5 mb-5'>
				<button
					type='submit'
					disabled={loading}
					className='text-white text-sm items-center w-1/2 rounded-full justify-center p-2 border bg-black hover:bg-[#9a9a9a] mt-5 mb-5'>
					Add Service
				</button>
				</div>
			</form>
		</div>
	);
};

export default AddService;
