<template>
    <div class="slide-header" :id="id" :data-attr="JSON.stringify(attrList)" data-component-active="component">
        <img class="logo" src="../static/images/logo.png">

        <el-menu
            :default-active="'/overview/version/1'"
            :router="true"
            :unique-opened="true"
            >
            <span v-for="(item, index) in navigatorData"  :key="index">
                <el-submenu v-if="item.hasSub" :index="item.router" >
                    <template slot="title">
                        <i class="el-icon-menu" v-if="index == 0"></i>
                        <i class="el-icon-tickets" v-else></i>

                        <span>{{ item.text }}</span>
                    </template>

                    <el-menu-item-group v-if="item.hasSub" v-for="etem in item.submenu" :key="etem.link">
                        <el-menu-item :index="etem.link">{{ etem.name }}</el-menu-item>
                    </el-menu-item-group>

                    <el-menu-item v-else></el-menu-item>
                </el-submenu>

                <el-menu-item v-if="!item.hasSub" :index="item.router" >
                    <i class="el-icon-menu" v-if="index == 0"></i>
                    <i class="el-icon-tickets" v-else></i>
                    <span>{{ item.text }}</span>
                </el-menu-item>
            </span>
        </el-menu>
    </div>  
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    class SlideHeader extends Vue {
        @Prop({default: () => [
            {
                text: '课程包',
                router: '/overview/package',
                hasSub: false,
            },
            {
                text: '模版管理',
                router: '',
                hasSub: true,
                submenu: [
                    {
                        name: '游戏模版',
                        link: '/overview/template/1',
                    },
                    {
                        name: '阅读模版',
                        link: '/overview/template/2',
                    },
                    {
                        name: '环节模版',
                        link: '/overview/template/3',
                    },
                    {
                        name: '大地图模版',
                        link: '/overview/template/4',
                    },
                ]
            }
        ]}) navigatorData!: any[];

        @Prop({default: () => ''}) id!: string;

        // 默认可以配置的属性
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
    }

    export default SlideHeader;
</script>

<style lang="less">
    .slide-header {
        width: 200px;
        min-height: 300px;
        background: #fff;
        position: relative;
        z-index: 15;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);

        .slide-header-wrapper{
            position: relative;
            height: 100%;
            padding-bottom: 150px;
        }

        .logo{
            width: 160px;
            position: relative;
            top: -20px;
        }
    }
</style>
