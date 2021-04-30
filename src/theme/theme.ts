import { DefaultTheme, configureFonts } from 'react-native-paper';
import { fontConfig } from './fontConfig';

// 1b512d
// 1c7c54

export const theme = {
	...DefaultTheme,
	dark: true,
	colors:
		{
			...DefaultTheme.colors,
			primary: '#73e2a7',
			accent: '#b1cf5f'
		},
	fonts: configureFonts(fontConfig)
};
