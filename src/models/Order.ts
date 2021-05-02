export interface Order {
	shippingAddress: ShippingAddress;
	status: boolean;
	_id: string;
	orderItems?: (OrderItem)[] | null;
	amount: number;
	user: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}
export interface OrderItem {
	_id: string;
	price: number;
	productId: string;
	title: string;
	image: string;
	qty: number;
}
