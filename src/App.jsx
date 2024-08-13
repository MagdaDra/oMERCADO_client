import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import MainServicesPage from './pages/MainServicesPage';
import UserProfile from './pages/UserProfile';
import Private from './components/Private';
import Anon from './components/Anon';
import AddService from './pages/AddService';
import SingleServicePage from './pages/SingleServicePage';
import EditService from './pages/EditService';
import Cart from './pages/Cart';
import './App.css';

function App() {
	return (
		<div>
			<Navbar />

			<Routes>
				<Route
					path='/'
					element={<Homepage />}
				/>

				<Route
					path='/main'
					element={<MainServicesPage />}
				/>

				<Route
					path='/signup'
					element={
						<Anon>
							<SignupPage />
						</Anon>
					}
				/>

				<Route
					path='/login'
					element={
						<Anon>
							<LoginPage />
						</Anon>
					}
				/>

				<Route
					path='/user-profile'
					element={
						<Private>
							<UserProfile />
						</Private>
					}
				/>

				<Route
					path='/add-service'
					element={
						<Private>
							<AddService />
						</Private>
					}
				/>

				<Route
					path='/services/:serviceId'
					element={<SingleServicePage/>}
				/>

				<Route 
					path='/services/edit/:serviceId'
					element={<EditService/>}
				/>

				<Route 
					path='/cart'
					element={<Cart/>}
				/>


			</Routes>
		</div>
	);
}

export default App;
