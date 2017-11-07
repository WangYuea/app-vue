<template>
<div class='shoplist-container'> 

<div class='shoplist-item' v-for='item in goodslist' :key='item.id'>
<img :src='item.img_url'>
<h1 class='title'>{{item.title}}</h1>
<div class='info'>
<p class='price'>
<span class='new'>￥{{item.sell_price}}</span>
<span class='old'>￥{{item.market_price}}</span>
</p>
<p class='sell'>
<span>热卖中</span>
<span>剩{{item.stock_quantity}}件</span>
</p>
</div>
</div>


</div>
</template>

<script>
import  {Toast} from 'mint-ui'
export default{
    data(){
        return{
            page:1,
            goodslist:[]
        }
    },
    created(){
        this.getshoplist()
    },
    methods:{
        getshoplist(){
            this.$http.get('api/getgoods?pageindex='+this.page).then(result=>{
                if(result.body.status===0){
                    // console.log(result.body.message)
                    this.goodslist=result.body.message
                }else{
                    Toast('获取失败')
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.shoplist-container{
    display:flex;
    flex-wrap:wrap;
    padding:8px;
    justify-content:space-between;
    .shoplist-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin-bottom:8px;
        padding:2px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        min-height:293px;
        img{
            width:100%
        }
        .title{
            font-size:14px;
        }
        .info{
            background-color:#ccc;
            p{
                margin:0;
                padding:5px;
            }
            .price{
                .new{
                    color:red;
                    font-siez:16px;
                    font-weight:bold;
                }
                .old{
                    text-decoration:line-through;
                    font-size:12px;
                    margin-left:10px;
                }
            }
            .sell{
                display:flex;
                justify-content:space-between;
            }
        }
    }
}
</style>