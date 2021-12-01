<template>
    <div :class="classObj" class="layout-panel">
        <sidebar />
        <div class="layout-pane">
            <navbar/>
            <app-main/>
        </div>
    </div>
</template>

<script>
    import AppMain from './appMain'
    import Navbar from './navbar'
    import Sidebar from './sidebar'


    export default {
        name: 'MainLayout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        computed: {
            sidebar() {
                return this.$store.state
            },
            classObj() {
                return {
                    hideSidebar: ! this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                }
            }
        },
        methods: {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import './variables.scss';
    .layout-panel {
        position: relative;
        height: 100%;
        width: 100%;

    }

    .openSidebar {

        // 主体区域
        .layout-pane {
            min-height: 100%;
            transition: margin-left .28s;
            margin-left: $sidebar-width;
            position: relative;
        }

    }

    .hideSidebar {

        .layout-pane {
            margin-left: 36px;
        }
    }

</style>

