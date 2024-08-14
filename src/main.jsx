import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'; // this package allows us to have multiple pages;
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { CartProviderWrapper } from './context/cart.contex.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<AuthProviderWrapper>
				<CartProviderWrapper>
						<App />
				</CartProviderWrapper>
			</AuthProviderWrapper>
		</Router>
	</React.StrictMode>,
);
