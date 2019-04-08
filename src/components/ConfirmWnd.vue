<template>

<div id="confirm_wnd" ref="confirm_wnd" class="modal fade">
    <div class="modal-dialog">

        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal">&times;</a>
                <h3>Confirmation</h3>
            </div>
            <div class="modal-body" v-html="modalBody">
            </div>
            <div class="modal-footer">
                <a href="#" class="btn secondary" name="cancel" @click.prevent="hideModal">Cancel</a>
                <a href="#" class="btn primary btn-danger" @click.prevent="hideModal();onConfirm()">OK</a>
            </div>
        </div>
    </div>
</div>

</template>
<script>
export default{

    props:  {
        'modalState':{
        },
        'hideModal':{},
        'confirmDelete': {},
        'modalBody':{
            default:'Are you sure to submit?'
        },
        onConfirm:{}
    },
    methods: {
        toggleModal:function(msg) {
            $(this.$refs.confirm_wnd).modal(msg)
        },
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        }
    },
    mounted () {
        let that = this
        $(this.$refs.confirm_wnd).on('hidden.bs.modal', function () {
            that.hideModal()
        })
        console.log(that.modalState)
    }
}
</script>