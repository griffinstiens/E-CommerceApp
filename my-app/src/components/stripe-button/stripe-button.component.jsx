import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_VT0R14bZEKK8f6XhXzPaQbO500qqEnUmpD';

    const onToken = token => {
        alert('Payment successful!');
    }


    return (
        <StripeCheckout 
            label='Pay Now'
            name="Griffin's E-Commerce App"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;