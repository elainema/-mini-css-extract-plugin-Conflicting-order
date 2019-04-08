<template>
<div id="win_wnd" class="modal fade" ref="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" @click.prevent="hideModal">&times;</button>
                <h3 class="red">Warning</h3>
            </div>
            <div class="modal-body">
                <p class="red">{{ modalBody || defaultModalBody}}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="confirm" @click.prevent="confirmModal">Confirm</button>
                <button class="btn btn-secondary"  @click.prevent="hideModal">Close</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            defaultModalBody:'Payout is more than revenue',
        }
    },
    props: ['modalState','hideModal','setStatus', 'modalBody', 'formSubmit'],
    components: {
    },
    computed: {
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.modal).modal(msg)
        },
        confirmModal() {
            this.formSubmit && this.formSubmit();
        },
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