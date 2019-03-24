<template>
    <div class="main-header" :id="id" :data-attr="JSON.stringify(attrList)" :data-slots='JSON.stringify(slots)' data-component-active="component">
        <div class="left">  
            {{ leftText }}
            <slot name="left"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>   

<style lang="less">
    .main-header{
        width: 100%;
        min-height: 40px;
        // background: rgb(241, 158, 192);
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 1px 6px rgba(158, 169, 170, 0.5);
        line-height: 40px;
        padding:  10px 20px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { State, Action, Getter } from 'vuex-class';

    @Component
    class MainHeader extends Vue {
        @State('componentData') componentData!: any;
        @Prop({default: () => '导航栏'}) leftText!: '';
        @Prop({default: () => '右侧内容'}) rightText!: '';
        @Prop() id!: '';

        // 当前页面的属性
        attrList: any[] = [
            {
                astKey: 'props',  // 当前设置属性添加到组件的那个字段上
                attrKey: 'leftText',  // key   
                type: 'text',   // text, boolean, button,
                label: '左侧文案',  
                value: '这边是左侧的插槽',
            },
            {
                astKey: 'props',
                attrKey: 'rightText',
                type: 'text',
                label: '右侧文案',
                value: '这边是右侧的插槽',
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
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
        ];

        // 当前页面的slots;
        slots: string[] = ['left', 'right'];
 
    }

    export default MainHeader;
</script>

