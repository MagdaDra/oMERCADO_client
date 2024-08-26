import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/cart.contex';
import { AuthContext } from '../context/auth.context';
import TransactionAPIService from '../services/transaction.api';

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
			localStorage.removeItem('Cart')
			localStorage.removeItem('Cart_Quantity')
			localStorage.removeItem('Cart_Total')
			navigate('/payment-completed');
			navigate(0)
			
		} catch (error) {
			console.error('Error when creating transaction', error);
		}
	};

	return (
		<>

			<div className='summary'>
				<h3>Summary</h3>
				<p>Total: {totalCartSum} €</p>
			</div>

			<div className='payment-form'>
				<form
					className='payment-form'
					onSubmit={handleSubmit}>
					<input
						type='string'
						placeholder="Cardholder's Name"></input>
					<input
						type='number'
						placeholder='Card Number'
					/>
					<input
						type='string'
						placeholder='MM/YY'
					/>
					<input
						type='number'
						placeholder='CVV'
					/>

					<button
						type='submit'
						className='payment-button'>
						Pay
					</button>
				</form>
			</div>
		</>
	);
}

export default Checkout;
