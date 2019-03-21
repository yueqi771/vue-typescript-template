const defaultData: any = {
  // 和`v-bind:class`一样的 API
  // 接收一个字符串、对象或字符串和对象组成的数组
  'class': {

  },
  // 和`v-bind:style`一样的 API
  // 接收一个字符串、对象或对象组成的数组
  style: {

  },
  // 普通的 HTML 特性
  attrs: {
      src: ''
  },
  // 组件 props
  props: {
  },
  // DOM 属性
  domProps: {
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
      {
      }
  ],
  // 作用域插槽格式
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
      // default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  // slot: 'name-of-slot',
  // 其他特殊顶层属性
}

export default defaultData
