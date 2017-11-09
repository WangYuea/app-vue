<template>
    <div class='shopinfo-container'>
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        <div class='mui-card'>
            <div class='mui-card-content'>
                <div class='mui-card-content-inner'>
                    <wiper :lunbotuList='lunbotu' :fullFlag='false'></wiper>
                </div>
            </div>
        </div>

        <div class='mui-card'>
            <div class='mui-card-header'>{{goodsinfo.title}}</div>
            <div class='mui-card-content'>
                <div class='mui-card-content-inner'>
                    <p>
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" >立即购买</mt-button>
                        <mt-button type="danger" @click="addshop">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>


        <div class='mui-card'>
            <div class='mui-card-header'>商品参数</div>
            <div class='mui-card-content'>
                <div class='mui-card-content-inner'>
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dataformat}}</p>
                </div>
            </div>
            <div class='mui-card-footer'>
                <mt-button type="primary" size="large" plain @click="goshopdesc(goodsinfo.id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goshopcomm(goodsinfo.id)">商品评论</mt-button>

            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import wiper from '../subcomponents/lunbo.vue'
    import numbox from '../subcomponents/shopinfo-numbox.vue'
    export default {
        data(){
        return {
            id: this.$route.params.id,
            lunbotu: [],
            goodsinfo:{},
            ballflag:false,
            selectedCount:1
        }
    },
    created(){
        this.getlunbotu()
        this.getgoodsinfo()
    },
    methods:{
        getlunbotu(){
            this.$http.get('api/getthumimages/' +this.id).then(result=> {
                if (result.body.status === 0) {
                    result.body.message.forEach(item=> {
                        item.img = item.src
                    })
                    this.lunbotu = result.body.message
                } else {
                    Toast('获取轮播图失败')
                }
            });
        },
        getgoodsinfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0]
                }else{
                    Toast('获取信息失败')
                }
            })
        },
        goshopdesc(id){
            this.$router.push({name:'shopdesc',params:{id}})
        },
        goshopcomm(id){
            this.$router.push({name:'shopcomm',params:{id}})
        },
        addshop(){
            this.ballflag=!this.ballflag
        },
        beforeEnter(el){
            el.style.transform='translate(0,0)'
        },
        enter(el,done){
            const ball=this.$refs.ball.getBoundingClientRect();
            const badge=document.getElementById('badge').getBoundingClientRect();
            const xdist=badge.left-ball.left;
            const ydist=badge.top-ball.top

            el.offsetHeight;
            el.style.transform='translate('+xdist+'px,'+ydist+'px)';
            el.style.transition='all 0.5s cubic-bezier(.48,.15,.37,.92)';
            done()
        },
        afterEnter(el){
            this.ballflag=!this.ballflag
        },
        getSelectCount(count){
            this.selectedCount  =count;
            console.log(this.selectedCount )
        }
    },
    components:{
        wiper,
        numbox
    }
    }
</script>

<style lang='scss' scoped>
    .shopinfo-container {
        background-color: #eee;
        overflow: hidden;
        .now_price{
            color:red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:390px;
        left: 150px;
    }
</style>