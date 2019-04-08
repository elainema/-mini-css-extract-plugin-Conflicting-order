<template>
<div>
    <div id="status_reserve_dialog" class="modal  fade" ref="modal">
        <div class="modal-backdrop fade in" style=""></div>
        <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header">
            <a class="close" @click.prevent="hideModal" >×</a>
            <h3>{{type==='payout' ? 'Change Offer Payout':'Change Offer Revenue'}}</h3>
        </div>
        <div class="modal-body">
            <form class="form-horizontal"  @submit="submitForm">
                <div class="control-group form-group">
                    <label class="control-label col-md-4 label-title">{{type==='payout' ? 'Payout':'Revenue'}}</label>
                    <div class="controls col-md-6" id="static_default_payout" v-if="!isDynamic || (isDynamic && type !=='payout')">
                        <input type="text" class="txt-value" v-model="offer_val" ref="offer_val">
                    </div>
                    <div class="controls col-md-6" id="dynamic_default_payout" v-if="isDynamic && type ==='payout'">
                        <div class="input-append">
                            <input class="form-control txt-value col-md-5" v-model="offer_val" name="payout_per_conversion" type="number" value="0" autofocus="autofocus"> <span class="add-on">% of dynamic revenue</span></div>
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-4">Effective Time (in GMT)</label>
                    <div class="controls col-md-6">
                        <select name="method" v-model="method">
                            <option value="-1" selected="">Now</option>
                            <option value="12">After 12 hours</option>
                            <option value="24">After 24 hours</option>
                            <option value="48">After 48 hours</option>
                            <option value="customized">Customized time</option>
                        </select>
                    </div>
                </div>

                <div id="customized_time_status" v-show="method==='customized'">
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
            <a href="#" class="btn btn-primary" :class="!offer_val ? 'disabled':''" @click.prevent="submitForm">{{type=='payout' ? 'Confirm & Send Email' : 'Confirm'}}</a>
            <a href="#" class="btn secondary" data-dismiss="modal"  @click.prevent="hideModal">Cancel</a>
        </div>
        </div></div>
    </div>

    <winWndModal :modalState="winWndModalState" :hideModal="hideWinWndModal" :formSubmit="hideWinWndModal" :modalBody="modalBody"></winWndModal>
</div>
</template>

<script>

import dateTimePicker from './DateTimePicker.vue'
import winWndModal from './WinWndModal.vue'
import Vue from "vue"


export default{
    props: ['modalState','hideModal','showAlert','type','val','isDynamic', 'default_payout', 'default_revenue', 'offer_hide_conv', 'currency'],
    data() {
        return {
            method:"-1",
            offer_val:"",

            winWndModalState:'hide',
            modalBody:'',

        }
    },
    components: {
        dateTimePicker,winWndModal
    },
    computed: {
        startDate(){
            return moment().format("YYYY-MM-DD")
        },
    },
    methods: {
        hideWinWndModal:function() {
          this.winWndModalState = 'hide'
        },
        toggleModal:function(msg) {
            $(this.$refs.modal).modal(msg)
        },
        checkHideConv() {
            var aff_hide_con = "0%";
            var affs = $("#aff_info .hide_conv");
            $.each(affs, function(i, aff) {
                if ($(aff).text() != "Use Default" || $(aff).text() != "0%") {
                    aff_hide_con = $(aff).text();
                }
            })
            return aff_hide_con;
        },
        comparePayoutRevenue(type) {
            var compare_flag = false;
            var that = this
            var _payoutValue = that.default_payout - 0;
            var _revenueValue = that.default_revenue - 0;
            var _currencyType = that.currency
            var conversion_num = that.offer_hide_conv
            var is_dynamic = that.isDynamic
            var type = type.toLowerCase()
            if (parseFloat(conversion_num) == 0) { //无扣量，不允许payout大于revenue
                if (!is_dynamic) {
                    var _targetValue = that.offer_val - 0;
                    if (type == 'payout') {
                        if (_currencyType == "EUR(€)") {
                            if (_targetValue > _revenueValue * EUR_CURRENCY) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else if (_currencyType == "GBP(￡)") {
                            if (_targetValue > _revenueValue * GBP_CURRENCY) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else {
                            if (_targetValue > _revenueValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        }
                    } else {
                        if (_currencyType == "EUR(€)") {
                            if (_targetValue * EUR_CURRENCY < _payoutValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else if (_currencyType == "GBP(￡)") {
                            if (_targetValue * GBP_CURRENCY < _payoutValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else {
                            if (_targetValue < _payoutValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        }
                    }
                }
            } else { //有扣量，允许payout大于revenue
                compare_flag = true;
            }
            return compare_flag;
        },
        submitForm: function(){
            let that = this;
            var payout_per_conversion = that.default_payout - 0; //default payout
            var dynamic_revenue_value = that.offer_val; //payout
            var revenue_per_conversion = that.default_revenue - 0 ; //default revenue
            var confirmed = false
            var title = that.type
            var change_conversion = that.offer_hide_conv; //offer设定的扣量
            var pattern = /^\d+(\.\d+)?$/;
            var pattern2 = /^[1-9]\d*$/;
            var is_dynamic = that.isDynamic
            //校验输入格式
            if (is_dynamic && title =='payout') {
                if (!pattern.test(revenue_per_conversion) || !pattern2.test(dynamic_revenue_value)) {
                    that.showAlert('The value is illegal, Please check.', 'info')
                    return;
                }
                //不小于0
                if (this.offer_val <= 0) {
                    $(this.$refs.offer_val).focus();
                    that.showAlert('Price must be greater than 0%', 'info')
                    return false;
                }
                //不能大于default revenue
                if (dynamic_revenue_value / 100 * revenue_per_conversion > revenue_per_conversion && change_conversion == 0) {
                    that.winWndModalState = 'show'
                    return false;
                }
            } else {
                if (!pattern.test(payout_per_conversion) || !pattern.test(revenue_per_conversion)) {
                    that.showAlert('The value is illegal, Please check.', 'info')
                    return;
                }
            }


            //compare payout and revenue
            if (!confirmed) {
                if (parseFloat(change_conversion) == 0) { //offer没有设定扣量
                    //当offer没有设定扣量，不论渠道是否有扣量设定，不允许offer的payout大于revenue
                    var tips = 'Offer payout is more than revenue';
                    that.modalBody = tips
                    if (that.comparePayoutRevenue(title)) {
                        that.winWndModalState = 'show'
                        return
                    } else {
                        confirmed = true;
                    }
                } else {
                    confirmed = true;
                }
            }

            if (confirmed) {
                var value = this.offer_val
                if (!pattern.test(value)) {
                    that.showAlert('The value of ' + title + ' is illegal, Please check.', 'info');
                    return false;
                }
                let status = this.status,method=this.method,time=$('.datetimePicker input', this.$refs.modal).val()+ " " + $('.time', this.$refs.modal).val()

                let opt = {id:this.$route.query.id,method:method}

                if (that.type == "payout") {
                    if(that.isDynamic) {
                        opt.dynamic_revenue_value = that.offer_val

                    }else{
                        opt.payout_per_conversion = that.offer_val
                    }
                } else {
                    opt.revenue_per_conversion = that.offer_val
                }

                if (method === 'customized') {
                    opt.run_time = time
                }
                Vue.http.post('Offer2/setTask', opt).then(response => {
                    that.showAlert(response.body.msg, "success");
                    let obj = {}
                    if(opt.payout_per_conversion) obj.payout_per_conversion = parseFloat(opt.payout_per_conversion).toFixed(3);
                    if(opt.dynamic_revenue_value) obj.dynamic_revenue_value = opt.dynamic_revenue_value
                    if(opt.revenue_per_conversion) {
                        obj.revenue_per_conversion = parseFloat(opt.revenue_per_conversion).toFixed(3);
                        if(method !== "-1"){
                            obj.alert_revenue = obj.revenue_per_conversion
                            obj.alert_revenue_time = that.method === 'customized' ? time : moment().add(method, 'hour').utcOffset("+00:00").format("YYYY-MM-DD HH:00:00")
                        } else {
                            obj.alert_revenue = "";
                            obj.alert_revenue_time = ""
                        }
                    }

                    that.$store.dispatch('setOfferInfo', obj)
                    that.$nextTick(function(){
                    })

                }, response => {
                    that.showAlert(response.body.msg);
                })
                this.hideModal()
            }
        }
    },
    watch: {
        val(){
            this.offer_val = this.val
        },
        modalState: function (val) {
          this.toggleModal(val)
        }
    },
    mounted () {
        let that = this;
        $(this.$refs.modal).on('hidden.bs.modal', function () {
            that.hideModal()
        })
        $(this.$refs.modal).on('shown.bs.modal', function () {
            that.offer_val = that.val
        })

    }
}
</script>