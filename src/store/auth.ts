import create from 'zustand';

export const useAuthStore = create((set) => ({
	token: null,
	expiryDate: null,
	userId: null,
	setToken: (token: string) => set((state) => ({ ...state, token: token })),
	setUserId: (userId: string) => set((state) => ({ ...state, userId })),
	setExpiryDate: (expiryDate: string) => set((state) => ({ ...state, expiryDate }))
}));
