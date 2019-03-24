<template>
    <div class="card-component" :id="id" :style="{'width': width}"  :data-attr="JSON.stringify(attrList)" :data-slots='JSON.stringify(slots)' data-component-active="component">
        <el-card class="box-card" shadow='hover'>
            <div class="top">
                <slot name="top">这里是卡片组件</slot>
            </div>
            <div class="bottom">
                <slot name="bottom" />
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class CardComponent extends Vue {
        @Prop({default: () => '100%'}) width: string; 
        @Prop({default: () => '这里是卡片组件'}) text: string; 
        @Prop() id!: string;

        // 当前页面的属性
        attrList: any[] = [
            {
                astKey: 'props',
                attrKey: 'width',
                type: 'text',
                label: '宽度',
                value: '100%',
            },
            {
                astKey: 'props',
                attrKey: 'text',
                type: 'text',
                label: '这里是默认文字',
                value: '这里是card组件',
            },
            {
                astKey: 'class',
                type: 'text',
                attrKey: 'class',
                label: '添加样式',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'directive',
                type: 'button',
                label: '添加指令',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'bindData',
                type: 'button',
                label: '添加绑定数据',
                value: '',
            },
            {
                astKey: 'props',
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
        ];

        // 当前页面的slots;
        slots: string[] = ['top', 'bottom'];
    }

    export default CardComponent;
</script>

<style lang="less" scoped>
    .card-component{
        display: block;

        .box-card{
            min-width: 100%;
            min-height: 100%;
            box-shadow: 0px 1px 6px rgba(158, 169, 170, 0.5);
        }
    }
</style>
