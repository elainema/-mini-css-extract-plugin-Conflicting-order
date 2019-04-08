<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>{{ editable_modal_title }}</h3>
            </div>
            <div class="modal-body">

              <b><p class="demotion " id="levelConfirm">Are you sure to change the affiliate level to  {{curVal}}?</p></b>
              <span v-html="formatAffLevelNote"></span>
              <p class="demotion ">The change you made results in a status difference of offers!</p>
              <p class="demotion ">The following offers will be affected that <span class="red"><i>generated some clicks</i></span> in last 7 days</p>
              <div id="levelInfo"></div>
              <p>we suggest your in-time notification to your affiliates about all these changes.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary " @click.prevent="onConfirmBtn">{{ editable_confirm_btn }}</button>
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
    curVal:{},
    editable_modal_title:{default:"Confirm"},
    editable_confirm_btn:{default:"Confirm"},
  },
  computed: {

    formatAffLevelNote(){
        let desc = ""
        switch (this.curVal) {
            case "1":
                desc += "<ul class='affLevel'>" + "<li>Public offer without approval:approved</li>" + "<li>Public offer need approval:unapproved</li>" + "<li>Private offer:blocked</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "2":
                desc += "<ul class='affLevel'>" + "<li>Public offer:approved</li>" + "<li>Private offer:blocked</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "3":
                desc += "<ul class='affLevel'>" + "<li>All offers:approved</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
        }
        return desc
    }

  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
        this.hideModal();
        this.onConfirm()
    }

  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },
    curVal:function(val){
      
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