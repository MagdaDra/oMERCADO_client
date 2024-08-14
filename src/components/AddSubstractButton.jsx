import { useState } from 'react';

function AddSubstractButton() {
	const [count, setCount] = useState(0);

	return (
		<div className = 'add-substr-button'>
			<button onClick={() => setCount(count - 1)}>-</button>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>+</button>
		</div>
	);
}

export default AddSubstractButton;
