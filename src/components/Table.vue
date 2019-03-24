<template>
    <div class="table-wrapper" :id="id" :data-attr="JSON.stringify(attrList)" data-component-active="component">
        <el-table :data="tableData" stripe style="width: 100%" border>
            <el-table-column v-for="(thead, i) in tableThead" :key="i" :label="thead.label" :prop="thead.prop"></el-table-column>
            <el-table-column fixed="right" label="操作" v-if="tableOpt.length>0">
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-for="(item, i) in tableOpt" :key="i" @click="clickHandle(item.actionKey,scope.row)">{{item.text}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { State, Action, Getter } from 'vuex-class';
    import Methods from '@utils/methods.js';
    @Component
    export default class Table extends Vue {
        @Prop()
        id!: '';
        // 表格数据
        @Prop({default: () => [
            {
                title1: '一条数据',
                title2: '一条数据',
            },
            {
                title1: '两条数据',
                title2: '两条数据',
            }
        ],})
        tableData!: any[];
        // 选项
        @Prop({default: () => [
            {
                text: '选项文字',
                actionKey: '事件名称'
            },
            {
                text: '选项文字',
                actionKey: '事件名称'
            }
        ]})
        options!: any[];
        // 表头
        @Prop({default: () => [
            {
                label: '表头1',
                prop: 'title1',
            },
            {
                label: '表头2',
                prop: 'title2',
            },
        ]})
        theadList!: any[];
        // 模板
        theadListTpl = '[{"label": "表头1","prop": "title1"},{"label": "表头2","prop": "title2"}]'
        optionsTpl = '[{"text": "选项文字","actionKey": "defaultAc"},{"text": "选项文字","actionKey": "defaultAc"}]'

        // 当前页面的属性
        attrList: any[] = [
            {
                astKey: 'props',
                attrKey: 'theadList',
                type: 'text',
                label: 'table组件表头',
                value: this.theadListTpl,
            },
            {
                astKey: 'props',
                attrKey: 'options',
                type: 'text',
                label: 'table功能选项',
                value: this.optionsTpl,
            },
            {
                astKey: 'attrs',
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

        clickHandle(actionKey, data) {
            console.log('%c🎖', 'font-size:16px', actionKey, data)
            Methods[actionKey].call(this, data);
        }
        get tableOpt() {
            let opt = this.options
            if (typeof opt === 'string') {
                try {
                    opt = JSON.parse(opt)
                } catch {
                    console.log('%c🎖', 'font-size:16px', 11111)
                    return JSON.parse(this.optionsTpl)
                }
            }
            return opt
        }
        get tableThead() {
            let thead = this.theadList;
            if (typeof thead === 'string') {
                try {
                    thead = JSON.parse(thead)
                } catch {
                    console.log('%c🎖', 'font-size:16px', 22222)
                    return JSON.parse(this.theadListTpl)
                }
            }
            return thead
        }
    }

</script>

<style lang="less" scoped>
    .table-wrapper {
        padding: 20px;
    }
</style>