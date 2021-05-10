import { Order } from './../models/Order';
import create from 'zustand';

type OrderStore = {
	orders: Order[];
	setOrders: (orders: Order[]) => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
	orders: [],
	setOrders: (orders) => set((state) => ({ ...state, orders }))
}));
