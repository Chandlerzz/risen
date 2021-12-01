<template>
    <div
        :class="`navbar-item ${alignClass} ${hoverClass}`"
        @click="clickHandle"
    >
        <slot/>
    </div>
</template>

<script>
    export default {
        props: {
            align: {
                type: String,
                default: 'left',
            },
            hover: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            alignClass() {
                return this.align === 'right' ? 'b-pull-right' : 'b-pull-left'
            },

            hoverClass() {
                return this.hover ? 'hover' : ''
            }
        },
        methods: {
            clickHandle() {
                const slots = this.$slots
                if (
                    slots.default &&
                    Array.isArray(slots.default) &&
                    slots.default.length > 0 &&
                    slots.default[0].child &&
                    typeof slots.default[0].child.click === 'function'
                ) {
                    slots.default[0].child.click()
                }
            }
        },
        created() {
            // if (this.$slots.default && this.$slots.default.length > 1) {
            //     console.error('NavItem只能含有一个组件')
            // }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../variables.scss';
    .navbar-item {
        display: flex;
        justify-content: center;
        height: $navbar-height;
        min-width: $navbar-height;
    }

    .hover{
        cursor: pointer;
    }

    .hover:hover {
        background: #f9f9f9;
    }
</style>
