import createStripe from 'stripe-client';
import { PUBLISHABLE_STRIPE_KEY } from '../../constants';
import client from '../api/client';

const stripe = createStripe(PUBLISHABLE_STRIPE_KEY);

export interface CreditCard {
	name: string;
	cvc: string;
	exp_month: string;
	exp_year: string;
	number: string;
}

const createTokenRequest = (card: CreditCard) => stripe.createToken({ card });

const payRequest = (token: string, name: string, amount: number, orderId: string) => {
	return client.post(`/order/${orderId}/pay`, { token, name, amount });
};

export default {
	createTokenRequest,
	payRequest
};
