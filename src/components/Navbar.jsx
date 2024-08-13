import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import {ShoppingCartSimple} from 'phosphor-react'

function Navbar() {
	const { user, loading, logout } = useContext(AuthContext);

	console.log(user);

	return (
		<nav className='Navbar'>
			<ul>
				<p>{user ? `Hello ${user.name}` : ''}</p>
				{user && (
					<img
						className='profile-pic'
						src={user.img}
					/>
				)}

				<Link to='/main'>
					<button>Discover services</button>
				</Link>

				{!loading && user && (
					<>
						<Link to='/user-profile'>
							<button>User profile</button>
						</Link>
						<button onClick={logout}>Log out</button>
					</>
				)}

				{!loading && user && user.typeOfUser.includes('Seller') && (
					<>
						<Link to='/add-service'>
							<button>Add service</button>
						</Link>
					</>
				)}

				{!loading && !user && (
					<>
						<Link to='/signup'>
							<button>Signup</button>
						</Link>
						<Link to='/login'>
							<button>Login</button>
						</Link>
					</>
				)}

				<Link to='/cart'>
					<ShoppingCartSimple size={32} color="#ffffff" />
				</Link>
			</ul>
		</nav>
	);
}

export default Navbar;
