<template>
    <div class="shopdesc">
        <h3>{{content.title}}</h3>
        <hr>
        <div class="content" v-html="content.content"></div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
export default{
    data(){
    return{
        id:this.$route.params.id,
        content:{}
    }
},
    created(){
       this.getshopdes()
    },
methods:{
getshopdes(){
        this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
            if(result.body.status===0){
                this.content=result.body.message[0]
            }else{
                Toast('获取信息失败')
            }
        })
    }
}
}
</script>

<style lang="scss">
.shopdesc{
padding:5px;
    h3{
        font-size: 16px;
        color: #26aff2;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>