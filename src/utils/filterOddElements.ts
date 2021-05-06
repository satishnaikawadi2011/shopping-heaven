const filterArray = (arrToHaveOdd: any[], arr: any[]) => {
	const filtered = arrToHaveOdd.filter((el) => {
		return arr.indexOf(el) === -1;
	});
	return filtered;
};

// let array1 = [1,2,3,4,5,6,7,8,9],
//     array2 = [1,8,3],
//     array3 = [9,2,0];
// console.log(filterArray(array3, array1))

// Output
// [0]

export default filterArray;
