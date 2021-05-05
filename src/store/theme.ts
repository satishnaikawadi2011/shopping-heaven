import create from 'zustand';

type ThemeStore = {
	isDarkTheme: boolean;
	setIsDarkTheme: (value: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
	isDarkTheme: false,
	setIsDarkTheme: (value) => set((state) => ({ ...state, isDarkTheme: value }))
}));
