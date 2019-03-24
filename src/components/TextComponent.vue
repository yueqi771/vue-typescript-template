<template>
    <div class="text-component" :id="id" >
        这里是text文字标签
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    class TextComponent extends Vue {
        @Prop() id!: string;
    }

    export default TextComponent
</script>
