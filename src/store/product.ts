import create from 'zustand';

export const useProductStore = create((set, get) => ({
	products: [],
	categories: [],
	setProducts: (token: string) => set((state) => ({ ...state, token: token })),
	setUserId: (userId: string) => set((state) => ({ ...state, userId })),
	setExpiryDate: (expiryDate: string) => set((state) => ({ ...state, expiryDate }))
}));
