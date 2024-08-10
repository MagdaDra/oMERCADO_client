import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import MainServicesPage from './pages/MainServicePage';
import UserProfile from './pages/UserProfile';
import Private from './components/Private';
import Anon from './components/Anon';
import AddService from './pages/AddService';
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
			</Routes>
		</div>
	);
}

export default App;
