<template>
    <!-- Status reserve modal -->
<div id="update_offer_logo" ref="update_offer_logo" class="modal fade" >
    <!-- <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop> -->
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal">&times;</a>
                <h3>Update <span class="name">Offer</span> Logo</h3>
            </div>
            <div class="modal-body">
                <div class="alert alert-error" v-show="msg">
                    <a class="close" data-dismiss="alert">×</a>
                    <strong>FAIL: </strong> Upload Error. Message: {{msg}}
                </div>
                <form class="form-horizontal" action="#">
                    <div class="control-group">
                        <label class="control-label col-md-2" for="logo">Logo</label>
                        <div class="controls swf-uploader-container">
                            <UploadFormOfferLogo :offer_id="offer_id"  :beforeChange="beforeChange" :afterChange="afterChange" :showAlert="showAlert" v-if="renderOffer" :uploadSuccess="uploadSuccess" :btnName="'Select File'" :accept="accept"></UploadFormOfferLogo>

                            <!-- <div class="swfupload-control" id="swf_uploader" style="left: 100px;">
                                <span id="spanButtonPlaceholder"></span>
                            </div> -->
                            <p></p>
                            <img :src="config.ajax_loader_img" v-show="offer_logo_loading" id="offer_logo_loading" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>
<script>
/*import alert_pop_http from '../util/alert_pop'
import AlertPop from './Alert_pop.vue'*/
import cors_config from '../util/config'
import UploadFormOfferLogo from './UploadFormOfferLogo.vue'

import { mapGetters, mapActions } from 'vuex'
export default {
    data(){
        return {
            value: "",
            alertPop:"hide",
            alertMsg:"",
            alertType:"info",
            msg:'',
            config:cors_config,
            offer_logo_loading:false,
            type:'',
            id:''
        }
    },
    props: ['modalState','hideModal','offer_id', 'showAlert', 'renderOffer','accept'],
    components: {
       UploadFormOfferLogo
       
    },
    computed: {
        ...mapGetters({
          cookieHash:"cookieHash",
        }),
        hideAlertPop() {
          this.alertPop = "hide"
        },
        /*getParams() {
            var affs = $(this.$refs.selecAff).serializeArray();
            return affs;
        }*/
    },
    methods: {
        uploadSuccess: function(file, serverData) {
            console.log('uploadSuccess')
            var json = false;
            var id = this.id
            var that = this

            if (_.isNumber(id)) {
                $('#upload_btn' + id).prev('a').find('img').attr('src', file);
            } else {
                var ids = id.split(',');
                $.each(ids, function(i, n) {
                    $('#upload_btn' + n).prev('a').find('img').attr('src', file);
                })
            }
            that.hideModal();

        },
        uploadError : function(file, error, message) {
            console.log('uploadError')
        },
        upload_logo (id, type) {
            /*var id = this.offer_id
            var cookie_hack = null;
            var that = this*/
            var type = "!product"
            this.id = this.offer_id
            this.type = type
            /*
            if (type === "product") {
                $("#update_offer_logo .name").text("Product")
            } else {
                $("#update_offer_logo .name").text("Offer")
            }*/
        },
        beforeChange(){
            this.offer_logo_loading = true
        },
        afterChange(){
            this.offer_logo_loading = false
        },
        toggleModal:function(msg) {
               this.upload_logo()
            this.offer_logo_loading = false
            this.msg = ''
            $(this.$refs.update_offer_logo).modal(msg)
        },
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        }
    },
    mounted () {
        let that = this
        $(this.$refs.modal).on('hidden.bs.modal', function () {
            that.hideModal()
        })
    }
}

</script>
<style scope>
    .col-md-2{
        width: 16.666666666666664% !important;
        float: left;
    }
</style>