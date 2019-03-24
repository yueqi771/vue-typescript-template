import Widgets from './widgets'
import { AstData, NodeData, ParamData } from '@interface/parseTypes.d.ts';
import defaultData from './data/defaultData'
import Methods from '../methods.js'
import router from '../../router'

class Parse extends Widgets{
    // 转化后vue能识别的ast树结构
    public componentArray: Vue.Component[] = [];

    // ast树数据
    public ast: AstData[] = [];

    // ast树数据缓存
    protected astCache: AstData[] = [];

    // 组件树数据
	public node: NodeData[] = [];

	// 当前处理组件的父组件
	public parentNode: any = null;

	// 缓存渲染方法
    public component: any = null;

    constructor(ast: AstData[], targetRouter?: string) {
        super();

        this.initRouter(ast, router, targetRouter);
	}

	/**
     * @func   将ast树中的路由注入到项目中
     * @param  ast: asta组件树json
	 * @param  targetRoute: 需要插入的路由位置, 如果为空，那么插入到根路由下面 如 ‘/preveiw‘
     */
	initRouter(ast: AstData[], router: any, targetRoute?: string): void {
		const $router = router;
		const totalRouter = $router.options.routes;
		// 缓存当前已经存在的路由路经，
		let routerArray: string[] = [],
			routerLevel: any = [];

		// 如果不存在路由位置， 那么插入到根路由下
		if(targetRoute) {
			totalRouter.forEach((item: any, index: number) => {
				if(item.path === `/${targetRoute}`) {
					routerLevel = item.children;
				}
			});

			routerLevel.forEach((item: any, index: number) => {
				routerArray.push(item.path);
			})
		}

		if(!targetRoute) {
			totalRouter.forEach((item: any, index: number) => {
				routerArray.push(item.path);
			})

			routerLevel = totalRouter;
		}

		const parentRoute = targetRoute ? `/${targetRoute}` : '';
		// 遍历ast树， 如果路由树中不存在这个路由， 那么插入
		ast.forEach((item: AstData, index: number) => {
			if(item.path && routerArray.indexOf(`${parentRoute}${item.path}`) === -1) {
				const currentAstRoute = {
					path: `${parentRoute}${item.path}`,
					name: item.page,
					component: () => import('@views/Preview.vue')
				}

				routerLevel.push(currentAstRoute);
				$router.addRoutes(routerLevel);
				// 将已经添加的path进行缓存，防止同名的path添加
                routerArray.push(item.path);
			}
		})
	}

	/**
     * @func   初始化页面，调用渲染函数，重新渲染页面
     * @param  ast: asta组件树json
     */
	initPage(ast: AstData[]): void {
		// 复制ast数据
        this.ast = this.deepClone(ast);
		this.astCache = ast;

		// 获取当前页面的路由
		const windowHref = window.location.href;
        const domain = window.location.host;
        const currentRoute = windowHref.split(`${window.location.protocol}//${domain}`)[1];
        const vmData = window.vm.$children[0]._data

		// 仅保留跟当前页面路由匹配的ast数据
		let i = this.astCache.length;
        while (i--) {
            if (currentRoute.indexOf(this.ast[i].path) === -1) {
                this.ast.splice(i, 1);
            }
		};

		this.ast = this.ast.length === 0 ? this.astCache : this.ast;
		this.node = this.ast[0].node;

		// 执行转化ast树方法
		this.initDirective(this.node);
        this.codegen(this.node);
        vmData.time = new Date().getTime();
        this.component = this.render();
    }
    
    /**
     * @func   初始化页面，调用渲染函数，重新渲染页面
     * @param  ast: asta组件树json
     */
    initApiData(ast: AstData) {
        const _this = this;
        const dataInterface = ast.dataInterface || null;
        const params = dataInterface ? this.formatParams(dataInterface.params) : {};

        if (ast && ast.page && ast.dataInterface) {
            (window as any).$http[dataInterface.type]({
                url: dataInterface.url,
                params,
            }).then((res: any) => {
                if(res.code === 10000) {
                    window.vm._data.apiData = {};
                    let apiData = res.data;

                    // 如果返回值是一个对象，那么向根实例的对象上进行合并
                    if(this.TypeContent.isArray(res.data)) {
                        apiData = {
                            list: res.data
                        } 
                    }

                    Object.assign(window.vm._data.apiData, apiData);

                    
		            this.ast[0].node[0].text = res.data[0].name; 

                    // 刷新页面
                    this.initPage(this.ast)
                }
            }).catch(() => {
                // alert('网络异常');
            });
        }else {
            console.log('缺少必要的参数')
        }

    }

	/**
     * @func 转化方法参数
     * @param data
     * @return 处理后的参数
     */
    formatParams(data: ParamData[]): any {
        const result: any = {};

        data.forEach((item: ParamData, index: number) => {
            switch(item.type) {
                case "function":
                    result[item.key] = eval(item.value);
                    break;
                case "string":
                    result[item.key] = item.value;
					break;
                default:
                    return result;
            }
        });

        return result;
	}

	/**
     * @func 处理组件中的自定义指令
     * @param ast
     */
    initDirective(node: NodeData[]): void {
        node.forEach((item: any, index: number) => {
            if(item.directiveList && item.directiveList.length > 0) {

                // debugger;
                let children: any[] = [];
                item.directiveList.forEach((directiveItem: any, directiveIndex: number) => {
                    if(directiveItem.type === 'for') {
                        let data = directiveItem.data ? eval(directiveItem.data) : [];

                        children = [];

                        if(!(data && data.length > 0)) { return }

                        // 将绑定的数据进行遍历， 并且将每一项的数据附加到遍历出来的每一个item上
                        this.parentNode && (data.forEach((dataItem: any, dataIndex: number) => {
                            let itemBack = this.deepClone(item),
                                itemChildBack = this.deepClone(item.children);

                            // children.push(itemBack);
                            children.splice(dataIndex, 0, itemBack);

                            children[dataIndex].itemData = dataItem;
                            children[dataIndex].id = this.guid();
                            //
                        }))

                    }
                })

                // 同步当前的id
                children.forEach((childrenItem:any, childrenIndex: number) => {
                    if(!childrenItem.children) {
                        return
                    }
                    childrenItem.children.forEach((childrenEtem: any, childrenIndex: number) => {
                        childrenEtem.parentId = childrenItem.id;
                    })
                })

                // 不传染当前的组件
                if(children.length > 0) {
                    this.parentNode.children.splice(index, 1);
                }

                this.parentNode.children = this.parentNode.children.concat(children);

            }

            // 如果当前项存在一个children， 那么递归的执行这个方法
            if (item.children && item.children.length > 0) {
				this.parentNode = item;
                this.initDirective(item.children);
                return;
            }
        })
    }

	/**
     * @func   优化ast树方法，将json中的方法和组件转化中转化成可执行的方法
     * @param  ast数
     * @return 优化后的ast树
     */
	codegen(node: NodeData[]): void {
		const reg = /(\/)|(\@)|(\.)/g;
		const defaultDataBack = this.deepClone(defaultData);

		node.forEach((item: any, index: number) => {
			const currentTag = item.tag;
			let eventObject;

			// 初始化组件attrList；
			Object.assign(defaultDataBack, item.attrList);
			item.attrList = defaultDataBack;

			/* 注： 此处有坑： 例如import(foo)，这样完全动态的加载方式将会失败，因为webpack需要一些文件位置信息。*/
            /* 因为变量foo可能是系统或项目中任何文件的路径。import()必须至少包含关于模块所在位置的一些信息，因此让捆绑可以局限于特定的目录或文件夹。*/
            if (this.TypeContent.isString(currentTag) && reg.test(currentTag)) {
                // 问题， 如果没有复制这个变量， 那么会导致后面的无法复制成功
                const result = reg.test(currentTag);
                item.tag = () => import(`@components/${currentTag}`);

                // 如果是一个组件， 那么id作为props传入
                item.attrList.attrs.id = item.attrList.props.id = item.id;
            } else {
                item.attrList.attrs.id = item.id;
            }

			// 如果存在eventList字段， 那么解析将相应的事件绑定到当前组件上
            if(item.eventList && item.eventList.length > 0) {
                item.eventList.forEach((etem: any) => {
                    // 如果参数存在， 那么绑定参数
                    let params = etem.params ? this.formatParams(etem.params) : {};
                    eventObject[etem.type] = Methods[etem.handle].bind(window.vm, params);
                });

                // 将事件绑定到当前组件上
                Object.assign(item.attrList.nativeOn, eventObject);
			}

			// 当前的组件绑定的数据
			if (item.dataInfo && item.dataInfo.length > 0) {
                const nativeAttr = ['src', 'width'];
                const component = [];

                item.dataInfo.forEach((dataItem: any, dataIndex: number) => {
                    // 验证数据是否存在
                    if(dataItem.type === 'vm') {
                        if(!window.vm._data.apiData || !window.vm._data.apiData[dataItem.key]) {
                            console.log(`${item.tag}需要绑定的数据不存在！`);
                            return;
                        }

                        if(dataItem.to === 'text') {
                            item[dataItem.to] = (window as any).vm._data.apiData[dataItem.key];
                            return;
                        }

                        if(nativeAttr.indexOf(dataItem.to) > -1) {
                            item.attrList.attrs[dataItem.to] = window.vm._data.apiData[dataItem.key];
                        }else{
                            item.attrList.props[dataItem.to] = window.vm._data.apiData[dataItem.key];
                        }

                        return;
                    }

                    if(dataItem.type === 'item') {
                        if(!(this.parentNode.itemData && this.parentNode.itemData[dataItem.key])) {
                            console.log(`${item.tag}需要绑定的数据不存在！`);
                            return;
                        }

                        if(dataItem.to === 'text') {
                            item[dataItem.to] = this.parentNode.itemData[dataItem.key];
                            return;
                        }

                        if(nativeAttr.indexOf(dataItem.to) > -1) {
                            item.attrList.attrs[dataItem.to] = this.parentNode.itemData[dataItem.key];
                        }else{
                            item.attrList.props[dataItem.to] = this.parentNode.itemData[dataItem.key];
                        }

                        return
                    }

                })
            }

			// 如果当前项存在一个children， 那么递归的执行这个方法
            if (item.children && item.children.length > 0) {
				// 设置下一次处理的父组件为当前的组件
				this.parentNode = item;
                this.codegen(item.children);
                return;
            }

        })
        

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
     * @func   组件创建完成之后执行的函数钩子
     * @params 组件的生命周期
     */
    callHook(lifecircle: string): void {
        // 组件创建完成， 执行create方法
        if(lifecircle === 'created') {
            // 请求页面的数据
            this.initApiData(this.ast[0]);
        }
    }

    /**
     * @func 将ast树转化为vue对象
     * @return vue对象实例
     */
    render(): any {
        const _this = this;
        /* eslint-disable */
        return {
            data() {
                return {
                    currentRoute: '',
                    update: 0,
                }
            },
            watch: {
                $route() {
                    /* tslint-disable */
                    this.currentRoute = this.$route.params.path; 
                    _this.initPage(this.currentRoute);
                },
                update() {
                    console.log('重新刷新页面')
                    this.$forceUpdate()
                }

            },
            render: (createElement: Vue.CreateElement, context: any) => {
                return createElement('div', {},
                    [
                       this.optimize(this.node, createElement),
                    ],
                );
            },

            created() {
                // 组件创建完成之后发送ajax
                _this.callHook('created');
            }
        }
    }

}

export default Parse;
