<template>
    <div>这里是preview页面</div>
</template>

<script>
    import Parse from '@utils/parse/core'
    export default {
        mounted() {

            let a = '{"page":"page","path":"/page","currentComponent":{},"components":[{"page":"page","path":"/page","node":[{"tag":"div","text":"测试","attrs":[{"astKey":"style","type":"text","attrKey":"width","label":"宽(加单位)","value":"820px"},{"astKey":"style","type":"text","attrKey":"height","label":"高(加单位)","value":"600px"},{"astKey":"style","type":"text","attrKey":"border","label":"边框(加单位)","value":"1px solid #ccc"},{"astKey":"class","type":"text","attrKey":"class","label":"添加样式","value":""},{"astKey":"text","type":"text","attrKey":"text","label":"文字","value":"这里是div"},{"astKey":"style","type":"text","attrKey":"background","label":"背景色","value":"#00"},{"astKey":"props","attrKey":"bindData","type":"button","label":"添加绑定数据","value":""},{"astKey":"props","attrKey":"delete","type":"button","label":"删除组件","value":""}],"attrList":{"class":{"class":""},"style":{"width":"820px","height":"600px","border":"1px solid #ccc","line-height":"80px","background":"#00"},"attrs":{"data-component-active":""},"props":{"bindData":"","delete":""},"domProps":{},"on":{},"nativeOn":{},"directives":[{}],"scopedSlots":{}},"id":"d89a3e58-7927"}]}]}';
            console.log(JSON.parse(a));
            console.log(new Parse(JSON.parse(a)))
        }
    }
</script>
