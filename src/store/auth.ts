import { User } from './../models/User';
import create from 'zustand';

type AuthStore = {
	token: string | null;
	user: User | null;
	expiryDate: Date | null;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	setToken: (token: string) => void;
	setUser: (user: User) => void;
	setExpiryDate: (expiryDate: Date) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	token: null,
	expiryDate: null,
	user: null,
	loading: false,
	setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
	setToken: (token: string) => set((state) => ({ ...state, token })),
	setUser: (user: User) => set((state) => ({ ...state, user })),
	setExpiryDate: (expiryDate: Date) => set((state) => ({ ...state, expiryDate }))
}));
