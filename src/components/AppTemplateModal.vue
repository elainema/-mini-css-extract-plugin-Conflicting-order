<template>
<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby="">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
        <h3>{{ appTemplateModalType == 'edit' ? "Edit Template" : "Add Template"}}</h3>
      </div>
      <div class="modal-body">
        <form class="form-horizontal form-report" ref="form">
            <div class="control-group form-group">
                <label class="control-label col-md-3">ID</label>
                <div class="controls col-md-9">
                    <div class="input-append">
                        <input type="hidden" name="publisher_id" v-model="publisher_id">
                        <input type="text" name="id" readonly=readonly  :value="templateData.id"/>
                    </div>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Name
                    <i class="icon-exclamation red"></i>
                </label>
                <div class="controls col-md-9">
                    <div class="input-append">
                        <input type="text" name="name" id="name" :value="templateData.name" class="txt-required" />
                    </div>
                </div>
            </div>
            <div class="control-group form-group control-group-template ">
                <label class="control-label col-md-3">Html5
                    <i class="icon-exclamation red"></i>
                </label>
                <div class="controls col-md-9">


                    <div class="input-append ">
                        <textarea id="template" name="content" data-name="template" class="form-control txt-required" rows="6" :value="templateData.content"></textarea>
                    </div>
                    <a href="javascript:;" class="macro_link" data-target="#macro_content" @click="toggleMacro = !toggleMacro">Template Macro</a>
                    <div  id="macro_content" class="macro_content " v-show="!toggleMacro">
                        <p>{TITLE}:</p>
                        <p>{ICON}: the icon from app market</p>
                        <p>{DESC}: the app description from app market</p>
                        <p>{IMG_WIDTH_HEIGHT}: the creative matched the size, e.g. {IMG_320_480}</p>
                        <p>{DOWNLOAD}: the total download counts of the app</p>
                        <p>{BUTTON_TEXT}: the text shown on the button and 'INSTALL' for default</p>
                        <p>{AD_ID}</p>
                        <p>{RATE}: the rating number of the app from app market</p>
                        <p>{PKG_SIZE}: the package size of the app</p>
                        <p>{BUNDLE}: the app bungle name or bundle id</p>
                        <p>{VERSION}: the latest version of the app</p>
                        <p>{FREE_TAG}: indicate if the app is a free one</p>
                        <p>{UPDATE_TIME}: the update time of the latest version</p>
                        <p>{REVIEW_COUNT}: indicates how many users have reviewed the app</p>
                        <p>{VIDEO}: the video of the app from app market</p></p>
                        <p>{CLICK_THROUGH_URL}: the url once user clicks</p>
                        <p>{AD_TYPE}: </p>
                        <p>{CATE}: the category </p>
                        <p>{STAR_ICON}: display a star icon</p>
                        <p>{DOWNLOAD_LOW}: the min numbers of users who downloaded from the market</p>
                        <p>{DOWNLOAD_UP}: the max numbers of users who downloaded from the market</p>
                        <p>{REQUIRED_DEVICE}: the required devices of the app </p>
                        <p>{REQUIRED_VERSION}: the required os version of the app </p>
                        <p>{UPDATE_LOG}: the update log of the latest version</p>
                    </div>
                </div>
            </div>

        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary " @click.prevent="onConfirmBtn">Confirm</button>
        <button class="btn btn-default " @click.prevent="hideModal" >Cancel</button>
      </div>
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</div>
</template>
<script>

export default {
  data(){
    return {
      toggleMacro:true,
      publisher_id:this.$route.query.id
    }
  },
  props: {
    appTemplateModalType:{},
    modalState:{},
    hideModal:{},
    onConfirm:{},
    templateData:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
      this.onConfirm($(this.$refs.form))
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },

  },
  mounted () {
    let that = this
    $(this.$refs.modal).on('hidden.bs.modal', function () {
      that.hideModal()
    })
    $(this.$refs.modal).on('shown.bs.modal', function () {
      
    })
  }
}
</script>
<style>
.macro_link{
  color: #08c;
  text-decoration: underline;
}
</style>