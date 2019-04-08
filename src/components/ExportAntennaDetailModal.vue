<template>
<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
        <h3>Please Waiting...</h3>
      </div>
      <div class="modal-body">
        <p>The system will export the data for you to download. please check offline table.</p>
      </div>
      <div class="modal-footer">
          <button class="btn btn-default offline_cancel" @click.prevent="onConfirm">OK</button>
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
      report_name:""
    }
  },
  props: ['modalState','hideModal','onConfirm'],
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
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