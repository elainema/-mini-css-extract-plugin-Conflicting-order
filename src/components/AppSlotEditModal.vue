<template>
<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby="" data-backdrop="static">
  

  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" >×</a>
        <h3>{{ appSlotModalType == 'edit' ? "Edit Slot" : "Add Slot"}}</h3>
      </div>
      <div class="modal-body">
            <form class="form-horizontal form-edit-slot" ref="form">
                <div class="control-group form-group">
                    <label class="control-label col-md-3">App Name</label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <input type="text" data-name="devapp_name" :value="appData.name" readonly=readonly />
                            <input type="hidden" name="devapp_id" :value="appData.id" />
                            <input type="hidden" name="id" :value="slotData.id" />
                        </div>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Name
                        <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <input type="text" name="name" value="" class="txt-required" v-model="slotData.name"/>
                        </div>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Token</label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <input type="text" data-name="token" value="" readonly=readonly  v-model="slotData.token"/>
                        </div>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Status
                        <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <select class=" form-control txt-required" name="status" v-model="slotData.status">
                                <option value="active" selected>Active</option>
                                <option value="paused">Paused</option>
                                <option value="deleted">Deleted</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Type
                        <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <select class=" form-control txt-required" name="type" v-model="slotData.type">
                                <option value="BANNER" selected>BANNER</option>
                                <option value="NATIVE">NATIVE</option>
                                <option value="INTERSTITIAL" data-action='{".control-group-size":"hide","[name=width],[name=height]":"emptyVal"}'>INTERSTITIAL</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="control-group form-group control-group-size " v-if="slotData.type !== 'INTERSTITIAL' ">
                    <label class="control-label col-md-3">Size
                        <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-9">
                        <input type="text" name="width" value="" class="col-md-3 txt-required" v-model="slotData.width"/> X 
                        <input type="text" name="height" value="" class="col-md-3 txt-required" v-model="slotData.height"/>
                    </div>
                </div>
                <div class="control-group form-group control-group-size hide" v-else>
                    <label class="control-label col-md-3">Size
                        <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-9">
                        <input type="text" name="width" value=""/> X 
                        <input type="text" name="height" value="">
                    </div>
                </div>

                <div class="control-group form-group mb10">
                    <label class="control-label col-md-3">Template
                    </label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <select class="  form-control  col-md-9 pull-left mr10" data-name="template" v-model="template" ref="template" @click="onChangeTemplate">
                                <option value="">select a template</option>
                                <option v-for="item in appTemplate" :value="item.id" :data-val="item.name" :data-item="JSON.stringify(item)">{{item.id}} - {{item.name}}</option>
                            </select>
                            <a href="javascript:;" title="" class="btn btn-primary  addSlotTemplate col-md-2" id="" @click="addSlotTemplate">Add</a>
                        </div>
                    </div>
                </div>
                <div class="control-group control-group-template">
                    <label class="control-label col-md-3"></label>
                    <div class="controls col-md-9">
                        <input type="hidden" name="templates[]" v-for="item in templateIds.split(',')" :value="item">
                        <ul ref="templateList">
                          <li v-for="(item,index) in slotTemplate" :data-id="item.id" ><a class="mr20" href="javascript:;" data-toggle="popover" data-placement="top" data-trigger="click" data-html="true" :data-content="getContent(item.content)" data-original-title="" title="">{{item.id}} - {{item.name}}</a> <a href="javascript:;" class="delete fa fa-remove" @click="deleteSlotTemplate(index, $event)"></a></li>
                        </ul>
                    </div>
                </div>
            </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary " @click.prevent="onConfirmBtn">Confirm</button>
        <button class="btn btn-default " @click.prevent="hideModal" >Cancel</button>
      </div>
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</div>
</template>
<script>

export default {
  data(){
    return {
      template:"",
      slotTemplate:[],
      templateIds:"",
      currentTemplate:""
    }
  },
  props: {
    appSlotModalType:{},
    modalState:{},
    hideModal:{},
    onConfirm:{},
    appData:{},
    slotData:{},
    appTemplate:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
      let that = this;
      let arr = []
      $(this.$refs.templateList).find("li").each(function(){
        arr.push($(this).attr("data-id"))
      })
      this.templateIds = arr.join(",")
      this.$nextTick(function(){
        that.onConfirm($(that.$refs.form))
      })
    },
    addSlotTemplate(){
      if(this.currentTemplate) {
        let obj = JSON.parse(this.currentTemplate)
        if(_.findIndex(this.slotTemplate, {id:obj.id}) === -1) {
          this.slotTemplate.push(obj)
        }
      }
    },
    getContent(){

    },
    onChangeTemplate(item){
      this.currentTemplate = $(this.$refs.template).find("option:selected").attr("data-item")
    },
    deleteSlotTemplate(index, $event){
      this.slotTemplate.splice(index, 1)
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },

  },
  computed: {
  },
  mounted () {
    let that = this

    $(this.$refs.modal).on('shown.bs.modal', function () {
        that.slotTemplate = that.slotData.template || []
    })
  }
}
</script>
<style>
.macro_link{
  color: #08c;
  text-decoration: underline;
}
</style>