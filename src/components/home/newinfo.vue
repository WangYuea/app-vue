<template>
    <div class='newinfo-container'>
        <h3 class='title'>{{infodata.title}}</h3>

        <p class='subtitle'>
            <span>发表时间：{{infodata.add_time | dataformat}}</span>
            <span>点击：{{infodata.click}}次</span>
        </p>
        <hr>
        <div class='content' v-html="infodata.content"></div>
        <comment-box :id='this.id'></comment-box>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import comments from '../subcomponents/comment.vue'
    export default{
        data()
    {
        return {
            id: this.$route.params.id,
            infodata: {}
        }
    }
    ,
    created()
    {
        this.getinfo()
    }
    ,
    methods:{
        getinfo()
        {
            this.$http.get('api/getnew/' + this.id).then(result=> {
                if (result.body.status === 0) {
                    this.infodata = result.body.message[0]
                } else {
                    Toast('获取新闻详情失败！')
                }
            })
        }
    }
    ,
    components:{
        'comment-box'
    :
        comments
    }

    }
</script>

<style lang='scss'>
    .newinfo-container {
        padding: 0 4px;

    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }

    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }

    .content {

    img {
        width: 100%;
    }

    }
    }
</style>