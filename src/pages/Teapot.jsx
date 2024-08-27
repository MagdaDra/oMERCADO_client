import { Link } from 'react-router-dom';
import { Alien } from 'phosphor-react';


const Teapot = () => {
	return (
		<div className='flex flex-col items-center mt-32'>
			<div>
				<Alien
					size={82}
					color='#f5f581'
				/>
			</div>
			<h1 className='text-white text-3xl mt-5'>404</h1>
            <p>Page not found </p>
			<Link to='/'>
				<button className='mt-8 flex text-white font-bold text-lg items-center rounded-full justify-center p-2 w-60 border border-[#f5f581] hover:bg-[#8d8d4a]'>Back to homepage</button>
			</Link>
		</div>
	);
};

export default Teapot;
