import createStripe from 'stripe-client';
import { PUBLISHABLE_STRIPE_KEY } from '../../constants';

const stripe = createStripe(PUBLISHABLE_STRIPE_KEY);

export interface CreditCard {
	name: string;
	cvc: string;
	exp_month: string;
	exp_year: string;
	number: string;
}

export const createTokenRequest = (card: CreditCard) => stripe.createToken({ card });
