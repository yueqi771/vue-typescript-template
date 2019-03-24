<template>
    <div class="drop-down" :id="id" :data-attr="JSON.stringify(attrList)" :data-slots='JSON.stringify(slots)' data-component-active="component">
        <!-- 这里是dropDown组件 -->
        <el-dropdown trigger="click" :hide-on-click="false">
            <span class="el-dropdown-link">
                <slot name="dropDownBtn">dropDown触发按钮</slot>
            </span>
            <el-dropdown-menu slot="dropdown">
                <slot name="dropDownItem">dropDown下拉菜单</slot>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class DropDown extends Vue {
        @Prop({default: () => ''}) id!: string;  


        attrList: any[] = [
            {
                astKey: 'class',
                type: 'text',
                attrKey: 'class',
                label: '添加样式',
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
        ]

        slots: string[] = ["dropDownItem", "dropDownBtn"];
    }

    export default DropDown;
</script>

<style lang="less" scoped>
    .drop-down{
        border: 1px solid #ddd;
    }
</style>

