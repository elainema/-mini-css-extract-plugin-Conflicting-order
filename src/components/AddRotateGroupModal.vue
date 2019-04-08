<template>
    <div id="status_reserve_dialog" class="modal  fade" ref="modal">
        <div class="modal-dialog"><div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal" >×</a>
                <h3>Add Offer To Rotate Group</h3>
            </div>
            <div class="modal-body">
                <p style="display:none;text-align:left;padding-left:25px" class="red"><span id="affs_count"></span> affiliates have traffic on this offer</p>
                <form class="form-horizontal"  @submit="submitForm">
                    <div class="control-group form-group">
                        <label class="control-label col-md-4">Group</label>
                        <div class="controls col-md-8">
                            <select name="group_id" v-model="status">
                                <option value="0" selected="">-All Group -</option>
                                <option v-for="n in groupChosen" :value="n.id">{{ n.name }}</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn btn-primary" :class="status === '0' ? 'disabled':''"  data-dismiss="modal"  @click.prevent="submitForm">Confirm</a>
                <a href="#" class="btn secondary" data-dismiss="modal"  @click.prevent="hideModal">Cancel</a>
            </div>
        </div></div>
    </div>
</template>

<script>

    import Vue from "vue"
    import commonDataAPI from '../api/commonData'

    export default{
        props: {
            modalState:{},
            hideModal:{},
            showAlert:{},
            selected_id:{},
            onSuccess:{}
        },
        data() {
            return {
                status:"0",
                groupChosen:[]
            }
        },
        //
        components: {},
        methods: {
            toggleModal:function(msg) {
                $(this.$refs.modal).modal(msg)
            },
            submitForm: function(){
                let that = this;
                var ids = this.selected_id || this.$route.query.id
                var opts = {
                    'offer_ids': ids,
                    'group_id': $("select[name=group_id]").val()
                }
                Vue.http.post('Offer2/addOffersToGroup', opts).then(response => {
                    that.showAlert(response.body.msg, "success");
                    that.onSuccess && that.onSuccess()
                }, response => {
                    that.showAlert(response.body.msg);
                })
                this.hideModal()
            }
        },
        watch: {
            modalState: function (val) {
                this.toggleModal(val)
            }
        },
        mounted () {
            let that = this;
            $(this.$refs.modal).on('hidden.bs.modal', function () {
                that.hideModal()
            })
            commonDataAPI.getRotateGroup(function(data) {
                that.groupChosen = data;
            })


        }
    }
</script>