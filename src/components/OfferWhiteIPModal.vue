<template>
<div id="modal" ref="modal"  class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close" @click.prevent="hideModal" >×</a>
                <h3 id="ip_header">{{ ip_header }}</h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2 col-md-2">Type: </label>
                        <div class="controls">
                            <select id="changeIPType" class="col-md-3 form-control" @change="changeIPType" v-model="iptype">
                                <option value="ip_address" :selected="iptype == 'ip_address' ? true: false">IPv4 Address</option>
                                <option value="ip_range" :selected="iptype == 'ip_range' ? true: false">IP Range</option>
                                <option value="ip_subnet"  :selected="iptype == 'ip_subnet' ? true: false">IP Subnet</option>
                                <option value="ipv6_address" :selected="iptype == 'ipv6_address' ? true: false">IPv6 Address</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div class="row-fluid field-required content_ip" v-show="iptype =='ip_address'" id="content_ip_address" style="margin-top: 15px">
                    <input @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip1 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip0" />.
                    <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip2 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip1" />.
                    <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip3 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip2" />.
                    <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip4 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip3" />
                </div>
                <div class="row-fluid field-required content_ip" v-show="iptype =='ip_range'" id="content_ip_range">
                    <p class="col-md-offset-2">*Example: 192.0.2.0-255</p>
                    <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip1 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip0" />.
                    <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip2 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip1" />.
                    <input  @keyup="inputOnKeyup"  onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip3 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip2" />.
                    <input  @keyup="inputOnKeyup"  onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip4 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip3" />
                    <span class="spliter"> - </span>
                    <input  @keyup="inputOnKeyup"  onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip5 col-md-2 form-control" maxlength="3" data-id="ip_range" type="text" value="" v-model.trim="ip4" />
                </div>
                <div class="row-fluid field-required content_ip" v-show="iptype =='ip_subnet'" id="content_ip_subnet">
                    <p class="col-md-offset-2">*IP address/routing prefix. Example:192.0.2.0/24</p>
                    <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip1 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip0" />.
                    <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip2 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip1" />.
                    <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip3 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip2" />.
                    <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip4 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip3" />
                    <span class="spliter"> / </span>
                    <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip5 col-md-2 form-control" maxlength="3" data-id="ip_subnet" type="text" value="" v-model.trim="ip4" />
                </div>
                <div class="row-fluid field-required content_ip" v-show="iptype =='ipv6_address'" id="content_ipv6_subnet">
                    <p class="col-md-offset-2">Example:2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
                    <input class="ip2 col-md-8 col-md-offset-2 form-control" type="text" value="" v-model.trim="ipv6" />
                </div>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn secondary" id="rebackBtn" @click.prevent="rebackBtn(ippAddr)">Apply</a>
                <a href="#" class="btn secondary" id="rebackCancelBtn" @click.prevent="hideModal" >Cancel</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
let defaultData = {
    iptype: 'ip_address',
    ip_header: "IP Address",
    flag: false,
    editVal:'',
    ip0:'',
    ip1:'',
    ip2:'',
    ip3:'',
    ip4:'',
    ips:[],
    ipv6:''
}
let clone = _.clone(defaultData)
export default{
    props: ['modalState','hideModal', 'rebackBtn', 'selectedVal', 'actionType'],
    data() {
        return  defaultData
    },
    components: {
    },
    computed: {
        ippAddr(){
            var ip_type = this.iptype
            if (ip_type == "ip_address") {
                this.ips = [this.ip0,this.ip1,this.ip2,this.ip3]
            } 
            else if (ip_type == "ipv6_address"){
                this.ips = [this.ipv6]
            }else {
                this.ips = [this.ip0,this.ip1, this.ip2,this.ip3,this.ip4]
            }
            return  {
                ip:this.ips.join('.'),
                ip_type:ip_type
            };
        },
    },
    methods: {
        inputOnKeyup(e) {
            //auto next
           if (e.keyCode == 110) {
                $(e.target).next().focus()
            }
            var iptlen = e.target.value.length;
            var thisResult = e.target.getAttribute('class') && e.target.getAttribute('class').split('ip')[1].slice(0,1);
            var thisFousc = thisResult * 1;
            if (iptlen >= 3 && thisFousc <= 4) {
                $(e.target).next().focus()
            }
        },
        toggleModal:function(msg) {
            $(this.$refs.modal).modal(msg)
        },
        changeIPType(e) {
            var that = this;
            if (e) {
                that.iptype = e.target.value
            }
            if (that.iptype == 'ip_address') {
                that.ip_header = 'IP Address'
            } else if (that.iptype == 'ip_range') {
                that.ip_header = 'IP Range'
            } else if (that.iptype == 'ipv6_address') {
                that.ip_header = 'IPv6 Address'
            } else {
                that.ip_header = 'IP Subnet'
            }
        },
        calcuEditVal  () {
            var that = this;
            var ip_val = "";
            var edit_val = that.selectedVal
            if (edit_val[0].match(/\//i)) {
                that.iptype = "ip_subnet";
            } else if (edit_val[0].match(/-/i)) {
                that.iptype = "ip_range";
            } else if (edit_val[0].match(/:/i)) {
                that.iptype = "ipv6_address";
                that.ipv6 = edit_val[0]
            } else {
                that.iptype = "ip_address";
            }
            var edit_val_arr = edit_val[0].split('.')
            var selected = []
            for (var j = 0; j < edit_val_arr.length; j++) {
                if (edit_val_arr[j].match(/\/|-/i)) {
                    var arr = edit_val_arr[j].split("/");
                    arr = arr.length === 1 ? edit_val_arr[j].split("-") : arr;
                    that.ip3 = arr[0]
                    that.ip4 = arr[1]
                } else {
                    that['ip' + j] = edit_val_arr[j]
                }
            }
            
            this.editVal = selected
        },
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
          if (val == 'show' && this.selectedVal.length != 0) {
                this.calcuEditVal()
          }
        },
        editVal: function(){
            this.changeIPType()
        },
        actionType: function(newVal, oldVal) {
            let that = this
            if(newVal ==="Add") {
                _.map(clone, function(val, key){
                    that[key] = val
                })
            }
        }
    },
    mounted () {
        let that = this;
        $(that.$refs.modal).find('input:visible').attr("required", true)
        $(this.$refs.modal).on('hidden.bs.modal', function () {
            that.hideModal()
        })
    }
}
</script>
<style>
    #recommend_status .modal-body .content_ip{
        display: block;
    }
</style>
