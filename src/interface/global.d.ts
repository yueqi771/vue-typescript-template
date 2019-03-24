/**
 * @interface 声明所有的静态库
 */
declare namespace store {
  //~ We can write 'myLib.timeout = 50;'
  let get: any;
  let set: any;
  let remove: any;
}

declare var window: Window;
interface Window {
  vm: any,
  session: any,
  $parse: any;
}
