<template>
<div id="modal_batch_aff_access" ref="modal_batch_aff_access" class="modal fade">
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal">&times;</a>
                <h3>Batch {{batch_title}} Affiliate Access <span></span></h3>
            </div>
            <div class="modal-body text-center">
                <form class="form-horizontal" ref="selecAff">
                    <div class="control-group form-group">
                        <div class="col-md-12">
                            <select2Aff :select2_mode="'simple'" :showSelectAll="false" :aff_name="'aff_ids'"></select2Aff>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class='btn btn-primary' @click.prevent="batchAffAccess(getParams())">Confirm</span>
                </a>
                <a href="#" class="btn secondary" @click.prevent="hideModal">Cancel</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import select2Aff from './Select2Aff.vue'
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
    props: ['modalState','hideModal','batchAffAccess','batch_title'],
    components: {
      select2Aff
    },
    computed: {
        hideAlertPop() {
          this.alertPop = "hide"
        },
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.modal_batch_aff_access).modal(msg)
        },
        getParams() {
            var affs = $(this.$refs.selecAff).getFormQuery();
            return affs;
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