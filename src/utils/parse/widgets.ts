class Widgets {
    // 类型存储数组， 会初始化到类型验证函数中
    public typeArray: string[] = ['String', 'Array', 'Number', 'Object'];

    // 类型验证存储对象
    public TypeContent: any = {};


    constructor() {
        // 初始化化类型验证函数
        this.initTypeVerifiy(this.typeArray);
    }

    /**
     * @func 初始化验证类型函数
     * @params TypeArray: 支持的类型数组 
     */
    initTypeVerifiy(typeArray: string[]): void {

        for (let i = 0, type; type = typeArray[i++];) {
            ((injectType) => {
                this.TypeContent['is' + injectType] = (variable: any) => {
                    return Object.prototype.toString.call(variable) === `[object ${injectType}]`;
                };
            })(type);
        }
    }


    /**
     * @func   工具方法：克隆一个对象
     * @param  obj: 需要复制的对象
     * @return 新的对象
     */
    deepClone(object: any): any {
        const newObject: any = object instanceof Array ? [] : {};
        //object属于基本数据类型,直接返回object
        if(typeof object !== 'object') {
            return object;
        } else {
            //object属于数组或对象，遍历它们
            for(var i in object) {
                newObject[i] = typeof object[i] === 'object' ? this.deepClone(object[i]) : object[i]; 
            }
        }
        return newObject;
    }

    /**
     * @func   工具方法：生成一个随机的id
     * @return 一个随机的字符串id
     */
    guid (): string { 
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4()
    }


}

export default Widgets
