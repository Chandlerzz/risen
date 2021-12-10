<template>
        <el-scrollbar class="sidebar-container" wrap-class="scrollbar-wrapper">
            <el-menu
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapsed"
                mode="vertical"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
            >
                <router-link to="/">
                    <el-menu-item class="submenu-title-noDropdown logo-item" index="0">
                        <img style="width: 23px;margin-right: 5px;" src="../../assets/logo.png" alt="">
                        <span>{{appName}}</span>
                    </el-menu-item>
                </router-link>
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
            </el-menu>
        </el-scrollbar>

</template>

<script>
    import { mapState } from 'vuex'
    import SidebarItem from './sidebarItem'

    export default {
        components: { SidebarItem },
        computed: {
            ...mapState([
                'sidebar',
            ]),
            isCollapsed() {
                return ! this.sidebar.opened
            },
            appName() {
                return process.env.VUE_APP_NAME
            },
            routes(){
                //const routes = this.$store.state.myRouter.routes.filter(item=>{
                  //  return !item.hidden&&item.children
                //});
                const routes = this.$router.options.routes[2].children
                console.log(routes)
                return routes
            }
        }
    }
</script>

<style lang="scss">

    @import '../variables.scss';
    .logo-item {
        background-color: $sidebar-logo-background !important;
        height: $navbar-height;
        line-height: $navbar-height;
        font-size: 18px;

        &:after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            bottom: 0;
            border-bottom: solid 1px #e6e6e6;
        }

        .svg-icon {
            color: red;
        }

        span {
            color: $sidebar-logo-color !important;
        }
    }

    .hideSidebar {
        .logo-item {
            font-size: 18px;
        }
    }

    // 侧边栏
    .sidebar-container {
        transition: width 0.28s;
        width: $sidebar-width !important;
        height: 100%;
        position: fixed !important;
        font-size: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        //reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }
        .el-scrollbar__bar.is-vertical {
            right: 0;
        }
        .scrollbar-wrapper {
            overflow-x: hidden !important;
            .el-scrollbar__view {
                height: 100%;
            }
        }
        .is-horizontal {
            display: none;
        }
        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }
        .svg-icon {
            margin-right: 16px;
        }
        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
        }
        .is-active > .el-submenu__title {
            color: #f4f4f5 !important;
        }
    }
    .hideSidebar {
        .sidebar-container {
            width: 36px !important;
        }
        .submenu-title-noDropdown {
            padding-left: 10px !important;
            position: relative;
            .el-tooltip {
                padding: 0 10px !important;
            }
        }
        .el-submenu {
            overflow: hidden;
            & > .el-submenu__title {
                padding-left: 10px !important;
                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }
        .el-menu--collapse {
            .el-submenu {
                & > .el-submenu__title {
                    & > span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                }
            }
        }
    }
    .sidebar-container .nest-menu .el-submenu > .el-submenu__title,
    .sidebar-container .el-submenu .el-menu-item {
        min-width: $sidebar-width !important;
        background-color: $subMenuBg !important;
        &:hover {
            background-color: $menuHover !important;
        }
    }
    .el-menu--collapse .el-menu .el-submenu {
        min-width: 180px !important;
    }



    .el-menu--vertical {
        & > .el-menu {
            .svg-icon {
                margin-right: 16px;
            }
        }
    }

</style>
