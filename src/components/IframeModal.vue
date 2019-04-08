<template>
<div id="" class="modal  fade modal-lg " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3></h3>
            </div>
            <div class="modal-body">
              <iframe :src="newwin_url" v-if="newwin_url" frameborder='0' scrolling="yes"  style="width:100%"onload="this.style.height=this.contentDocument.body.scrollHeight +'px';" ></iframe>
            </div>

            <div class="modal-footer">

            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  props: {
    modalState:{},
    hideModal:{},
    newwin_url:{}
  },
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

    $(this.$refs.modal).on('shown.bs.modal', function () {

    })

  }
}
</script>s