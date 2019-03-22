import Widgets from './widgets'
import { AstData, NodeData, ParamData } from '@interface/parseTypes.d.ts';

class Parse extends Widgets{
    // 转化后vue能识别的ast树结构
    public componentArray: Vue.Component[] = [];

    // ast树数据
    public ast: AstData[] = [];

    // ast树数据缓存
    protected astCache: AstData[] = [];

    // 组件树数据
    public node: NodeData[] = [];

    constructor(ast: AstData[]) {
        super();

        // 复制ast数据
        this.ast = this.deepClone(ast);
        this.astCache = ast;

    }

    /**
     * @func   数据转化方法
     * @param  node 需要转化的组件树
     * @param  createElement 生成页面方法
     * @return 具有层级关系的数组
     */
    optimize(node: NodeData[], createElement: Vue.CreateElement): any {
        return node.map((item: any) => {
            const text: string = item.text ? item.text : '';
            // 如果存在嵌套关系, 递归执行此方法
            if (item.children && item.children.length > 0) {
                return createElement(item.tag, item.attrList, [
                    text,
                    ...(this.optimize(item.children, createElement)),
                ]);
            } else { 
                // 如果只有一层接口， 不存在嵌套的话， 直接return
                return createElement(item.tag, item.attrList, [text]);
            }
        });
    }

    /**
     * @func 将ast树转化为vue对象
     * @return vue对象实例
     */
    render(): any {
        const nodeData = this.deepClone(this.node);

        /* eslint-disable */
        return {
            render: (createElement: Vue.CreateElement, context: any) => {
                return createElement('div', {},
                    [
                       this.optimize(nodeData, createElement),
                    ],
                );
            },
        }
    }

}

export default Parse;
