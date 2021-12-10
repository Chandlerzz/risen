<template>
    <nav>
        <NavItem hover>
            <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        </NavItem>
        <NavItem>
            <breadcrumb/>
        </NavItem>
        <NavItem hover align="right">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <svg-icon icon-class="person-center"/>
                </div>
                <el-dropdown-menu slot="dropdown" >
                    <router-link to="/">
                        <el-dropdown-item>
                            主页
                        </el-dropdown-item>
                    </router-link>
                    <router-link to="/changePassword">
                        <el-dropdown-item>
                            修改密码
                        </el-dropdown-item>
                    </router-link>

                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </NavItem>
        <NavItem align="right" style="color:#909399; font-size: 14px;">{{myInfo.company ?
            myInfo.company.name : '平台'}}/
            {{myInfo.name}}
        </NavItem>
    </nav>
</template>

<script>
    import { mapState } from 'vuex'
    import Hamburger from './hamburger'
    import NavItem from './navItem'
    import Breadcrumb from './breadcrumb'

    export default {
        components: {
            Hamburger,
            NavItem,
            Breadcrumb,
        },
        computed: {
            ...mapState([
                'sidebar',
                'myInfo'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../variables.scss';
    nav {
        height: $navbar-height;
        line-height: $navbar-height;
        border-radius: 0 !important;
        padding-right: 30px;
        position: relative;

        .hamburger-container {
            line-height: 58px;
            height: 50px;
        }

        .avatar-container {
            width: 100%;
            height: 100%;
            font-size: 16px;
            line-height: $navbar-height;
            text-align: center;
        }
    }
</style>
