import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
	const { user, loading, logout } = useContext(AuthContext);

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
				<NavLink
					className={({ isActive }) => (isActive ? 'selected' : '')}
					to='/main'>
					Discover services
				</NavLink>

                {!loading && user && (
                    <>
                        <Link to='/user-profile'>
                            <button>User profile</button>
                        </Link>
                        <button onClick={logout}>Log out</button>
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
