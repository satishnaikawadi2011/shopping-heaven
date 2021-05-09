import createStripe from 'stripe-client';
import { BACKEND_URL, PUBLISHABLE_STRIPE_KEY } from '../../constants';
import axios from 'axios';

const stripe = createStripe(PUBLISHABLE_STRIPE_KEY);

export interface CreditCard {
	name: string;
	cvc: string;
	exp_month: string;
	exp_year: string;
	number: string;
}

export const createTokenRequest = (card: CreditCard) => stripe.createToken({ card });

export const payRequest = (
	token: string,
	name: string,
	amount: number,
	orderId: string,
	onUploadProgress: (progress: any) => void
) => {
	return axios.post(
		`${BACKEND_URL}/order/${orderId}/pay`,
		{ token, name, amount },
		{
			onUploadProgress: (progress: ProgressEvent) => onUploadProgress(progress.loaded / progress.total * 100)
		}
	);
};
