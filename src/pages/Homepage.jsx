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
			<p className='header-description'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit molestias est deserunt quis hic incidunt ipsa debitis vero laboriosam, at modi error libero repellendus aliquam. Corporis ullam fuga ipsam vero.</p>
		</div>

		<div className='homepage'>

			<div className='category-button art-button' onClick={() => handleCategoryClick('Art')}><span className='art-text'>Art</span></div>
			<div className='category-button design-button' onClick={() => handleCategoryClick('Design')}>Design</div>
			<div className='category-button food-button' onClick={() => handleCategoryClick('Food')}>Food</div>
			<div className='category-button sport-button' onClick={() => handleCategoryClick('Sport')}>Sport</div>
			<div className='category-button technology-button' onClick={() => handleCategoryClick('Technology')}>Technology</div>
			<div className='category-button travel-button' onClick={() => handleCategoryClick('Travel')}>Travel</div>
			
		</div>
		</>

		
	);
}

export default Homepage;
