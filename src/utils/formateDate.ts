export default (date: Date) => {
	const arr = date.toDateString().split(' ');
	const myFormatedDate = `${arr[1]} ${arr[2]} , ${arr[3]}`;
	return myFormatedDate;
};
