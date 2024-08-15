//1.数组常用的方法
let arr = [1, 3, 2, 7, 65, 99, 33];
let newArr1 = arr.filter((value, key, arr) => {
  return value > 20;
});
[65, 99, 33];
let newArr2 = arr.map((value, key, arr) => {
  return value * 10;
}); //[10, 30, 20, 70, 650, 990, 330]
let newArr3 = arr.some((value, key, arr) => value > 100); //false
let newArr4 = arr.toString(); //1,3,2,7,65,99,33
let newArr5 = arr.join(","); // 1,3,2,7,65,99,33
let newArr6 = arr.reverse(); // [33, 99, 65, 7, 2, 3, 1]
let newArr7 = arr.reduce((preValue, lastValue) => {
  return preValue + lastValue;
}); //210
// splice 和 slice 都是返回被截取出来的元素，但是splice可以修改原数组
// @ts-ignore 在选中元素的左边加入值, [1, 3, 2, 7, 65, 99, 33];在3的左边加入123,321
let newArr8 = arr.splice(1, 0, "123", "321"); //(开始的下表，清除的个数，插入的数据,插入的输入,插入的输入)
let newArr9 = arr.slice(1, 3); //（开始的下表，结束的下表】 取右删
let newArr10 = arr.indexOf(3); //数组中是否含有该元素 有则返回下标 无责-1
let newArr11 = arr.find((value) => {
  return value > 2;
}); //数查找符合条件的值后返回这个值 无返回underfined 只查第一个
let newArr12 = arr.findIndex((value) => {
  return value > 2;
}); //数查找符合条件的值后返回这个值的下标 无返回-1 只查第一个
let newArr = arr.includes(0); //true/false
console.log(newArr);

//  2.对象常用的方法
let obj = {
  name: "猪猪侠",
  age: 18,
};
let obj1 = {
  name: "菲菲公主",
  sex: "男",
};
console.log(Object.assign(obj, obj1)); //（target，origin）将原对象的熟悉拷贝到目标对象上 无则添加 有则覆盖
console.log(obj.hasOwnProperty("name")); //返回true/false
console.log(Object.keys(obj)); //['name', 'age']
//   3. 字符串方法
let str = "0123456789hello";
console.log(str.toLocaleLowerCase());
console.log(str.toLocaleUpperCase());
console.log(str[4].toLocaleLowerCase());
console.log(str.indexOf("l", 2)); //(需要查找的字符串，开始的位置--可选)
console.log(str.lastIndexOf("l", 5)); //(需要查找的字符串，开始的位置--可选)
console.log(str.search("2")); //可以接受正则

// 都不会改变原字符串，返回一个新的字符串
// slice substring  第二个参数都是索引，substr 第二个参数是个数
let str2 = str.slice(0, 2); //(开始的位置，结束的位置) 一个变量就是从第一个参数到结束
console.log(str.slice(-6, -4));
// 第一个参数如果大于第二个参数，则会将参数位置互换，如果有复数 会变成0,(3,1) ->>(1,3) | (5,-3)  ->>(0,5),
console.log(str.substring(3, 9)); //开始-结束（可省）
console.log(str.substr(3, 9)); //开始-个数

console.log(str.replace("1", "2")); //将1 替换成2 可接受正则
console.log(str.concat("123", " ", "123321")); //拼接
console.log(str.trim());
