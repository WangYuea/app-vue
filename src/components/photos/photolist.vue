<template>
<div class='photolist-container'>
<div id='silder' class='mui-silder'>
<div id='sliderSegmentedControl' class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
    <div class="mui-scroll">
        <a :class="['mui-control-item',item.id==0?'mui-active':''] " v-for='item in cates' :key='item.id' @tag='getImgList(item.id)'>
            {{item.title}} 
        </a>
       
    </div>
</div>
</div>

<ul class='photo-list'>
  <router-link :to="'/home/photoinfo/'+item.id" tag='li' v-for="item in list" :key='item.id'>
    <img v-lazy="item.img_url">
    <div class='info'>
    <div class='title'>{{item.title}}</div>
    <div class='content'>{{item.zhaiyao}}</div>
    </div>
  </router-link>
</ul>
</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'
    export default{
        data(){
            return{
                cates:[],
                list:[]
            }
        },
        created(){
            this.getAllCategory()
            this.getImgList(0)
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
	            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getAllCategory(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if(result.body.status===0){
                        result.body.message.unshift({title:'全部',id:0})
                        this.cates=result.body.message
                    }else{
                        Toast('获取分类失败')
                    }
                })
            },
            getImgList(cateId){
                this.$http.get('api/getimages/'+cateId).then(result=>{
                    if(result.body.status===0){
                        this.list=result.body.message
                    }else{
                        Toast('获取图片失败')
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped> 
*{
    touch-action:pan-y;
}
.photo-list{
    list-style:none;
    margin:0;
    padding:10px;
    padding-bottom:0;
    li{
        background-color:#ccc;
        text-align:center;
        margin-bottom:10px;
        box-shadow:0 0 9px #999;
        position:relative;
        img{
            width:100%;
            vertical-align:middle;
        }
        img[lazy=loading] {
         width: 40px;
         height: 300px;
         margin: auto;
        }
        .info{
            position:absolute;
            bottom:0;
            left:0;
            text-align:left;
            color:#fff;
            background-color:rgba(0,0,0,0.4);
            height:84px;
            .title{
                font-size:14px;
            }
            .content{
                font-size:13px;
            }
        }
}
}
</style>