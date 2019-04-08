<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>Problems:</h3>
            </div>
            <div class="modal-body">
                <div>
                    <div class="row-fluid">
                        <label class="col-md-3">Problems:</label>
                        <textarea rows="4" class="col-md-8 form-control" id="problems" v-model="problems"></textarea>
                    </div>
                </div>
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
      problems:""
    }
  },
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
        this.hideModal();
        this.onConfirm(this.problems)
    }
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