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
	<div
		className="relative mx-auto w-full max-w-md mt-20 bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
		<div className="w-full">
			<div className="text-center">
				<h1 className="text-3xl font-semibold text-gray-900">Log in</h1>
			</div>
			<div className="mt-5">
				<form onSubmit={handleSubmit}>
					<div className="relative mt-6">
						<input onChange={handleEmail} type="email" name="email" id="email" value={email} placeholder="Email Address" className="email peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 text-black placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
						<label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
					</div>
					<div className="relative mt-6">
						<input onChange={handlePassword} type="password" name="password" id="password" value={password} placeholder="Password" className="password peer peer mt-1 w-full border-b-2 border-gray-300 text-black px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
						<label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
					</div>
					<div className="my-6">
						<button type="submit" className="w-full rounded-full bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Log in</button>
					</div>
					<p className="text-center text-sm text-gray-500">Don&apos;t have an account yet?&nbsp; 
						<Link to='/signup' className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">
						&nbsp;Sign up
						</Link>
					</p>
					{errorMessage && <p className='text-[#CC0000] mt-8 text-center'>{errorMessage}</p>}
				</form>
			</div>
		</div>
	</div>
	);
}

export default LoginPage;
