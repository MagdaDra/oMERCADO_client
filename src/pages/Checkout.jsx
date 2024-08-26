import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/cart.contex';
import { AuthContext } from '../context/auth.context';
import TransactionAPIService from '../services/transaction.api';
import cards from '/public/assets/cards.png';

const transactionService = new TransactionAPIService();

function Checkout() {
	const { totalCartSum, services } = useContext(CartContext);
	const { user } = useContext(AuthContext);
	console.log('User in the checkout: ', user);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requestBody = {
			userId: user ? user._id : null,
			total: totalCartSum,
			cart: services,
		};
		try {
			const newTransaction = await transactionService.createTransaction(
				requestBody,
			);
			console.log(newTransaction);
			localStorage.removeItem('Cart');
			localStorage.removeItem('Cart_Quantity');
			localStorage.removeItem('Cart_Total');
			navigate('/payment-completed');
			navigate(0);
		} catch (error) {
			console.error('Error when creating transaction', error);
		}
	};

	return (
		<>
			<div className='bg-white text-gray-900 rounded-2xl w-1/2 m-auto mt-14 shadow-lg shadow-gray-200'>
				
				<form onSubmit={handleSubmit} className='w-full'>
					<div className='flex'>
						<div className='flex flex-col'>
							<input
								className='rounded-md border border-gray-300 text-sm'
								type='string'
								placeholder='Full name'></input>
							<input
								className='rounded-md border border-gray-300 text-sm'
								type='string'
								placeholder='Name on card'></input>
							<input
								className='rounded-md border border-gray-300 text-sm'
								type='string'
								placeholder='Expiration date (MM / YY)'
							/>
						</div>

						<div className='flex flex-col'>	

							<input
								className='rounded-md border border-gray-300 text-sm'
								type='string'
								placeholder='Email'></input>
						
							<input
								className='rounded-md border border-gray-300 text-sm'
								type='number'
								placeholder='Card number'
							/>
						
						
							<input
								className='rounded-md border border-gray-300 text-sm'
								type='number'
								placeholder='Security code (CVV)'
							/>
						
						
							<div className='w-1/4'>
								<img
									src={cards}
									className='flex justify-center items-center'
								/>
							</div>

							<div className='summary'>
								<p>Total to pay: {totalCartSum} €</p>
							</div>

							<button
								type='submit'
								className='text-white text-sm items-center rounded-lg justify-center p-2 w-24 border bg-black hover:bg-[#9a9a9a] mt-2'>
								Pay
							</button>
						</div>	
					</div>
				</form>
				
			</div>
		</>
	);
}

export default Checkout;
