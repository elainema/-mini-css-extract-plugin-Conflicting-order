<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
        <h4 class="modal-title" id="">{{modal_title}}</h4>
            </div>
            <div class="modal-body">
                <p v-if="showTips">Please provide reason or suggestion</p>
                <form class="form-horizontal frm-entity">
                  <div class="form-group"><textarea id="reason" maxlength="200" rows="5" class="col-md-12" v-model="reason"></textarea></div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary " @click.prevent="onConfirmBtn">{{confirm_btn}}</button>
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>

export default {
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    modal_body:{default:''},
    showTips:{default:true},
    confirm_btn:{default:'Submit'},
    modal_title:{default:'Reason/Suggestion'},
  },
  data() {
    return {
      reason:'',
    }
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
        this.hideModal();
        this.onConfirm(this.reason);
    }
  },
  watch: {
      modal_body(val){
          this.reason = val
      },
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
