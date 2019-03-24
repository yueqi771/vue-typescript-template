<template>
    <div class="select-component"  :id="id" :data-attr="JSON.stringify(attrList)" data-component-active="component">
        <p class="select-label">{{ label }}: </p>
        <el-select v-model="selectValue" placeholder="请选择" @change="changeHandle">
        <el-option
            v-for="item in selectOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import Methods from '@utils/methods.js';

    interface OptionList {
        value: string;
        label: string;
    }

    @Component
    class Select extends Vue {
        @Prop({default: () => [
            {
                id: '1',
                name: '黄金糕'
            }, 
            {
                id: '2',
                name: '双皮奶'
            }, 
            {
                id: '3',
                name: '蚵仔煎'
            }, 
            {
                id: '4',
                name: '龙须面'
            }, 
            {
                id: '5',
                name: '北京烤鸭'
            }
        ]}) options!: OptionList[]
        @Prop({default: () => ""}) id!: string;
        @Prop({default: () => '选项1'}) value!: string;
        @Prop({default: () => '描述'}) label!: string;
        @Prop({default: () => ''}) changeMethods!: string;

        attrList: any[] = [
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'tip',
                label: '获取select绑定的值',
                value: "",
            },
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'label',
                label: '描述',
                value: '描述',
            },
            {
                astKey: 'props', 
                attrKey: 'value',  
                type: 'text',   
                label: 'select选中的默认值',  
                value: '选项1',
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
                attrKey: 'changeMethods',
                type: 'eventHandle',
                label: '当输入框改变时触发的方法',
                value: '',
            },
            {
                astKey: 'class',
                type: 'text',
                attrKey: 'class',
                label: '添加样式',
                value: 'select-component',
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
        ];

        // 组件内绑定的数据
        selectValue: string = '';

        selectOptions: OptionList[];

        @Watch('value') updateValue(): void {
            this.selectValue = this.value;
        }

        @Watch('selectValue') updateSelectValue(): void {
            let bindData = vm._data.bindData ? vm._data.bindData : {};
            bindData[this.id] = this.selectValue;

            vm._data.bindData = bindData;
        }

        @Watch('options') updateOptions() {
            this.selectOptions = this.options;
        }

        @Watch('vm.apiData') test() {
            console.log(123)
        }


        changeHandle(id): any {
            if(this.changeMethods) {
                Methods[this.changeMethods].apply(this, arguments);
            }
        }

        mounted(): void {
             // 初始化默认选中的值
            let store = sessionStorage.getItem('bindData') ? JSON.parse(sessionStorage.getItem('bindData')) : {};
            this.selectValue = store[this.id] ? JSON.parse(store[this.id]) : '';
        }

        created():void {
            this.updateValue();
            this.updateSelectValue();
            this.updateOptions();

           
        }
    }

    export default Select;
</script>

<style lang="less" scoped>
    .select-component{
        display: flex;
        align-items: center;
        .select-label {
            min-width: 40px;
            margin-right: 10px;
            line-height: 44px;
        }
    }
</style>


