<template>
<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
        <h3>Mail Content</h3>
      </div>
      <div class="modal-body">
        <div class="box-container">
          <div class="box-content form-horizontal frm-entity frm-detail row">
            <div class="control-group form-group">
              <label class="col-md-10"><strong>Mail Subject</strong></label>
              <div class="">
                <textarea id="subject" class="text col-md-12 form-control" rows="1" :value="sysTemEmail.title"></textarea>
              </div>
            </div>
            <div class="control-group form-group">
              <label class="col-md-10"><strong>Conent</strong></label>
              <div class="">
                <textarea id="content" class="text col-md-12 form-control" rows="10" :value="sysTemEmail.content"></textarea>
              </div>
            </div>
            <div class="control-group form-group">
              <label class="col-md-10"><strong>To</strong></label>
              <div class="">
                <textarea id="list_to" class="text col-md-12 form-control" rows="4"  v-html="sysTemEmail.email && sysTemEmail.email.replace(/,/g,'\n')"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default offline_cancel" @click.prevent="hideModal" >Close</button>
      </div>
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</div>
</template>
<script>

export default {
  props: ['modalState','hideModal','sysTemEmail'],
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