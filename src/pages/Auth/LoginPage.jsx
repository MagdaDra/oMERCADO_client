import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);

	const { storeToken, authenticateUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/login`,
				{
					email,
					password,
				},
			);
			// Store the token
			storeToken(response.data.authToken);

			// Use the same token to verify the user
			authenticateUser();

			navigate('/main');

		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	};

	return (
		<div className='LoginPage'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
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
				<button type='submit'>Login</button>
			</form>

			{errorMessage && <p>{errorMessage}</p>}

			<p>Don`t have an account?</p>
			<Link to='/signup'>Sign up</Link>
		</div>
	);
}

export default LoginPage;
