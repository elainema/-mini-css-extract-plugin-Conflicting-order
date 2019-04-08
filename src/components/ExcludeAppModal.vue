<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal_app" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal">×</a>
                <h3>{{excludeAppType === "add" ?  "Add App" : "Edit App"}}</h3>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" role="form">
                  <div class="control-group form-group">
                      <label class="control-label col-md-3">App Package Name: </label>
                      <div class="controls col-md-9">
                          <input type="text" v-model="app_name"></input>
                      </div>
                  </div>
              </form>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary " @click.prevent="onConfirmBtn">Confirm</button>
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      app_name:""
    }
  },
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    current_exclude_app_selected:{},
    excludeAppType:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal_app).modal(msg)
    },
    onConfirmBtn:function(){
        this.hideModal();
        this.onConfirm(this.app_name, this.excludeAppType)
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },
    current_exclude_app_selected:function(val){
      this.app_name  = this.current_exclude_app_selected
    }
  },
  mounted () {
    let that = this

     $(this.$refs.modal_app).on('shown.bs.modal', function (e) {
         e.stopPropagation();
         if(that.excludeAppType === "add") {
           that.app_name = ""
         }
     })

  }
}
</script>