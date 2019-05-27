# Pythonic-JS
#### Python风格的Javascript实用工具
&nbsp;

#### range.js
> * range(stop) -> @@Iterator
> * range(start, stop[, step]) -> @@Iterator
###### *Python range风格的迭代器*
```javascript
// 传统的JS整数数列生成方法
var arr = new Array()
for (var i = 0; i < 5; i++) {
  arr.push(i)
}
arr  // [0, 1, 2, 3, 4]
Array(5).fill(null).map((currentVal, index) => index)  // [0, 1, 2, 3, 4]
Array.from({length: 5}).map((currentVal, index) => index)  // [0, 1, 2, 3, 4]

// 使用range(...args)返回一个JS迭代器对象
range(5)  // {next: ƒ, Symbol(Symbol.iterator): ƒ}

// 使用Array.from将迭代器转化为列表
Array.from(range(5))  // [0, 1, 2, 3, 4]

// 与Python range行为相似
Array.from(range(2, 5))  // [2, 3, 4]
Array.from(range(0, -2))  // []  /* 没有符合要求的结果时返回空数组 */
Array.from(range(2, -5, -1))  // [2, 1, 0, -1, -2, -3, -4]  /* 支持负数步长 */

//与Python对异常参数的处理不同，遵循JS的风格，采用默认行为代替抛出错误
Array.from(range(0, 2, 0))  // [0, 1, 2]  /* 步长为0时默认将步长设为1 */
Array.from(range(1.5, 5.5, 2.1))  // [1, 3]  /* 接受非整数参数时默认去除小数部分 */
Array.from(range('py', 5, null))  // [0, 1, 2, 3, 4]  /* 接受非数字参数会采用Number.parseInt转化参数 */
```
&nbsp;

#### list.js
> * list(@@Iterator) -> @@Proxy
###### *Python list风格的类数组*
```javascript
// JS原生数组的不良行为
var arr = new Array()
arr  // []
arr.length = 5
arr  // [empty × 5]
arr[0]  // undefined
arr[5]  // undefined
arr.py = true
arr  // [empty × 5, py: true]

// 使用list(@@Iterator)将可迭代对象转化为JS类数组代理对象(列表)
list('hello') // Proxy {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}  /* 将字符串转化为列表 */
list(range(5))  // Proxy {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}  /* 与range结合使用 */
list(42)  // Proxy {}  /* 参数不可迭代或为空时返回空列表 */

// 与Python list行为相似
var li = list(arr)  // Proxy {0: undefined, 1: undefined, 2: undefined, 3: undefined, 4: undefined}  /* 初始化时空元素自动填充为undefined */
li[0]  // undefined
li[5]  // Uncaught RangeError: Index out of range  /* 访问超出范围的索引时抛出错误 */
li[2] = 2 
li  // Proxy {0: undefined, 1: undefined, 2: 2, 3: undefined, 4: undefined}
li[-1] = 'py'
li  // Proxy {0: undefined, 1: undefined, 2: 2, 3: undefined, 4: "py"}  /* 支持负数索引 */
li[7] = 7 //  Proxy {0: undefined, 1: undefined, 2: 2, 3: undefined, 4: "py", 5: undefined, 6: undefined, 7: 7} /* 设定超出范围的索引时空余项自动填充为undefined */
li.py  // Uncaught ReferenceError: Invalid index  /* 整数索引外的额外属性初始化时被移除 */
li.msg = 'hello'  // Uncaught SyntaxError: Cannot set props of lists  /* 无法设定索引外的额外属性 */
li.length = 10  // Uncaught SyntaxError: Cannot set props of lists  /* 无法直接设定列表长度 */

// 可以使用Array.prototype的所有方法
li.slice(5)  // [5, 6, 7]  /* 无副作用的方法会返回一个新的JS数组 */
li = list(li.slice(0, 5))  // Proxy {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}  /* 采用list将结果重新包装为列表 */
li = list(li.map(item => 42))  // Proxy {0: 42, 1: 42, 2: 42, 3: 42, 4: 42}
li.pop()
li  // Proxy {0: 42, 1: 42, 2: 42, 3: 42}  /* 含副作用的方法会返回修改后的列表自身 */
Array.from(li.values())  // [42, 42, 42, 42]  /* 使用JS数组的迭代方法对列表进行迭代 */
li.includes(42)  // true  /* 使用includes判断元素是否存在 */
```
