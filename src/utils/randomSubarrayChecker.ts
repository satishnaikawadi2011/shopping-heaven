const checker = (arr: any[], subArr: any[]) => subArr.every((v) => arr.includes(v));

export default checker;

// let array1 = [1,2,3,4,5,6,7,8,9],
//     array2 = [1,8,3],
//     array3 = [9,2,0];

//     console.log(checker(array1, array2));
// console.log(checker(array1, array3));

// Output
// true
// false
