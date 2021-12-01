<template>
    <nav>
    </nav>
</template>

<script>
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

