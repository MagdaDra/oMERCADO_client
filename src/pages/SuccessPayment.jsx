import { CheckCircle } from 'phosphor-react';

function SuccessPayment() {
	return (
		<div className='flex flex-col items-center mt-32'>
			<div>
				<CheckCircle
					size={82}
					color='#f5f581'
				/>
			</div>
			<div className='text-white mt-10 ml-3 mr-3 text-center'>
				Payment completed successfully <br /> <br /> You will receive an email
				with all the details soon
			</div>
		</div>
	);
}

export default SuccessPayment;
