<template>
    <div class="div-component"  :id="id">
        这里是div
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class DivComponent extends Vue {
        @Prop() id!: '';
    }

    export default DivComponent;
</script>

<style lang="less">
    .div-component{
        width: 100%;
        height: 80px;
        border: 1px solid #333;
        line-height: 80px;
    }
</style>

