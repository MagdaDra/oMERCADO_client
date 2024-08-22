import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [typeOfUser, setTypeOfUser] = useState([]);
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

		const selectedType = e.target.value;

		setTypeOfUser((prevTypesOfUser) => 
			prevTypesOfUser.includes(selectedType)
			? prevTypesOfUser.filter((type) => type !== selectedType)
			: [...typeOfUser, e.target.value]
			);
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
<div
className="relative mx-auto w-full max-w-md mt-20 bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
<div className="w-full">
    <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Sign up</h1>
    </div>
    <div className="mt-5">
        <form onSubmit={handleSubmit}>
            <div className="relative mt-6">
                <input onChange={handleName} type="name" name="userName" id="userName" value={name} placeholder="Username" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 text-black placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Username</label>
            </div>

            <label htmlFor='typeOfUser'>Type of user</label>
				{checkboxes.map((checkbox) => (
					<label key={checkbox.id} className='flex items-center space-x-2 mb-2 text-black'>
						<input
							type='checkbox'
							name='typeOfUser'
							value={checkbox.label}
							checked={typeOfUser.includes(checkbox.label)}
							onChange={handleTypeOfUser}
							className="form-checkbox h-3 w-5"
						/>
						{checkbox.label}
					</label>
				))}

            <div className="relative mt-6">
                <input onChange={handleEmail} type="email" name="email" id="email-signup" value={email} placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 text-black placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
            </div>
            <div className="relative mt-6">
                <input onChange={handlePassword} type="password" name="password" id="password" value={password} placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 text-black px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
            </div>
            <div className="my-6">
                <button type="submit" className="w-full rounded-full bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign up</button>
            </div>
            <p className="text-center text-sm text-gray-500">Already have an account?&nbsp; 
                <Link to='/signup' className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">
                &nbsp;Log in
                </Link>
            </p>
            {errorMessage && <p className='text-[#CC0000] mt-8 text-center'>{errorMessage}</p>}
        </form>
    </div>
</div>
</div>		
	);
}

export default SignupPage;
