import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [typeOfUser, setTypeOfUser] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const checkboxes = [
		{ id: 1, label: 'Customer' },
		{ id: 2, label: 'Seller' },
	];

	const navigate = useNavigate();

	const handleName = (e) => setName(e.target.value);
	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleTypeOfUser = (e) => {
		setTypeOfUser(e.target.value);
	};

	const handleSubmit = async (e) => {
		// Prevent reloading the page
		e.preventDefault();
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
				name,
				typeOfUser,
				email,
				password,
			});
			navigate('/login');
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	};

	return (
		<div className='SignupPage'>
			<h2>Signup</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Username</label>
				<input
					type='text'
					name='name'
					id='name'
					value={name}
					onChange={handleName}
				/>

				<label htmlFor='typeOfUser'>Type of user</label>
				{checkboxes.map((checkbox) => (
					<div key={checkbox.id} className='singup-checkbox'>
						<input
							type='checkbox'
							name='typeOfUser'
							value={checkbox.label}
							checked={typeOfUser === checkbox.label}
							onChange={handleTypeOfUser}
						/>
						{checkbox.label}
					</div>
				))}

				<label htmlFor='email'>Email</label>
				<input
					type='email'
					name='email'
					id='email'
					value={email}
					onChange={handleEmail}
				/>

				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					value={password}
					onChange={handlePassword}
				/>

				<button type='submit'>Signup</button>
			</form>

			{errorMessage && <p className='error-message'> {errorMessage} </p>}

			<p>Already have an account?</p>
			<Link to='/login'>Log in</Link>
		</div>
	);
}

export default SignupPage;
