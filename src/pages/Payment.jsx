import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cart.contex";

function Payment() {

  const {totalCartSum} = useContext(CartContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment-completed')
    // how to pass the total and the cartItems to the backend to make transaction?
  }

  return (
    <>

    <h1>Checkout</h1>

    <div className='summary'>
      <h3>Summary</h3>
      <p>Total: {totalCartSum} €</p>
    </div>
    
    <div className='payment-form'>
      <form className='payment-form' onSubmit={handleSubmit}>
        <input type='string' placeholder='Cardholder&apos;s Name'></input>
        <input type='number' placeholder='Card Number'/>
        <input type='string' placeholder='MM/YY' />
        <input type='number' placeholder='CVV'/>

        <button type='submit' className='payment-button'>Pay</button>

      </form>
    </div>

    </>
  )
}

export default Payment