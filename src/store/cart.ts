import { CartItem } from './../models/CartItem';
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CartStore = {
	cartItems: CartItem[];
	loading: boolean;
	setLoading: (loading: boolean) => void;
	setCartItems: (items: CartItem[]) => void;
	addToCart: (item: { id: string; price: number; image: string; title: string }) => void;
	removeFromCart: (productId: string) => void;
	isInCart: (productId: string) => boolean;
	clearCart: () => void;
	itemCount: () => number;
	totalAmount: () => number;
	totalItems: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
	cartItems: [],
	loading: false,
	setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
	setCartItems: (items: CartItem[]) => set((state) => ({ ...state, cartItems: items })),
	isInCart:
		(productId) => {
			const cartItems = get().cartItems;
			const cartItem = cartItems.find((cartItm) => cartItm._id === productId);
			if (cartItem) return true;
			return false;
		},
	addToCart:
		({ id, image, price, title }) => {
			const cartItems = get().cartItems;
			const cartItem = cartItems.find((cartItm) => cartItm._id === id);
			const index = cartItems.findIndex((cartItm) => cartItm._id === id);
			if (cartItem) {
				const newItems = [
					...cartItems
				];
				const updatedCartItem: CartItem = {
					...cartItem,
					quantity: cartItem.quantity + 1
				};
				newItems[index] = updatedCartItem;
				get().setCartItems([
					...newItems
				]);
			}
			else {
				const newItems = [
					...cartItems
				];
				newItems.push({
					_id: id,
					image,
					price,
					title,
					quantity: 1
				});
				get().setCartItems([
					...newItems
				]);
			}
			saveCartDataToAsyncStorage(get().cartItems);
		},
	removeFromCart:
		(productId: string) => {
			const cartItems = get().cartItems;
			const updatedCartItems = cartItems.filter((itm) => itm._id !== productId);
			get().setCartItems([
				...updatedCartItems
			]);
			saveCartDataToAsyncStorage(get().cartItems);
		},
	clearCart:
		() => {
			set((state) => ({ ...state, cartItems: [] }));
			saveCartDataToAsyncStorage([]);
		},
	itemCount:
		() => {
			return get().cartItems.length;
		},
	totalAmount:
		() => {
			let total = 0;
			get().cartItems.forEach((item) => {
				total += item.quantity * item.price;
			});
			return total;
		},
	totalItems:
		() => {
			let total = 0;
			get().cartItems.forEach((item) => {
				total += item.quantity;
			});
			return total;
		}
}));

const saveCartDataToAsyncStorage = (items: CartItem[]) => {
	AsyncStorage.setItem('cartData', JSON.stringify({ cartItems: items }));
};

export const getCartDataFromAsyncStorage = async () => {
	const cartItems: any = await AsyncStorage.getItem('cartData');
	if (cartItems) {
		return JSON.parse(cartItems);
	}
	return null;
};
