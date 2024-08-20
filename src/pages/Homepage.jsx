import { useNavigate, Link } from 'react-router-dom';

function Homepage() {
	const navigate = useNavigate();

	const handleCategoryClick = (selectedCategory) => {
		navigate('/main', { state: { category: selectedCategory } });
	};

	return (
		<>
			<div className='homepage-header'>
				<h1 className='title'>
					<span className='o'>o</span>MERCADO
				</h1>
				<div className='description-and-button'>
					<p className='header-description'>
						The ultimate marketplace for buying and selling professional
						services. <br /> Simple, secure, and efficient. <br /> <br /> Join
						our community today and experience the future of service exchange.
					</p>

					<Link to='/main'>
						<button className='browse-button flex text-white font-bold text-lg items-center rounded-full justify-center p-2 w-32 border border-[#f5f581] hover:bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-75 ease-in-out cursor-pointer'>
							Browse all
						</button>
					</Link>
				</div>
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
		</>
	);
}

export default Homepage;
