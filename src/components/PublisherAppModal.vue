<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal"  data-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>{{publisherAppModalType === 'capProportionEdit' ? 'Allow Cap' : (publisherAppModalType === 'edit' ? 'Edit App' : "Add App")}}</h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal form-report" ref="form">
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">ID</label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="hidden" name="publisher_id" :value="publisher_id">
                                <input type="text" name="id" readonly="readonly" class="col-md-12">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Name
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="name" class="txt-required col-md-12">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Status
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="status">
                                    <option value="active" selected="">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="deleted">Deleted</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Platform
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="platform" @change="onChangePlatform" v-model="platform">
                                    <option value="ios" selected="">IOS</option>
                                    <option value="android">Android</option>
                                    <option value="windows">Windows</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Category
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="category_id" data-name="categoryId">
                                  <option v-for="item in categorList" :value="item.id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Keyword
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="keyword" id="keyword" class=" col-md-12">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Version
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="version" id="version" class=" col-md-12">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Download Url
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="download_url" id="url" class="txt-required url-value col-md-12">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Package Name/Bundle Id
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="pkg_name" data-name="package_name" id="pkg_name" class="txt-required   col-md-12">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Description
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <textarea id="" name="description" class=" col-md-12"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">DAU
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="dau">
                                    <option value="0-1w" selected="">0 - 1w</option>
                                    <option value="1w-10w">1w - 10w</option>
                                    <option value="10w-50w">10w - 50w</option>
                                    <option value="50w-100w">50w - 100w</option>
                                    <option value=">100w"> &gt; 100w</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">LBS Status
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="lbs_status" data-name="acquire_location">
                                    <option value="1" selected="">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Paid App
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="paid_app" data-name="is_charged">
                                    <option value="1" selected="">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Target User Gender
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="target_user_gender" data-name="gender">
                                    <option value="all" selected="">All</option>
                                    <option value="male-oriented">Male oriented</option>
                                    <option value="female-oriented">Female oriented</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="">Target User Age</label>
                        <div class="controls col-md-9" id="calcus_chk_box">
                            <input type="hidden" name="target_user_age" data-name="age">
                            <label class="checkbox-inline">
                                <input type="checkbox" value="0-17" name="" data-name="target_age" @change="onChangeAge"> 0-17
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="18-24" name="" data-name="target_age" @change="onChangeAge"> 18-24
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="25-34" name="" data-name="target_age" @change="onChangeAge"> 25-34
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="35-44" name="" data-name="target_age" @change="onChangeAge"> 35-44
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="45-54" name="" data-name="target_age" @change="onChangeAge"> 45-54
                            </label>
                            <label class="checkbox-inline no-margin">
                                <input type="checkbox" value=">55" name="" data-name="target_age" @change="onChangeAge"> 55 or more
                            </label>
                        </div>
                    </div>
                    <div class="form-group" v-show="publisherAppModalType === 'capProportionEdit' || publisherAppModalType === 'edit'">
                        <label class="control-label col-md-3">Proportion Cap:</label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input class="col-md-6" type="number" name="daily_conversions_percentage" :value="appData.dailyConversionsPercentage"><span>%</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group"  v-show="publisherAppModalType === 'capProportionEdit' || publisherAppModalType === 'edit'">
                        <label class="control-label col-md-3">Uniform Cap:</label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input class="col-md-6 form-control" type="number" name="daily_conversions" :value="appData.dailyConversions">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3">Offer Max Count:</label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input class="col-md-6 form-control txt-required" id="offerMaxCount" type="number" name="offer_max_count" :value="appData.offerMaxCount">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary " @click.prevent="onConfirmBtn">Submit</button>
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import publisherAPI from '../api/publisher'

export default {
  data(){
    return {
      platform:"ios",
      categorList:[]
    }
  },
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    publisher_id:{},
    appData:{},
    publisherAppModalType:{},
    modalState_appCaps:{},
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
      if(msg == 'show'){
          if(this.publisherAppModalType == 'capProportionEdit') {
            $(this.$refs.modal).find(".control-group").hide()
            $(this.$refs.modal).find(".txt-required").removeClass('txt-required')
          } else {
            $(this.$refs.modal).find(".control-group").show()
            $(this.$refs.modal).find("input:visible").addClass('txt-required')
          }
      }
    },
    onConfirmBtn:function(){
        this.onConfirm($(this.$refs.form))
    },
    getCategoryList(){
      let that = this
      publisherAPI.getCategoryList({type:this.platform},function(data){
        that.categorList = data
      })
    },
    onChangePlatform(){
      this.getCategoryList()
    },
    onChangeAge($event){
        let target_user_age = []
        let $target_age = $('[data-name="target_age"]:checked');
        $target_age.each(function(){
            target_user_age.push($(this).val())
        })
        target_user_age = target_user_age.join(",")
        $("[name=target_user_age]").val(target_user_age)
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
        if(that.publisherAppModalType === "edit" || that.publisherAppModalType  === "capProportionEdit") {
            let $form = $(that.$refs.form)
            $.map(that.appData, function(val, key) {
                let $formcontrol = $form.find("[data-name='"+key+"']") 
                if(!$formcontrol.length) {
                    $formcontrol = $form.find("[name='"+key+"']") 
                }
                let tagName = $formcontrol.length && $formcontrol[0].tagName.toLowerCase() || "";
                if(tagName === "input") {
                    if($formcontrol.attr("type") === "checkbox") {
                        $formcontrol.prop("checked",true)
                    } else {
                        $formcontrol.val(val)
                    }
                } else if(tagName === "textarea") {
                    $formcontrol.val(val)

                } else if(tagName === "select") {
                    $formcontrol.find("option[value='"+val+"']").prop("selected",true)

                }
            })

            let age = that.appData.age;
            age = age.split(",")
            $form.find("[data-name=target_age]").each(function(){
                let $this = $(this);
                let val = $this.val()
                if(age.indexOf(val) !== -1) {
                    $this.prop("checked", true)
                } else {
                    $this.prop("checked", false)
                }

            })
        } else if(that.publisherAppModalType === "add") {
            let $control = $(that.$refs.form).find("input,textarea,select").filter(":visible")
            $control.each(function(){
                let $formcontrol = $(this)
                let tagName = $formcontrol.length && $formcontrol[0].tagName.toLowerCase() || "";
                if(tagName === "input") {
                    if($formcontrol.attr("type") === "checkbox") {
                        $formcontrol.prop("checked",false)
                    } else {
                        $formcontrol.val("")
                    }
                } else if(tagName === "textarea") {
                    $formcontrol.val("")

                } else if(tagName === "select") {
                    $formcontrol.find("option:first").prop("selected",true)

                }
            })

        }
    })

    this.getCategoryList()


    }
}
</script>