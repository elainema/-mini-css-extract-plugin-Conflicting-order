<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal"  data-backdrop="static">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header"><a class="close" @click.prevent="hideMyModal" data-dismiss="modal">×</a>
            <h3>Preference rules</h3>
            <p class="mt20 break-all">Please create rules of offer preference. System will approve campaigns towards this app automatically depending on the rules</p>
        </div>
        <div class="modal-body ">
            <form class="form-horizontal frm-entity offer_recommended_form preference_rule_form" ref="form" id="offer_recommended_form">
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Platform:
                    </label>
                    <div class="controls col-md-9" id="checkbox_platform">
                        <input type="hidden" name="platforms" v-model="platforms">
                        <input type="hidden" name="app_id" :value="app_id">

                        <label class="checkbox-inline">
                            <input type="checkbox" value="Android"  data-name="platforms" name="" checked="" @change="onChangePlatform">Android
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="iOS" name=""  data-name="platforms" checked="" @change="onChangePlatform">iOS
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Windows Phone"  data-name="platforms" name="" checked="" @change="onChangePlatform">Windows Phone
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Other" name="" data-name="platforms" checked="" @change="onChangePlatform">Other
                        </label>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Type:
                    </label>
                    <div class="controls col-md-9" id="checkbox_type">
                        <input type="hidden" name="type" v-model="type">
                        <label class="checkbox-inline">
                            <input type="checkbox" value="store_app" name=""   data-name="type" checked="" @change="onChangeType">Store APP
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="online_ddl" name=""   data-name="type" @change="onChangeType">Online DDL
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="mobile_content" name=""   data-name="type" @change="onChangeType">Mobile Content
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="other" name=""  data-name="type" @change="onChangeType">Other APP
                        </label>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Countries:
                    </label>
                    <div class=" col-md-6">
                        <input type="hidden" name="countries" v-model="countries">

                        <editable_select2_publisher_lite  :source="sourceGeo"  :editable_mode="'inline'" :select2_multiple=true :publisher_val="appRules.countries || 'all' " :savenochange=true :renderEditable="renderEditable" :onSuccess="onCountrySelectSuccess"></editable_select2_publisher_lite>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Allowed&nbsp;adult/sex&nbsp;offer:
                    </label>
                    <div class="controls col-md-9">
                        <label class="radio-inline">
                            <input type="radio" value="1" data-name="adultAllowed" name="adultAllowed">Allowed
                        </label>
                        <label class="radio-inline">
                            <input type="radio" value="0" data-name="adultAllowed" name="adultAllowed">Not Allowd
                        </label>
                        <label class="radio-inline">
                            <input type="radio" value="" data-no-send-when-checked="1" data-name="adultAllowed" name="adultAllowed" >All
                        </label>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Allowed&nbsp;incentive&nbsp;traffic:
                    </label>
                    <div class="controls col-md-9">
                        <label class="radio-inline">
                            <input type="radio" value="1" data-name="incentiveTrafficAllowed"  name="incentiveTrafficAllowed">Allowed
                        </label>
                        <label class="radio-inline">
                            <input type="radio" value="0" data-name="incentiveTrafficAllowed" name="incentiveTrafficAllowed">Not Allowd
                        </label>
                        <label class="radio-inline">
                            <input type="radio" value="" data-no-send-when-checked="1" data-name="incentiveTrafficAllowed" name="incentiveTrafficAllowed" >All
                        </label>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Allowed&nbsp;adult/18+&nbsp;traffic:
                    </label>
                    <div class="controls col-md-9">
                        <label class="radio-inline">
                            <input type="radio" value="1" data-name="adultTrafficAllowed"  name="adultTrafficAllowed">Allowed
                        </label>
                        <label class="radio-inline">
                            <input type="radio" value="0"  data-name="adultTrafficAllowed" name="adultTrafficAllowed">Not Allowd
                        </label>
                        <label class="radio-inline">
                            <input type="radio" value="" data-no-send-when-checked="1" data-name="adultTrafficAllowed" name="adultTrafficAllowed" >All
                        </label>
                    </div>
                </div>
                <div class="control-group form-group control-group-exclude-app">
                    <label class="control-label col-md-3">Exclude&nbsp;APP:
                    </label>
                    <div class="controls col-md-9">
                        <input type="hidden" name="excludedApps" :value="excludedApps.length ? excludedApps.join(',') : []">
                        <select style="" size="5" multiple="multiple" class=" exclude_app mr15" id="exclude_app">
                            <option v-for="item in excludedApps" :value="item" @click="current_exclude_app_selected = item">{{item}}</option>
                        </select>
                        <div class="">
                            <input type="button" class="btn add_app" value="Add" id="add_btn" @click="addExcludeApp" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                            <input type="button" class="btn edit_app" value="Edit" id="edit_btn" @click="editExcludeApp" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                            <input type="button" class="btn delete_app" value="Delete" id="delete_btn" @click="deleteExcludeApp">
                        </div>
                    </div>
                </div>
                <div class="control-group form-group control-group-exclude-adv">
                    <label class="control-label col-md-3">Exclude&nbsp;advertisers:
                    </label>
                    <div class="controls col-md-9">
                        <input type="hidden" name="excludedAdvs"  :value="excludedAdvs.length ? excludedAdvs.join(',') : []">
                        <select style="" size="5" multiple="multiple" class=" mr15 exclude_adv" id="exclude_adv">
                            <option v-for="item in excludedAdvsArr" v-if="item" :value="item.id" @click="current_exclude_adv_selected = item">{{item.id}} {{item.name || 'adv'}}</option>
                        </select>
                        <div class="">
                            <input type="button" class="btn add_adv" value="Add" id="add_btn" @click="addExcludeAdv" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                            <input type="button" class="btn delete_adv" value="Delete" id="delete_btn" @click="deleteExcludeAdv" >
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <input type="submit" class="btn btn-primary submit" value="Submit" @click.prevent="onConfirmBtn"> <a href="javascript:;" class="btn btn-default secondary"  @click.prevent="hideMyModal">Cancel</a></div>
    </div>


    </div>
    <excludeAppModal :modalState="modalState_excludeApp"  :current_exclude_app_selected="current_exclude_app_selected" :hideModal="hideModal_excludeApp"   :excludeAppType="excludeAppType" :onConfirm="onAddExcludeAppConfirm" ></excludeAppModal>

    <addAdvModal :modalState="modalState_addAdv" :advs="enableAdvs" :hideModal="hideModal_addAdv"    :onConfirm="onAddAdvConfirm" ></addAdvModal>


</div>
</template>
<script>
import publisherAPI from '../api/publisher'
import editable_select2_publisher_lite from './Editable_Select2_Publisher_Lite.vue'
import commonDataAPI from '../api/commonData'
import excludeAppModal from "./ExcludeAppModal.vue"
import addAdvModal from "./AddAdvModal.vue"

export default {
  data(){
    return {
      platform:"ios",
      categorList:[],
      sourceGeo:[],
      advs:[],
      enableAdvs:[],
      countries:"",
      excludedAdvsArr:[],
      excludedApps:[],
      excludedAdvs:[],
      renderEditable:false,
      platforms:"",
      type:"",
      excludeAppType:"",
      current_exclude_app_selected:"",
      current_exclude_adv_selected:"",
      modalState_excludeApp:"hide",
      modalState_addAdv:"hide"
    }
  },
  props: {
    modalState:{},
    hideMyModal:{},
    onConfirm:{},
    appRules:{},
    app_id:{},
    showAlert:{}
  },
  components:{editable_select2_publisher_lite, excludeAppModal, addAdvModal},
  methods: {
    toggleModal:function(msg) {
       $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){

        $(this.$refs.form).find("[data-no-send-when-checked=1]").each(function() {
            $(this).attr("name", $(this).is(":checked") ? "" : $(this).attr("name") )
        })

        this.onConfirm($(this.$refs.form))
    },
    convertCountry(data){
        return  (data || "").toLowerCase() === "all" ? '' : data
    },
    onCountrySelectSuccess(data){
        this.countries = this.convertCountry(data)
    },
    hideModal_excludeApp(){
        this.modalState_excludeApp = "hide"
    },
    hideModal_addAdv(){
        this.modalState_addAdv = "hide"
    },
    onAddExcludeAppConfirm(app_name, excludeAppType){
        if(excludeAppType === "edit") {
            let index = this.excludedApps.indexOf(this.current_exclude_app_selected)
            this.excludedApps.splice(index , 1, app_name)
            this.current_exclude_app_selected = app_name
        }else{
            if(this.excludedApps.indexOf(app_name) === -1) {
                this.excludedApps.push(app_name)
            }
        }

    },
    onAddAdvConfirm(adv_id){
        if(this.excludedAdvs.indexOf(adv_id) === -1) {
            let obj = {}

            this.excludedAdvs.push(adv_id)
            this.setExcludedAdvsArr()
        }
    },
    editExcludeApp(){
        this.excludeAppType = "edit"
        this.modalState_excludeApp = "show"

    },
    addExcludeApp(){
        this.excludeAppType = "add"
        this.modalState_excludeApp = "show"
    },
    deleteExcludeApp(){
        let index = this.excludedApps.indexOf(this.current_exclude_app_selected)
         this.excludedApps.splice(index , 1)

    },
    addExcludeAdv(){
        this.modalState_addAdv = "show"
    },
    deleteExcludeAdv(){
        if(!this.current_exclude_adv_selected || !this.current_exclude_adv_selected.id) return
        let index = this.excludedAdvs.indexOf(this.current_exclude_adv_selected.id)
        this.excludedAdvs.splice(index , 1)
        this.setExcludedAdvsArr()

    },
    setExcludedAdvsArr(){
        let _arr = []
        let that = this
        _.each(this.excludedAdvs, function(item){
            let __obj = _.find(that.advs, {id:item})
            _arr.push(__obj)
        })
        this.excludedAdvsArr = _arr;
    },
    onChangeType($event){
        let type = []
        let $type = $('[data-name="type"]:checked');
        if(!$type.length) {
            this.showAlert("type can not empty!")
            $($event.target).prop("checked",true)
            return
        }
        $type.each(function(){
            type.push($(this).val())
        })
        type = type.join(",")
        this.type = type
    },
    onChangePlatform($event){
          let platform = []
          let $platform = $('[data-name="platforms"]:checked');
          if(!$platform.length) {
             this.showAlert("platform can not empty!")
              $($event.target).prop("checked",true)
              return
          }
          $platform.each(function(){
              platform.push($(this).val())
          })
          platform = platform.join(",")
          this.platforms = platform
    }
  },
  computed:{

  },
  watch: {
    modalState: function (val) {
        let that = this
        this.toggleModal(val)
        if(val === "show") {
            that.excludedApps = _.compact((that.appRules.excludedApps || "" ).split(","))
            that.excludedAdvs =  _.compact((that.appRules.excludedAdvs || "" ).split(","))
            that.setExcludedAdvsArr()
        }
    },
    renderEditable: function(val) {
      this.setExcludedAdvsArr()
    }
  },
  mounted () {
    let that = this

    
    
    $(this.$refs.modal).on('shown.bs.modal', function () {
        that.enableAdvs = [];
        that.countries  = that.convertCountry(that.appRules.countries)
        that.platforms = that.appRules.platforms
        that.type = that.appRules.type

        let white_list = that.appRules.white_list ? that.appRules.white_list : []
        let result = _.filter(that.advs,function(o){
            return white_list.indexOf(o.id) == -1
        })
        that.enableAdvs = result;

        $(that.$refs.form).find("[data-no-send-when-checked=1]").each(function() {
            $(this).attr("name",  $(this).attr("data-name"))
        })
        let $form = $(that.$refs.form)
        $.map(that.appRules, function(val, key) {
            let $formcontrol = $form.find("[data-name='"+key+"']") 
            if(!$formcontrol.length) {
                $formcontrol = $form.find("[name='"+key+"']") 
            }
            let tagName = $formcontrol.length && $formcontrol[0].tagName.toLowerCase() || "";
            if(tagName === "input") {
                if($formcontrol.attr("type") === "checkbox") {
                    $formcontrol.each(function(){
                        if(val.indexOf($(this).val()) !== -1) {
                            $(this).prop("checked",true)
                        } else {
                            $(this).prop("checked",false)
                        }
                    })
                } else if($formcontrol.attr("type") === "radio") {
                    $formcontrol.each(function(){
                        if($(this).val() == val+"") {
                            $(this).prop("checked",true)
                        } 
                    })
                } else {
                    $formcontrol.val(val)
                }
            } else if(tagName === "textarea") {
                $formcontrol.val(val)

            } else if(tagName === "select") {
                $formcontrol.find("option[value='"+val+"']").prop("selected",true)

            }
        })


    })

  },
  created () {
    let that = this
    commonDataAPI.getGeos(function(data){
        let source = data.map(function (c_obj) {
            return {id: c_obj.code, text: c_obj.code + ' - ' + c_obj.name};
        })
        source = _.union([{ id: "all", text: "All" }], source)
        that.sourceGeo = source
        that.renderEditable = true
    })

    commonDataAPI.getAdvertisers(function(data){
        that.advs = data
    })
  } 
}
</script>
<style>
.preference_rule_form .control-label.col-md-3 {
    padding-right: 0px;
    padding-top: 2px;
}
</style>