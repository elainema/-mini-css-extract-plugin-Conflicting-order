<template>
<div id="modal_batch_publisher_access" ref="modal" class="modal fade">
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal">&times;</a>
                <h3>Batch {{batch_title}} App Access <span></span></h3>
            </div>
            <div class="modal-body text-center">
                <form class="form-horizontal" ref="selectPublisher">

                    <div class="control-group form-group">
                        <div class="col-md-12">
                            <select2App ></select2App>
                        </div>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class='btn btn-primary' @click.prevent="onConfirm">Confirm</span>
                </a>
                <a href="#" class="btn secondary" @click.prevent="hideModal">Cancel</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import select2App from './Select2App.vue'

export default {
    data(){
        return {
            value: "",
            alertPop:"hide",
            alertMsg:"",
            alertType:"info",
            affs: ''
        }
    },
    props: ['modalState','hideModal','batchPublisherAccess','batch_title'],
    components: {
      select2App
    },
    computed: {
        hideAlertPop() {
          this.alertPop = "hide"
        },
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.modal).modal(msg)
        },
        getParams() {
            var query = $(this.$refs.selectPublisher).getFormQuery();

            return query;
        },
        onConfirm() {
            let query = this.getParams()
            if(!query.app_ids) return
            this.hideModal();
            this.batchPublisherAccess(query)
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
        $(this.$refs.modal).on('shown.bs.modal', function () {
            $("#modal_batch_publisher_access").find("[name='app_ids']").val("").change()
        })

    }
}
</script>