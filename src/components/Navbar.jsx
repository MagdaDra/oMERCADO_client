import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import {ShoppingCartSimple} from 'phosphor-react'

function Navbar() {
	const { user, loading, logout } = useContext(AuthContext);
	const [cartTotal, setCartTotal] = useState(0)

	console.log(user);

	return (
		<nav className='Navbar'>
			<ul className='navbarList'>
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

				<div className='cart'>
				<p>{cartTotal}</p>

				<Link to='/cart'>
					<ShoppingCartSimple size={32} color="#ffffff" />
				</Link>
				</div>
				
			</ul>
		</nav>
	);
}

export default Navbar;
