import { useNavigate } from "react-router-dom";


function Homepage() {
	
	const navigate = useNavigate();

	const handleCategoryClick = (selectedCategory) => {
	
		navigate('/main', {state: {category: selectedCategory}})
	}

	return (
		<>
		<div className='homepage'>

			<div className='category-button' onClick={() => handleCategoryClick('Art')}>Art</div>
			<div className='category-button' onClick={() => handleCategoryClick('Design')}>Design</div>
			<div className='category-button' onClick={() => handleCategoryClick('Food')}>Food</div>
			<div className='category-button' onClick={() => handleCategoryClick('Sport')}>Sport</div>
			<div className='category-button' onClick={() => handleCategoryClick('Technology')}>Technology</div>
			<div className='category-button' onClick={() => handleCategoryClick('Travel')}>Travel</div>
			
		</div>
		</>

		
	);
}

export default Homepage;
