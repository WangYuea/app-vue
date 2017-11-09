<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="changeCount" ref="inputValue"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        mounted(){
        mui('.mui-numbox').numbox();
    },
    methods:{
        changeCount()
        {
            this.$emit('getcount', parseInt(this.$refs.inputValue.value))
        }
    },
    props:['max'],
    watch:{
       'max':function(newval,oldval){
            mui('.mui-numbox').numbox().setOption('max',newval)
        }
    }

    }
</script>

<style lang="scss" scoped>

</style>