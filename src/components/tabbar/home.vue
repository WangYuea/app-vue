<template>
    <div class='home'>
        <lunbo :lunbotuList='lunbotuList' :fullFlag='true'></lunbo>
        <ul class='mui-table-view mui-grid-view mui-grid-9'>
            <li class='mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3'>
                <router-link to='/home/newlist'>
                    <img src='../../images/menu1.png' alt=''/>

                    <div class='mui-media-body'>新闻资讯</div>
                </router-link>
            </li>
            <li class='mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3'>
                <router-link to='/home/photolist'>
                    <img src='../../images/menu2.png' alt=''/>

                    <div class='mui-media-body'>图片分享</div>
                </router-link>
            </li>
            <li class='mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3'>
                <router-link to='/home/shoplist'>
                    <img src='../../images/menu3.png' alt=''/>

                    <div class='mui-media-body'>商品购买</div>
                </router-link>
            </li>
            <li class='mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3'>
                <a href='#'>
                    <img src='../../images/menu4.png' alt=''/>

                    <div class='mui-media-body'>留言反馈</div>
                </a>
            </li>
            <li class='mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3'>
                <a href='#'>
                    <img src='../../images/menu5.png' alt=''/>

                    <div class='mui-media-body'>视频专区</div>
                </a>
            </li>
            <li class='mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3'>
                <a href='#'>
                    <img src='../../images/menu6.png' alt=''/>

                    <div class='mui-media-body'>联系我们</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import lunbo from '../subcomponents/lunbo.vue'
    export default{
        data()
    {
        return {
            lunbotuList: []
        }
    }
    ,
    created()
    {
        this.getLunBo()
    }
    ,
    methods:{
        getLunBo()
        {
            this.$http.get('api/getlunbo').then(result=> {
                // console.log(result.body)
                if (result.body.status === 0) {
                    this.lunbotuList = result.body.message
                    // Toast('ok')
                } else {
                    Toast('加载失败')
                }
            })
        }
    }
    ,
    components:{
        lunbo
    }
    }
</script>

<style lang='scss' scoped>

    .mui-grid-view.mui-grid-9 {
        background-color: #FFF;
        border: 0;

    img {
        width: 60px;
    }

    }
    .mui-media-body {
        font-size: 13px
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0
    }
</style>