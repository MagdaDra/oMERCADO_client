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
				<form
					onSubmit={handleSubmit}
					className='w-full pt-5'>
					<div>
						<div className='flex justify-center'>
							<input
								className='rounded-md border border-gray-300 text-sm w-1/3'
								type='string'
								placeholder='Full name'></input>

							<input
								className='rounded-md border border-gray-300 text-sm w-1/3'
								type='string'
								placeholder='Email'></input>
						</div>

						<div className='flex justify-center'>
							<input
								className='rounded-md border border-gray-300 text-sm w-1/3'
								type='string'
								placeholder='Name on card'></input>

							<input
								className='rounded-md border border-gray-300 text-sm w-1/3'
								type='string'
								placeholder='Expiration date (MM / YY)'
							/>
						</div>

						<div className='flex justify-center'>
							<input
								className='rounded-md border border-gray-300 text-sm w-1/3'
								type='number'
								placeholder='Card number'
							/>

							<input
								className='rounded-md border border-gray-300 text-sm w-1/3'
								type='number'
								placeholder='Security code (CVV)'
							/>
						</div>

						<div className='flex justify-center'>
							<div className='w-1/3'></div>
							<div className='w-1/3 flex flex-col items-end'>
								<div className='w-3/4 mt-2'>
									<img src={cards} />
								</div>

								<div className='mt-5'>
									<p>Total to pay: {totalCartSum} €</p>
								</div>

								<button
									type='submit'
									className='text-white text-sm items-center w-1/2 rounded-lg justify-center p-2 border bg-black hover:bg-[#9a9a9a] mt-5 mb-5'>
									Pay
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default Checkout;
