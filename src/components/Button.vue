<template>
    <span class="button-wrapper" :data-attr="JSON.stringify(attrList)" data-component-active>
        <el-button :size="size" >{{ text }}</el-button>
    </span>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class Button extends Vue {
        @Prop({default: () => 'medium'}) size!: string;
        @Prop({default: () => false}) loading!: boolean;
        @Prop({default: () => false}) disabled!: boolean;
        @Prop({default: () => '按钮'}) text!: string;

         // 当前页面的属性
        attrList: any[] = [
            {
                astKey: 'props',
                attrKey: 'size',
                type: 'text',
                label: '大小(medium / small / mini)',
                value: 'medium',
            },
            {
                astKey: 'props',
                attrKey: 'text',
                type: 'text',
                label: '文字',
                value: '按钮',
            },
            {
                astKey: 'props',
                attrKey: 'addEvent',
                type: 'button',
                label: '添加事件',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
        ]
    }

    export default Button;
</script>

<style lang="less">
    .button-wrapper{
        float: left;
        margin-left: 20px;
    }
</style>

