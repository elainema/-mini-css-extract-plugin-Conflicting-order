<template>
    <!-- Status reserve modal -->
<div id="payout_revenue_reserve_dialog" ref="payout_revenue_reserve_dialog" class="modal fade">
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal">&times;</a>
                 <h3>Change Offer <span></span> {{title}} </h3>
            </div>
            <div class="modal-body text-center">
                <form class="form-horizontal">
            <div class="control-group form-group">
                <label class="control-label col-md-5 label-title"> {{title}} </label>
                <div class="col-md-5">
                    <input class="form-control " type="text" v-model="value">
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-5">Effective Time (in GMT)</label>
                <div class="col-md-5">
                    <select name="method" v-model="method">
                        <option value="-1">Now</option>
                        <option value="12">After 12 hours</option>
                        <option value="24">After 24 hours</option>
                        <option value="48">After 48 hours</option>
                        <option value="customized">Customized time</option>
                    </select>
                </div>
            </div>
            <div id="customized_time_pr" :class="method === 'customized' ? 'show' : 'hide'">
                <hr>
                <div class="control-group form-group">
                    <label class="control-label col-md-5">Date</label>
                    <div class="controls col-md-7">
                        <datepicker class="yeah-dtpicker pull-left" type="text" data-picker-position="bottom-left" readonly="" name="sel_date" v-model="sel_date"></datepicker>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-5">Time</label>
                    <div class="controls col-md-7">
                        <select v-model="sel_hour">
                            <option value="00:00">00:00</option>
                            <option value="01:00">01:00</option>
                            <option value="02:00">02:00</option>
                            <option value="03:00">03:00</option>
                            <option value="04:00">04:00</option>
                            <option value="05:00">05:00</option>
                            <option value="06:00">06:00</option>
                            <option value="07:00">07:00</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="23:00">23:00</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
            </div>
            <div class="modal-footer">
                <a href="#" class='btn btn-primary' @click.prevent="arrSetTask(getParams(),flag)">
                    <span v-if="title=='Payout'">Confirm &amp; Send Email</span>
                    <span v-else>Confirm</span>
                </a>
                <a href="#" class="btn secondary" @click.prevent="hideModal">Cancel</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>

import alert_pop_http from '../util/alert_pop'
import AlertPop from './Alert_pop.vue'
import datepicker from './DateTimePicker.vue'
export default {
    data(){
        return {
            value: "",
            method:"-1",
            sel_date:"",
            sel_hour: this.method === 'custom' ? "00 :00" : '',
            method: '-1',
            alertPop:"hide",
            alertMsg:"",
            alertType:"info",
            flag: false
        }
    },
    props: ['modalState','hideModal','arrSetTask', 'title'],
    components: {
        datepicker,
        AlertPop
    },
    computed: {
        hideAlertPop() {
          this.alertPop = "hide"
        },

    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.payout_revenue_reserve_dialog).modal(msg)
        },
        getParams() {
            var flag = this.checkParams();
            if (flag) {
                var params = {
                    method: this.method.split('+')[0],
                }
                if (this.method == 'customized') {
                    params.run_time = $('.datetimePicker input', this.$refs.payout_revenue_reserve_dialog).val() + ' ' + this.sel_hour
                }
                if (this.title == 'Payout') {
                    params['payout_per_conversion'] = this.value;
                } else {
                    params['revenue_per_conversion'] = this.value;
                }
                return params;
            }
        },
        checkParams () {
            var flag = false;
            var pattern = /^\d+(\.\d+)?$/;
            if (!pattern.test(this.value)) {
                alert_pop_http.setAlertPop(this, "show", "info", 'The value of ' + this.title + ' is illegal, Please check.')
                return false;
            } else {
                flag = true
            }
            if (this.method == 'customized') {
                /*if (moment(this.run_time).isBefore(moment().utc().format('YYYY-MM-DD HH:mm'))) {
                    $('.control-group.form-group', '#customized_time_pr').addClass('error');
                    alert_pop_http.setAlertPop(this, "show", "info", 'The selected time is in the past. Please select a future time.')
                    return false;
                }*/
            }
            this.flag = flag
            return flag
        }
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        }
    },
    mounted () {
        let that = this
        $(this.$refs.payout_revenue_reserve_dialog).on('hidden.bs.modal', function () {
            that.hideModal()
        })
    }
}
</script>