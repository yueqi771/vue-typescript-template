<template>
    <div class="drop-down-item" :id="id"  :data-attr="JSON.stringify(attrList)" data-component-active="component">
        <el-dropdown-item>{{ text }}</el-dropdown-item>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class DropDownItem extends Vue {
        @Prop({default: () => ''}) id!: string;
        @Prop({default: () => '这里是下拉项'}) text!: string;

        attrList: any[] = [
            {
                astKey: 'props',
                attrKey: 'text',
                type: 'text',
                label: '文字',
                value: '这里是下拉项',
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

    export default DropDownItem;
</script>

