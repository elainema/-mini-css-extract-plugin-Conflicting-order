<template>

<div id="confirm_approve_modal" ref="confirm_approve_modal"　class="modal fade" data-backdrop="static">
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog"><div class="modal-content">
    <div class="modal-header"> <a class="close"   @click.prevent="onCancel">&times;</a>
        <h3 class="red">Warning</h3>
    </div>
    <div class="modal-body" v-html="modalBody">
    </div>

    <div class="modal-footer"> <a href="javascript:;" class="btn secondary" @click.prevent="onCancel">Cancel</a>
        <a href="javascript:;" class="btn btn-primary btn-danger" @click.prevent="editConfirm">OK</a></div>
    </div></div>
</div>

</template>
<style>
#confirm_approve_modal.modal h4 {
    font-size: 20px;
}
#confirm_approve_modal.modal ul {
    margin: 0;
    padding: 10px 0;
}
#confirm_approve_modal.modal ul li {
    font-size: 14px;
    display: table;
    color: #666;
    line-height: 24px;
}
#confirm_approve_modal.modal p {
    font-size: 13px;
    margin: 10px 0;
    font-weight: bold;
    color: #333;
}
</style>
<script>
export default {
    props: ['modalState','hideModal', 'editConfirm','editCancel', 'modalBody'],
    data(){
        return {
        }
    },
    components: {
    },
    computed: {
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.confirm_approve_modal).modal(msg)
        },
        onCancel:function(){
            this.hideModal()
            this.editCancel()
        }
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        },
    },
    mounted () {
        let that = this
       /* $(this.$refs.confirm_approve_modal).on('hidden.bs.modal', function () {
            that.hideModal()
        })*/
    }
}
</script>