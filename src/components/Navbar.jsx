import { Link, useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import { AuthContext } from '../context/auth.context';
import { CartContext } from '../context/cart.contex';
import { ShoppingCartSimple } from 'phosphor-react';


function Navbar() {
	const { user, loading, logout } = useContext(AuthContext);
	const { cartTotalQuantity } = useContext(CartContext);
	const navigate = useNavigate()
	
	const handleDiscoverServices = () => {
		// Clear the category state, navigate and refresh
		navigate('/main', {state: {category: ''}})
		navigate(0)
	}

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

				
				<button onClick={handleDiscoverServices}>Discover services</button>
				

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
					<p>{cartTotalQuantity}</p>

					<Link to='/cart'>
						<ShoppingCartSimple
							size={32}
							color='#ffffff'
						/>
					</Link>
				</div>
			</ul>
		</nav>
	);
}

export default Navbar;
