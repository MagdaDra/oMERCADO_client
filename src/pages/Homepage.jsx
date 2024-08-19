import { useNavigate } from "react-router-dom";


function Homepage() {
	
	const navigate = useNavigate();

	const handleCategoryClick = (selectedCategory) => {
	
		navigate('/main', {state: {category: selectedCategory}})
	}

	return (
		<>

		<div className='homepage-header'>
			<h1 className='title'><span className='o'>o</span>MERCADO</h1>
			<p className='header-description'>Welcome to the ultimate marketplace for buying and selling professional services. Simple, secure, and efficient. <br/> <br/> Join our community today and experience the future of service exchange.</p>
		</div>

		<div className='homepage'>

			<div className='category-button art-button' onClick={() => handleCategoryClick('Art')}><span className='art-text'>Art</span></div>
			<div className='category-button design-button' onClick={() => handleCategoryClick('Design')}><span className='design-text'>Design</span></div>
			<div className='category-button food-button' onClick={() => handleCategoryClick('Food')}><span className='food-text'>Food</span></div>
			<div className='category-button sport-button' onClick={() => handleCategoryClick('Sport')}><span className='sport-text'>Sport</span></div>
			<div className='category-button technology-button' onClick={() => handleCategoryClick('Technology')}>Technology</div>
			<div className='category-button travel-button' onClick={() => handleCategoryClick('Travel')}>Travel</div>
			
		</div>
		</>

		
	);
}

export default Homepage;
