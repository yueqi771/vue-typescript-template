<template>
    <div class="img-component" :id="id">
        这里是图片
        <img :src="src" alt="">
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    class ImgComponent extends Vue {
        @Prop({default: () => `https://picsum.photos/200/300?image=${Math.pow(parseInt(Math.random()*100), 1)}`}) src!: any;
        @Prop() id!: string;
    }

    export default ImgComponent;
</script>
