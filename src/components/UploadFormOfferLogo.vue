<template>
<div>

    <span class="btn btn-default btn-file">{{btnName}}<input type="file"  data-control-name="bt-button" :class="'btn btn-primary'" ref="btn_upload" :accept="accept" >
    </span>
    <form class="hide" ref="upload_form" >
        <input type="hidden" name="Filename" :value="upload_file.name">
        <input type="hidden" name="offer_id" :value="offer_id">
        <input type="hidden" name="PHPSESSID" :value="cookieHash.PHPSESSID">
        <input name="upload" ref="upload" type="file"/>
    </form>
</div>
</template>

<script>
import cors_config from '../util/config'
import { mapGetters, mapActions } from 'vuex'

export default{
    data() {
        return {
            upload_file:{},
        }
    },
    components:{},
    props:{
        offer_id:{},
        showAlert:{},
        uploadSuccess:{},
        beforeChange:{},
        afterChange:{},
        btnName:{},
        nonsupport:{default:'image/bmp'},
        accept:{default:'.jpg,.jpeg,.png,.gif,.bmp,.txt,.doc,.ppt,.pdf,.rar,.zip,.mp4'},
        url:{default:cors_config.swfupload.upload_url.uploadLogo}
    },
    computed: {
        ...mapGetters({
            cookieHash: 'cookieHash'
        })
    },
    methods:{
        uploadFile(){
            var that = this;
            this.beforeChange()
            this.$http.post(that.url, $(this.$refs.upload_form).getFormData()).then(response => {
                var data = response.body.data
                this.uploadSuccess(data)
                if(!data){
                    that.showAlert(response.body.msg, "info")
                    return;
                }
                this.afterChange()
            }, response => {
                this.afterChange()
                that.showAlert(response.body.msg, "error")
            })
        },
    },
    created () {
    },
    mounted() {
        let that = this
        let $btn_upload = $(this.$refs.btn_upload)
        $btn_upload.on("change", function(e) {
            console.log(this.files[0])
            if(this.files.length) {
                var file_type =  this.files[0] && this.files[0].type
                var accept_type = that.accept;
                var nonsupport_type = that.nonsupport;
                var reg_accept = new RegExp(accept_type);
                var reg_nonsupport = new RegExp(nonsupport_type);
                var is_accept_type = reg_accept.test(this.files[0].type)
                var is_nonsupport_type = reg_nonsupport.test(this.files[0].type)
                if (is_accept_type && !is_nonsupport_type){
                    that.upload_file = this.files[0]
                    let _file = $(that.$refs.btn_upload).clone()
                    _file.attr("name",'upload')
                    $(that.$refs.upload_form).find('[type=file]').replaceWith(_file)
                    that.$nextTick(function(){
                        that.uploadFile()
                    })
                    $btn_upload.val("")
                } else {
                    that.showAlert('Upload fail：please check upload file Type!')
                }

            }
        })


    }

}
</script>
<style scoped>
.btn-file {
    width: 100px;
    box-sizing: border-box;
}
</style>
