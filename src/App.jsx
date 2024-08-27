import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import MainServicesPage from './pages/MainServicesPage/MainServicesPage';
import UserProfile from './pages/UserProfile';
import Private from './components/Private';
import Anon from './components/Anon';
import AddService from './pages/AddService/AddService';
import SingleServicePage from './pages/SingleServicePage/SingleServicePage';
import EditService from './pages/EditService/EditService';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout/Checkout';
import SuccessPayment from './pages/SuccessPayment';
import Layout from './components/Layout';
import Teapot from './pages/Teapot';
import './App.css';

function App() {
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={<Homepage />}
				/>

				<Route
					path='/main'
					element={
						<Layout>
							<MainServicesPage />
						</Layout>
					}
				/>

				<Route
					path='/signup'
					element={
						<Anon>
							<Layout>
								<SignupPage />
							</Layout>
						</Anon>
					}
				/>

				<Route
					path='/login'
					element={
						<Anon>
							<Layout>
								<LoginPage />
							</Layout>
						</Anon>
					}
				/>

				<Route
					path='/user-profile'
					element={
						<Private>
							<Layout>
								<UserProfile />
							</Layout>
						</Private>
					}
				/>

				<Route
					path='/add-service'
					element={
						<Private>
							<Layout>
								<AddService />
							</Layout>
						</Private>
					}
				/>

				<Route
					path='/services/:serviceId'
					element={
						<Layout>
							<SingleServicePage />
						</Layout>
					}
				/>

				<Route
					path='/services/edit/:serviceId'
					element={
						<Layout>
							<EditService />
						</Layout>
					}
				/>

				<Route
					path='/cart'
					element={
						<Layout>
							<Cart />
						</Layout>
					}
				/>

				<Route
					path='/checkout'
					element={
						<Layout>
							<Checkout />
						</Layout>
					}
				/>

				<Route
					path='/payment-completed'
					element={
						<Layout>
							<SuccessPayment />
						</Layout>
					}
				/>

				<Route
					path='*'
					element={<Teapot />}
				/>
			</Routes>
		</div>
	);
}

export default App;
