<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <span class="no-redirect">{{ routeName }}</span>
    </el-breadcrumb>
</template>

<script>
    export default {
        data() {
            return {
                routeName: null
            }
        },
        watch: {
            $route() {
                this.getRouteName()
            }
        },
        created() {
            this.getRouteName()
        },
        methods: {
            getRouteName() {
                this.routeName = this.$route.meta.title
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    @import '../variables.scss';
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: $navbar-height;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
