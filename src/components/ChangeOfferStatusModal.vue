<template>
<div id="status_reserve_dialog" class="modal  fade" ref="modal">
    <div class="modal-dialog"><div class="modal-content">
    <div class="modal-header"> 
        <a class="close" @click.prevent="hideModal" >×</a>
        <h3>Change Offer Status</h3>
    </div>
    <div class="modal-body">
        <p style="display:none;text-align:left;padding-left:25px" class="red"><span id="affs_count"></span> affiliates have traffic on this offer</p>
        <form class="form-horizontal"  @submit="submitForm">
            <div class="control-group form-group">
                <label class="control-label col-md-4">Status</label>
                <div class="controls col-md-8">
                    <select name="status" v-model="status">
                        <option value="0" selected="">- Status -</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="paused">Paused</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </div>
            </div>

            <div class="control-group form-group">
                <label class="control-label col-md-4">Effective Time (in GMT)</label>
                <div class="controls col-md-8">
                    <select name="method" v-model="method">
                        <option value="now+" selected="">Now</option>
                        <option value="later+12">After 12 hours</option>
                        <option value="later+24">After 24 hours</option>
                        <option value="later+48">After 48 hours</option>
                        <option value="custom">Customized time</option>
                    </select>
                </div>
            </div>

            <div id="customized_time_status" v-show="method==='custom'">
                <hr>
                <div class="control-group form-group">
                    <label class="control-label col-md-4">Date</label>
                    <div class="controls col-md-8">
                        <dateTimePicker  :startDate="startDate" ></dateTimePicker>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-4">Time</label>
                    <div class="controls col-md-8">
                        <select class="time">
                            <option value="00:00">00:00</option><option value="01:00">01:00</option><option value="02:00">02:00</option><option value="03:00">03:00</option><option value="04:00">04:00</option><option value="05:00">05:00</option><option value="06:00">06:00</option><option value="07:00">07:00</option><option value="08:00">08:00</option><option value="09:00">09:00</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="12:00">12:00</option><option value="13:00">13:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option><option value="23:00">23:00</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer"> 
        <a href="#" class="btn btn-primary" :class="status === '0' ? 'disabled':''"  data-dismiss="modal"  @click.prevent="submitForm">Confirm &amp; Send Email</a>
        <a href="#" class="btn secondary" data-dismiss="modal"  @click.prevent="hideModal">Cancel</a>
    </div>
    </div></div>
</div>
</template>

<script>

import dateTimePicker from './DateTimePicker.vue'
import Vue from "vue"


export default{
    props: {
        modalState:{},
        hideModal:{},
        showAlert:{},
        selected_id:{},
        onSuccess:{},
        param_id:{default:"id"}
    },
    data() {
        return {
            status:"0",
            method:"now+"

        }
    },
    //
    components: {
        dateTimePicker
    },
    computed: {
        startDate(){
            return moment().format("YYYY-MM-DD")
        }
    },
    methods: {
        toggleModal:function(msg) {
            $(this.$refs.modal).modal(msg)
        },
        submitForm: function(){
            console.log(33)
            let that = this;
            console.log(this.status, this.method, $('.datetimePicker input', this.$refs.modal).val(),$('.time', this.$refs.modal).val() )
            let status = this.status,method=this.method,run_time="",_status="", _alert_status="", _alert_status_time="",time=$('.datetimePicker input', this.$refs.modal).val()+ " " + $('.time', this.$refs.modal).val()
            if(this.method !== "custom"){
                method = this.method.split("+")[0]
                run_time = this.method.split("+")[1]
            }else{
                run_time = time
            }

            if(this.method === "now+") {
                _status = status;

            }else{
                _alert_status = status;
                _alert_status_time = this.method === 'custom' ? time : moment().add(run_time, 'hour').utcOffset("+00:00").format("YYYY-MM-DD HH:mm:ss")
            }
            var ids = this.selected_id || this.$route.query.id
            var opts = {status:status, method:method, run_time: run_time}
            opts[this.param_id] = ids
            Vue.http.post('Offer2/setStatus', opts).then(response => {
                that.showAlert(response.body.msg, "success");
                let obj = {}
                if(_status) obj.status = _status;
                obj.alert_status = _alert_status
                obj.alert_status_time = _alert_status_time
                that.$store.dispatch('setOfferInfo', obj)
                that.onSuccess && that.onSuccess()
                that.$nextTick(function(){
                    $("alert_status_time").text()
                })
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



    }
}
</script>