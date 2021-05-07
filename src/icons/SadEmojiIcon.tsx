import * as React from 'react';
import Svg, { Circle, Path, G, SvgProps } from 'react-native-svg';

function SadEmojiIcon({ ...props }: any & React.ComponentClass<SvgProps, any>) {
	return (
		<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
			<Circle cx={256.002} cy={256.001} r={245.994} fill="#fddf6d" />
			<Path
				d="M308.715 465.677c-135.858 0-245.993-110.134-245.993-245.993 0-72.584 31.443-137.816 81.444-182.842C64.528 77.562 10.008 160.412 10.008 256c0 135.858 110.134 245.993 245.993 245.993 63.274 0 120.962-23.898 164.549-63.149-33.553 17.154-71.562 26.833-111.835 26.833z"
				fill="#fcc56b"
			/>
			<G fill="#7f184c">
				<Path d="M367.914 417.236H248.456c-5.528 0-10.007-4.479-10.007-10.007s4.479-10.007 10.007-10.007h119.457c5.528 0 10.007 4.479 10.007 10.007s-4.478 10.007-10.006 10.007zM221.086 314.249c-24.337 0-46.325-6.227-58.817-16.658-4.243-3.541-4.81-9.853-1.268-14.094 3.541-4.242 9.851-4.81 14.094-1.268 8.736 7.293 26.788 12.006 45.99 12.006 18.743 0 37.043-4.802 46.621-12.232 4.366-3.388 10.65-2.594 14.04 1.773 3.388 4.366 2.594 10.652-1.773 14.04-13.262 10.29-35.277 16.433-58.887 16.433zM394.673 314.249c-24.337 0-46.325-6.227-58.817-16.658-4.243-3.541-4.81-9.853-1.268-14.094s9.853-4.81 14.094-1.268c8.736 7.293 26.788 12.006 45.99 12.006 18.743 0 37.043-4.802 46.621-12.232 4.365-3.388 10.652-2.594 14.04 1.773 3.388 4.366 2.594 10.652-1.773 14.04-13.263 10.29-35.277 16.433-58.887 16.433zM173.691 263.04c-3.719 0-7.18-.418-10.265-1.272-5.327-1.473-8.45-6.986-6.977-12.314 1.474-5.327 6.992-8.452 12.314-6.977 4.926 1.365 15.036.407 26.522-4.804 11.243-5.097 18.875-12.31 21.452-17.195 2.578-4.89 8.63-6.764 13.519-4.184 4.889 2.578 6.762 8.632 4.184 13.519-5.244 9.943-16.791 19.696-30.889 26.089-10.304 4.673-20.836 7.138-29.86 7.138zM439.49 263.04c-9.025 0-19.554-2.464-29.862-7.139-14.097-6.391-25.644-16.144-30.887-26.087-2.579-4.888-.705-10.941 4.184-13.519 4.889-2.582 10.941-.703 13.519 4.184 2.578 4.885 10.209 12.097 21.449 17.194 11.487 5.21 21.6 6.169 26.522 4.805 5.333-1.469 10.84 1.649 12.314 6.976 1.473 5.327-1.649 10.84-6.976 12.314-3.083.853-6.545 1.272-10.263 1.272z" />
			</G>
			<Path d="M355.562 20.084c-5.088-2.152-10.961.232-13.112 5.323s.232 10.963 5.323 13.112c87.606 37.015 144.214 122.382 144.214 217.48 0 130.124-105.862 235.985-235.984 235.985S20.015 386.122 20.015 255.999 125.878 20.015 256.001 20.015c5.528 0 10.007-4.479 10.007-10.007S261.529 0 256.001 0c-141.16 0-256 114.84-256 255.999 0 141.16 114.84 256.001 256 256.001C397.159 512 512 397.16 512 256c.001-103.161-61.406-195.764-156.438-235.916z" />
			<Path d="M248.456 397.222c-5.528 0-10.007 4.479-10.007 10.007s4.479 10.007 10.007 10.007h119.457c5.528 0 10.007-4.479 10.007-10.007s-4.479-10.007-10.007-10.007H248.456zM175.097 282.23c-4.244-3.544-10.553-2.974-14.094 1.268-3.543 4.243-2.974 10.553 1.268 14.094 12.492 10.43 34.48 16.658 58.817 16.658 23.609 0 45.624-6.143 58.889-16.432 4.367-3.388 5.161-9.674 1.773-14.04-3.389-4.369-9.674-5.16-14.04-1.773-9.579 7.429-27.879 12.232-46.621 12.232-19.204-.001-37.257-4.715-45.992-12.007zM335.857 297.592c12.492 10.43 34.48 16.658 58.817 16.658 23.609 0 45.624-6.143 58.889-16.432 4.367-3.388 5.161-9.674 1.773-14.04-3.388-4.369-9.675-5.16-14.04-1.773-9.579 7.429-27.879 12.232-46.621 12.232-19.202 0-37.254-4.713-45.99-12.006-4.243-3.544-10.552-2.974-14.094 1.268-3.545 4.24-2.977 10.552 1.266 14.093zM173.691 263.04c9.024 0 19.554-2.463 29.859-7.136 14.098-6.393 25.647-16.145 30.889-26.088 2.579-4.888.705-10.941-4.184-13.519-4.889-2.582-10.941-.705-13.519 4.184-2.578 4.885-10.209 12.097-21.452 17.194-11.486 5.21-21.595 6.17-26.521 4.804-5.323-1.468-10.84 1.649-12.314 6.976-1.473 5.325 1.648 10.84 6.976 12.314 3.085.852 6.547 1.271 10.266 1.271zM409.63 255.904c10.308 4.673 20.837 7.136 29.861 7.136 3.717 0 7.181-.418 10.266-1.273 5.325-1.474 8.448-6.988 6.973-12.314a10.002 10.002 0 00-12.314-6.973c-4.921 1.357-15.031.406-26.521-4.805-11.24-5.096-18.873-12.309-21.449-17.194-2.578-4.889-8.63-6.765-13.519-4.184-4.889 2.578-6.762 8.632-4.184 13.519 5.241 9.944 16.788 19.695 30.887 26.088z" />
			<Circle cx={319.102} cy={18.841} r={10.007} />
		</Svg>
	);
}

export default SadEmojiIcon;
