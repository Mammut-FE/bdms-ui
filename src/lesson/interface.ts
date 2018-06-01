// 定义普通的对象
interface IStudent {
  name: string;
  age: number;
}

// 对象修饰符
interface IUser {
  email: string;
  name?: string;
  readonly id: number;
}

// 定义函数
interface IFun {
  (source: string, subString: string): boolean;
}

type IFun1 = (source: string, subString: string) => boolean;

let foo: IFun = (source, subString) => {
  return false;
};

let foo1: IFun1 = (source, subString) => {
  return false;
};

// 索引类型
interface IStringArray {
  [index: number]: string;
}

interface IObject {
  [key: string]: any;
}

// 对象接口
interface IGetUser {
  getUser: () => void;
}

class Class implements IGetUser {
  public getUser() {

  }
}

// 扩展接口
interface IBase {
  email: string;
  product: string;
}

interface Inf extends IBase {
  clusterid: string;
}
