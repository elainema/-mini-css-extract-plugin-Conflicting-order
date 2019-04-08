<template>
<div id="add_product_offer_dailog" ref="add_product_offer_dailog"  class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal">&times;</a>
                <h3>Add Offer</h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" ref="selecOffer">
                    <div class="control-group form-group">
                        <div class="col-md-12">
                            <p>Offer<span style="color: #888;padding: 0 15px;">search maximum show 50 search results</span></p>
                            <select2offer :select2_mode="'simple'" :showSelectAll="false" :select2_name="'offer_id'"></select2offer>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class='btn btn-primary' @click.prevent="onComfirm(getParams)">Confirm</span>
                </a>
                <a href="#" class="btn secondary" @click.prevent="hideModal">Cancel</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import select2offer from './Select2Offer.vue'
export default {
    data(){
        return {
        }
    },
    props: ['modalState','hideModal', 'onComfirm'],
    components: {
       select2offer
    },
    computed: {
        getParams() {
            var affs = $(this.$refs.selecOffer).getFormQuery();
            return affs;
        }
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.add_product_offer_dailog).modal(msg)
        },
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        }
    },
    mounted () {
        let that = this
        $(this.$refs.add_product_offer_dailog).on('hidden.bs.modal', function () {
            that.hideModal()
        })
    }
}
</script>