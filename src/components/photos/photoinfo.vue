<template>
    <div class='photoinfo-container'>
        <h3>{{photoinfo.title}}</h3>

        <p class='subtitle'>
            <span>发表时间：{{photoinfo.add_time | dataformat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <div class='infoimg'>
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100"
                 @click="$preview.open(index, list)" :key='item.src'>
        </div>
        <div class='content' v-html='photoinfo.content'></div>
        <cmt-box :id='id'></cmt-box>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import cmt from '../subcomponents/comment.vue'
    export default{
        data()
    {
        return {
            id: this.$route.params.id,
            photoinfo: {},
            list: []
        }
    }
    ,
    created()
    {
        this.getphotoid()
        this.getList()
    }
    ,
    methods:{
        getphotoid()
        {
            // console.log(this.id)
            this.$http.get('api/getimageInfo/' + this.id).then(result=> {
                if (result.body.status === 0) {
                    console.log(this.id)
                    this.photoinfo = result.body.message[0]
                } else {

                    Toast('获取信息失败')
                }
            })
        }
    ,
        getList()
        {
            this.$http.get('api/getthumimages/' + this.id).then(result=> {
                if (result.body.status === 0) {
                    result.body.message.forEach(item=> {
                        item.w = 600;
                        item.h = 400;
                    });
                    this.list = result.body.message

                } else {
                    Toast('获取图片失败！')
                }
            })
        }
    }
    ,
    components:{
        'cmt-box'
    :
        cmt
    }
    }
</script>

<style lang='scss' scoped>
    .photoinfo-container {
        padding: 3px;

    h3 {
        color: #26a2ff;
        font-size: 15px;
        margin: 15px 0;
        text-align: center;
    }

    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px
    }

    .content {
        font-size: 13px;
        line-height: 30px;
    }

    .infoimg {

    img {
        margin: 10px;
        box-shadow: 0 0 8px #999
    }

    }
    }

</style>