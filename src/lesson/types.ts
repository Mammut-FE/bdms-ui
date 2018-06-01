// 基础类型
let isDone: boolean = false;

let decimal: number = 6;

let color: string = 'blue';

// 组合类型
let list: number[] = [1, 2, 3];

// Tuple
let x: [string, number];
x = ['hello', 10]; // OK

// Enum
enum Color {Red, Green, Blue}

let c: Color = Color.Green;

enum Color1 {Red = 1, Green = 2, Blue = 4}

let c1: Color1 = Color1.Green;

// Null, Undefined
