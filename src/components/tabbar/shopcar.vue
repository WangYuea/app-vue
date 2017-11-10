<template>
    <div class="shopcar-container">
        <div class="gooslist">
            <div class='mui-card' v-for="(item,i) in goodsinfo" :key="item.id">
                <div class='mui-card-content'>
                    <div class='mui-card-content-inner'>
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt=""/>
                        <div class="info">
                            <h1>{{item.title}}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class='mui-card'>
            <div class='mui-card-content'>
                <div class='mui-card-content-inner jiesuan'>
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndNum.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndNum.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>

            </div>
        </div>
<p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
import numbox from '../subcomponents/shopcar-numbox.vue'
    export default {
        data(){
    return{
        goodsinfo:[]
    }
},
    created(){
        this.getGoodsList()
    },
    methods:{
 getGoodsList(){
        var stores=this.$store.state.car
        var obj=[];
        stores.forEach(item=>{
            obj.push(item.id)
        })
        if(obj.length<=0){
            return;
        }
        this.$http.get('api/goods/getshopcarlist/'+obj.join(',')).then(result=>{
            if(result.body.status===0){
                this.goodsinfo=result.body.message
            }else{
                Toast('获取数据失败')
            }
        })
    },
    remove(id,index){
this.$store.commit('removlist',id)
        this.goodsinfo.splice(index,1)
    },
        selectedChange(id,val){
//            console.log(id,val)
            this.$store.commit('updataGoodsSelected',{id,selected:val})
        }
},
    components:{
            numbox
        }
    }
</script>
<style lang='scss' scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .gooslist{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
            img{
                width: 60px;;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                display:flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                color:red;
                font-weight: bold;
                }
            }
        }
    }
.jiesuan{
    display:flex;
    justify-content: space-between;
    align-items: center;
    .red{
        color:red;
        font-size: 16px;
        font-weight: bold;
    }
}
}
</style>