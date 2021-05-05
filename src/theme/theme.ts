import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, configureFonts } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { fontConfig } from './fontConfig';

export const CustomDefaultTheme = {
	...NavigationDefaultTheme,
	...PaperDefaultTheme,
	colors:
		{
			...NavigationDefaultTheme.colors,
			...PaperDefaultTheme.colors,
			primary: '#73e2a7',
			accent: '#b1cf5f'
		},
	fonts: configureFonts(fontConfig)
};

export const CustomDarkTheme = {
	...NavigationDarkTheme,
	...PaperDarkTheme,
	colors:
		{
			...NavigationDarkTheme.colors,
			...PaperDarkTheme.colors,
			primary: '#73e2a7',
			accent: '#b1cf5f'
		},
	fonts: configureFonts(fontConfig)
};
