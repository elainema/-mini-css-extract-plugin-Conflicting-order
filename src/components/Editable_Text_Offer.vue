<template>
    <div ref="editable_zone">
      <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm" :editable_modal_body="editable_modal_body" :editable_modal_title="editable_modal_title" :editable_confirm_btn="editable_confirm_btn" :id="offer_name"></confirmModal>
      <a href="#" ref="editable" :id="editable_id" :offer_data="offer_data" :data-mode="editable_mode" :data-savenochange="savenochange" :data-inputclass="offer_class" :data-value="offer_val"   :data-name="offer_name" data-control-name="bt-select" data-type="text" :class="'hide-normal ' + classList"></a>
    </div>
</template>
<script>
import Vue from "vue"
import confirmModal  from "./ConfirmModal.vue"
let $multipleInputRowRef
export default {
  data(){
    return {
      modalState:"hide",
      multiple_input_items:[],
      has_error:'',
    }
  },
  props: {
    source:{},
    "showAlert":{},
    is_multl_input:{},
    offer_val:{},
    editable_disable:{default:false},
    renderOffer:{default:false},
    dynamic_render:{},
    offer_name:{},
    onShown:{},
    offer_data:{},
    getCustomParam:{},
    onSelectChange:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
    select2_multiple:{default:false},
    displayOpt:{},
    offer_class:{},
    onSuccess:{},
    onRenderAfter:{},
    editable_id:{},
    emptytext:{default:"Empty"},
    offer_api:{default:'Offer2/edit'},
    editable_modal_body:{},
    editable_modal_title:{},
    editable_confirm_btn:{},
    action_type:{default:"post"},
    query_id:{},
    showConfirmModal:{default:true},
    validate:{default:$.noop},
    confirmValidate:{default:$.noop},
    classList:{default:''},

  },
  computed: {
    data_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    }
  },
  components: {confirmModal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function() {
      if (this.confirmValidate) {
        let new_val = $(this.$refs.editable_zone).find(".editable-input input").val()
        let tag = this.confirmValidate && this.confirmValidate(new_val,$(this.$refs.editable_zone))
        if (tag) $(this.$refs.editable_zone).find(".editableform").submit();
      } else {
        $(this.$refs.editable_zone).find(".editableform").submit();
      }
    },
    renderEditable:function(){
        let that = this
        let id = that.$route.query.id || that.query_id
        let _params = {};

        $(this.$refs.editable).attr('data-value', this.offer_val).show();
        let opt = {
            pk: id,
            emptytext:that.emptytext,
            params: function(params) {
                var new_params = { id: params.pk };
                if(that.getCustomParam) {
                  new_params = that.getCustomParam(params, $(that.$refs.editable_zone))
                  params.value ? (params.value = new_params[params.name]): ''
                }else{
                  new_params[params.name] = params.value;
                }
                _params = new_params
                return new_params;
            },
            validate:that.validate,
            url: function(new_params) {
              if (that.action_type === 'post') {
                return  Vue.http.post(that.offer_api, new_params)
              } else {
                return  Vue.http.get(that.offer_api, {params: new_params})
              }
            },
            success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    let obj = {}
                    obj[that.offer_name] = new_value
                    if(that.offer_api === 'Offer2/edit'){
                      that.$store.dispatch('setOfferInfo', obj)
                    }
                    // if($(this).attr('id') == 'preview_url'){
                    //  $('#btn_preview').attr('href', new_value);
                    // }
                    that.onSuccess && that.onSuccess(new_value, _params)
                    return { newValue: new_value };
                } else {
                    that.showAlert(response.body.msg || 'unknown error');
                    return response.body.msg || 'unknown error';
                }
            },
            error: function(response, newValue) {
                //that.showAlert(response.body.msg || 'unknown error');
                /*if(response.status === 500) {
                    return 'Service unavailable. Please try later.';
                  } else {
                    return response.body.msg;
                  }*/

                  if(response.status === 500) {
                      that.showAlert('Service unavailable. Please try later.');
                  } else {
                    that.showAlert(that.has_error || response.body.msg);
                  }
            }
        }
        if(this.displayOpt) {
          opt.display = function(value, sourceData){
            that.displayOpt(value, sourceData, $(that.$refs.editable))
          }
        }
        $(this.$refs.editable).editable(opt);
        that.onRenderAfter && that.onRenderAfter($(that.$refs.editable), that.offer_val)

        if(that.editable_disable) {
          $(that.$refs.editable).editable('disable')
        } else {
          $(that.$refs.editable).editable('enable')
        }


        $(that.$refs.editable).on("shown", function(){
          if(that.is_multl_input){
            $multipleInputRowRef = $multipleInputRowRef ? $multipleInputRowRef : $("#multipleInputRowRef")
            $multipleInputRowRef.removeClass("hide")
            $(that.$refs.editable_zone).find(".editable-input").empty()
            $(that.$refs.editable_zone).find(".editable-input").html($multipleInputRowRef)
          }
          that.onShown && that.onShown($(that.$refs.editable_zone))
        })
        $(that.$refs.editable).on("hidden", function(){
          that.onRenderAfter && that.onRenderAfter($(that.$refs.editable), that.offer_val)
        })

        $(that.$refs.editable).on("error", function(){
        })
    }
  },
  watch:{
    renderOffer:function(newVal, oldVal){
      if(newVal){
        this.renderEditable()
      }
    },
    offer_val:function(newVal, oldVal) {
      if(newVal){
          this.$nextTick(function() {
            this.renderEditable()
            $(this.$refs.editable).editable("setValue",newVal)

          })
      }
    }
  },
  mounted () {
    let that = this;
    if(this.dynamic_render) {
      this.renderEditable()
    }
    if(this.renderOffer) {
      this.renderEditable()
    }

    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      e.preventDefault()
      if (that.showConfirmModal) {
        that.modalState = "show"
      } else {
        that.onConfirm && that.onConfirm()
      }
    })

  }
}
</script>
<style scoped>
.nowrap{
    white-space: nowrap;
}
</style>
