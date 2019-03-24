<template>
    <div class="tab-content" :id="id" :data-attr="JSON.stringify(attrList)" :data-slots='JSON.stringify(slots)' data-component-active="component">
        <el-tabs type="border-card">
            <el-tab-pane :label="item.label" v-for="item in tabDataComponent">
                <slot :name="item.label" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class TabContent extends Vue {
        @Prop({default: () => ''}) id!: string;
        @Prop({default: () => [{"label":"用户管理","text":"用户管理"},{"label":"配置管理","text":"配置管理"}]}) tabData!: any[];

        attrList: any[] = [
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'tabData',
                label: '绑定的数据',
                value: '[{"label":"用户管理","text":"用户管理"},{"label":"配置管理","text":"配置管理"}]',
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
        slots: string[] = [];

        tabDataComponent: any[] = []

        @Watch('tabData') updateSlots(): void {
            if(typeof(this.tabData) === 'string') {
                this.tabDataComponent = JSON.parse(this.tabData)
            }else{
                this.tabDataComponent = this.tabData;
            }
            this.tabDataComponent.forEach((item: any) => {
                this.slots.push(item.label);
            }) 
        }

        created(): void {
            
            this.updateSlots();
        }

    }

    export default TabContent;
</script>

<style lang="less" scoped>
    .tab-content{
        // width: 
        line-height: 0;
    }
</style>


