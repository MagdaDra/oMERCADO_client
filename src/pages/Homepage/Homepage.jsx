import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import './Homepage.css';

function Homepage() {
	const navigate = useNavigate();
	const { user, loading } = useContext(AuthContext);
	const handleCategoryClick = (selectedCategory) => {
		navigate('/main', { state: { category: selectedCategory } });
	};

	return (
		<>
			<div className='homepage-header'>
				<div className='header-and-description'>
					<h1 className='title'>
						<span className='o'>o</span>MERCADO
					</h1>

					<p className='header-description'>
						Join our community today and experience the future of service
						exchange
					</p>
				</div>

				{!loading && !user && (
					<div className='flex justify-around md:justify-between pl-4 w-60 md:w-60 mb-8 md:mb-0 md:pl-8 md:pt-20 md:mr-2'>
						<Link to='/signup'>
							<button className='text-white font-bold text-sm items-center rounded-full justify-center p-2 w-24 border border-white hover:bg-[#9a9a9a]'>
								Sign up
							</button>
						</Link>
						<Link to='/login'>
							<button className='text-white font-bold text-sm items-center rounded-full justify-center p-2 w-24 border border-white hover:bg-[#9a9a9a]'>
								Log in
							</button>
						</Link>
					</div>
				)}
			</div>

			<div className='homepage'>
				<div
					className='category-button art-button'
					onClick={() => handleCategoryClick('Art')}>
					<span className='art-text'>Art</span>
				</div>
				<div
					className='category-button design-button'
					onClick={() => handleCategoryClick('Design')}>
					<span className='design-text'>Design</span>
				</div>
				<div
					className='category-button food-button'
					onClick={() => handleCategoryClick('Food')}>
					<span className='food-text'>Food</span>
				</div>
				<div
					className='category-button sport-button'
					onClick={() => handleCategoryClick('Sport')}>
					<span className='sport-text'>Sport</span>
				</div>
				<div
					className='category-button technology-button'
					onClick={() => handleCategoryClick('Technology')}>
					Technology
				</div>
				<div
					className='category-button travel-button'
					onClick={() => handleCategoryClick('Travel')}>
					Travel
				</div>
			</div>
			<Link to='/main'>
				<button className='browse-button flex text-white font-bold text-lg items-center rounded-full justify-center p-2 w-32 border border-[#f5f581] hover:bg-[#8d8d4a]'>
					Browse all
				</button>
			</Link>
		</>
	);
}

export default Homepage;
