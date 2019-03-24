<template>
    <div class="input-wrapper" :id="id" :data-attr="JSON.stringify(attrList)"  data-component-active="component">
        <div class="label">{{ label }}：</div>

        <div class="input">
            <el-input 
                :placeholder="placeholder" 
                :size="size" 
                v-model="value" 
                :disabled="disabled"
                :ref="`${id}input`"
                />
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class InputComponent extends Vue {
        @Prop({default: () => '描述'}) label!: string;
        @Prop({default: () => false}) disabled!: boolean;
        @Prop({default: () => 'small'}) size!: string;
        @Prop({default: () => '请输入内容'}) placeholder!: string;
        @Prop() valueProp!: string;
        @Prop() id!: string;
        
        // 输入框输入的内容
        value: string = "";

        // 当前页面需要配置的属性
        attrList: any[] = [
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'tip',
                label: '获取input输入的value值',
                value: "",
            },
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'size',
                label: 'medium / small / mini',
                value: "medium",
            },
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'valueProp',
                label: '输入框默认内容',
                value: '',
            },
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'label',
                label: '描述',
                value: '描述',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'width',
                label: '宽度',
                value: '500px',
            },
            {
                astKey: 'style',
                type: 'text',
                attrKey: 'height',
                label: '高度',
                value: '50px',
            },
            {
                astKey: 'props',
                type: 'boolean',
                attrKey: 'disabled',
                label: '是否只读',
                value: false,
            },
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'placeholder',
                label: '默认提示内容',
                value: '请输入内容',
            },
            {
                astKey: 'props',
                type: 'text',
                attrKey: 'width',
                label: '宽度',
                value: '500px',
            },
            {
                astKey: 'props',
                attrKey: 'delete',
                type: 'button',
                label: '删除组件',
                value: '',
            },
        ];

        @Watch('valueProp') updateValue(): void{
            if(!this.valueProp) { return };
            this.value = this.valueProp;
        }

        @Watch('value') updateInputValue(): void {
            (window as any).vm._data[`${this.id}input`] = this.value;
        }

        mounted() {
            this.updateValue();

            Object.keys(this.$refs).forEach((item: any) => {
                (window as any).vm.$refs[item] = this.$refs[item]
            })

        }
    }

    export default InputComponent;
</script>

<style lang="less" scoped>
    .input-wrapper{
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .label{
            min-width: 80px;
        }

    }
</style>
