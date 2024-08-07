import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
	const [username, setUsername] = useState;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();

	const handleUsername = (e) => setUsername(e.target.value);
	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
		// Prevent reloading the page
		e.preventDefault();
		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
				username,
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
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					name='username'
					id='username'
					value={username}
					onChange={handleUsername}
				/>
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
            <Link to='/login'>Login</Link>

		</div>
	);
}

export default SignupPage;
