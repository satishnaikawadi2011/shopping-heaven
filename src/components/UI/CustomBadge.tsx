import React from 'react';
import { ViewStyle } from 'react-native';
import { Badge } from 'react-native-paper';
import { useCartStore } from '../../store/cart';

interface CustomBadgeProps {
	style?: ViewStyle;
	size?: number;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ style, size }) => {
	const { itemCount } = useCartStore();
	return (
		<Badge
			style={style}
			visible={

					itemCount() > 0 ? true :
					false
			}
			size={size}
		>
			{itemCount()}
		</Badge>
	);
};

export default CustomBadge;
