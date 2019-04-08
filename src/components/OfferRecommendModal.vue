<template>
    <!-- Status reserve modal -->
<div id="recommend_dailog" ref="recommend_dailog" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal">&times;</a>
                <h3>Recommend Reason</h3>
            </div>
            <div class="modal-body text-center">
                <textarea class="text_area" id="recommendInfo" v-model="recommend_info"></textarea>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-primary" @click.prevent="setBatchRecommendOffer(getParams)">Confirm</a>
                <a href="#" class="btn secondary" @click.prevent="hideModal">Cancel</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import datepicker from './DateTimePicker.vue'
export default {
    data(){
        return {
            recommend_info: ''
        }
    },
    props: ['modalState','hideModal','setBatchRecommendOffer'],
    components: {
        datepicker
    },
    computed: {
        getParams() {
            var params = {
                recommend_info: this.recommend_info,
            }
            return params;
        }
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.recommend_dailog).modal(msg)
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