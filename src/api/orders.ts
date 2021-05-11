import { PaymentMethodType } from '../utils/types';
import { Address } from './../models/Address';
import { CartItem } from './../models/CartItem';
import client from './client';

const endpoint = '/order';

const getOrdersRelatedToUser = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}/me`);
};


const addOrder = (cartItems:CartItem[],preferredAddress:Address,totalAmount:number,itemsPrice:number,taxPrice:number,shippingPrice:number,paymentMethod:PaymentMethodType) => {
	return client.post(`${endpoint}/add`, {
			orderItems: cartItems.map(crtItm => {
				return {
					title: crtItm.title,
					image: crtItm.image,
					price: crtItm.price,
					qty: crtItm.quantity,
					productId: crtItm._id
				}
			}),
			address: {
				fullName: preferredAddress?.fullName,
				phoneNumber: preferredAddress?.phoneNumber,
				pincode: preferredAddress?.pincode,
				state: preferredAddress?.state,
				country: preferredAddress?.country,
				road: preferredAddress?.road,
				building: preferredAddress?.building,
				city: preferredAddress?.city
			},
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice:totalAmount,
			paymentMethod
		})
}

const deleteOrder = (orderId: string) => {
	return client.delete(`${endpoint}/${orderId}`)
}

export default {
	getOrdersRelatedToUser,
	addOrder,
	deleteOrder
};
