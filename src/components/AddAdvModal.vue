<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal">×</a>
                <h3>Add Advertiser</h3>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" role="form">
                  <div class="control-group form-group">
                      <label class="control-label col-md-3">Advertiser:</label>
                      <div class="controls col-md-9">
                          <chosen  v-if="advChosen" ref="chosen" :chosen="advChosen"  :chosen_name="'adv_id'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All Advs -'"></chosen>
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
import chosen from "./Chosen.vue"

export default {
  data(){
    return {
    advChosen:"",
    }
  },
  components:{chosen },
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    current_exclude_app_selected:{},
    excludeAppType:{},
    advs:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
        this.hideModal();
        this.onConfirm($(this.$refs.modal).find("select").val())
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },
    current_exclude_app_selected:function(val){
      this.app_name  = this.current_exclude_app_selected
    },
    advs: function(val) {
      if(val){
        this.advChosen = { name: "advertiser_id", trans_name:"",  full_name: "advertiser_id", data: this.advs }
      }
    }
  },
  mounted () {
    let that = this
    $(this.$refs.modal).on('shown.bs.modal', function (e) {
        e.stopPropagation()
        if(that.excludeAppType === "add") {
          that.app_name = ""
        }
    })

  }
}
</script>