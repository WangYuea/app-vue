<template>
    <div class='cmt-container'>
        <h3>发表评论</h3>
        <textarea placeholder='请输入要评论的内容（最多102字）' maxlength='120' v-model='info'></textarea>
        <mt-button type='primary' size='large' @click='addcomments'>发表评论</mt-button>
        <div class='cmt-list'>
            <div class='cmt-item' v-for='(item,i) in comments'>
                <div class='cmt-title'>
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataformat}}
                </div>
                <div class='cmt-body'>
                    {{item.content==='undefinded'?'用户很懒，没有评论':item.content}}
                </div>
            </div>
        </div>
        <mt-button type='danger' size='large' plain @click='getmore'>加载更多</mt-button>
    </div>
</template>

<script>
    export default{
        data()
    {
        return {
            pageIndex: 1,
            comments: [],
            info: ''
        }
    }
    ,
    created()
    {
        this.getcomments()
    }
    ,
    methods:{
        getcomments()
        {
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result=> {
                if (result.body.status === 0) {
                    this.comments = this.comments.concat(result.body.message)
                } else {
                    Toast('获取评论失败')
                }
            })
        }
    ,
        getmore()
        {
            this.pageIndex++;
            this.getcomments()
        }
    ,
        addcomments()
        {
            if (this.info.trim().length === 0) {
                return Toast('评论不能为空')
            }
            this.$http.post('api/postcomment/' + this.$route.params.id, {content: this.info.trim()}).then(result=> {
                if (result.body.status === 0) {
                    var cmt = {user_name: '匿名用户', add_time: Date.now(), content: this.info.trim()}
                    this.comments.unshift(cmt)
                    this.info = ''
                } else {
                    Toast('评论添加失败')
                }
            })
        }
    }
    ,
    props:['id']
    }
</script>

<style lang='scss' scoped>
    .cmt-container {

    h3 {
        font-size: 18px;
    }

    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }

    .cmt-list {
        margin: 5px 0;

    .cmt-item {
        font-size: 13px;

    .cmt-title {
        line-height: 30px;
        background-color: #ccc;
    }

    .cmt-body {
        line-height: 35px;
        text-indent: 2em;
    }

    }
    }
    }
</style>