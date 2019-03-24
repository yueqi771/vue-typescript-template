<template>
    <div class="link-component" :id="id">
        这里是a链接
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    class HrefComponent extends Vue {
        @Prop() id!: string;
    }

    export default HrefComponent;
</script>
