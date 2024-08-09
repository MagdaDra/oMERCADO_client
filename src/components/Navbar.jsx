import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
	const { user, loading, logout } = useContext(AuthContext);

	console.log(user)

	return (
		<nav className='Navbar'>
			<p>{user ? ('Hello ', user.name) : ''}</p>
			{user && (
				<img
					className='profile-pic'
					src={user.img}
				/>
			)}
			<ul>
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

				{!loading && user && user.typeOfUser === 'Seller' && (
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
			</ul>
		</nav>
	);
}

export default Navbar;
