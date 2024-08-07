import { useState, useEffect, createContext } from 'react';
import axios from 'axios'; // to connect with the server

// Create context
const AuthContext = createContext();

// Create the wrapper function

function AuthProviderWrapper(props) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const storeToken = (token) => {
		localStorage.setItem('authToken', token);
	};

	const authenticateUser = async () => {
		// Check if there's a token on localstorage
		const storedToken = localStorage.getItem('authToken');

		// If there is a token, we verify on the API
		if (storedToken) {
			try {
				setLoading(true);
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/auth/verify`,
					{
						headers: {
							Authorization: `Bearer ${storedToken}`,
						},
					},
				);

				// return user information or an error

				setUser(response.data);
				setLoading(false);
			} catch (error) {
				setUser(null);
				setLoading(false);
			}
		} else {
			setUser(null);
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		authenticateUser();
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ loading, user, storeToken, authenticateUser, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export {AuthContext, AuthProviderWrapper}
