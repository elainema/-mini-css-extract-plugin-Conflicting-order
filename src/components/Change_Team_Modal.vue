<template>
<div id="confirm_dailog" class="modal  fade" ref="modal">
    <div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"> <a class="close " @click.prevent="hideModal">×</a>
        <h3>Change Team</h3>
    </div>
    <div class="modal-body text-left">
      <form class="form-horizontal">
        <div class="control-group">
          <label class="control-label col-md-2">Team</label>
              <div class="controls">
                  <select id="role" class="col-md-3" name="group_id" v-model="group_id">
                    <option value="">- Please select a team -</option>
                    <option :value="n.id" v-for="n in modal_body"> {{ n.id}} - {{ n.name }}</option>
                  </select>
              </div>
        </div>
      </form>
    </div>
    <div class="modal-footer"> 
        <a href="#" class="btn btn-primary" id="confirmBtn"  @click.prevent.stop="confirmBtn(group_id)" :disabled="is_disabled">confirm</a>
        <a href="#" class="btn secondary"  @click.prevent="hideModal">Cancel</a>
    </div>
    </div></div>
</div>

</template>
<script>

export default {
  props: ['modalState','hideModal','confirmBtn', "modal_body"],
  data() {
    return{
      is_disabled:true,
      group_id:'',
    }
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
  },
  watch: {
    group_id(newVal, oldVal){
      if (!_.isEmpty(newVal)) {
        this.is_disabled = false
      } else {
        this.is_disabled = true
      }
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