<template>
<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby=""  data-backdrop="static">

    <div class="modal-dialog"><div class="modal-content">
    <div class="modal-header">
        <a class="close"  @click.prevent="hideModal" >×</a>
        <h4>Manage Slot</h4>
    </div>
    <div class="modal-body overflow_scroll" style="min-height: 350px;">
        <table class="table table-hover tablesorter list-table" id="" >
            <thead>
                <tr>
                    <th>Slot ID</th>
                    <th>Slot Name</th>
                    <th>Status</th>
                    <th>Slot Type</th>
                    <th>Slot Size</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="slotsList">
              <tr v-for="item in slotsList">
                <td><a href="javascript:;" class="slotID editable editable-click" @click="editSlot(item)">{{item.id}}</a></td>
                <td>{{item.name}}</td>
                <td>{{item.status}}</td>
                <td>{{item.type}}</td>
                <td>{{item.width}} * {{item.height}}</td>
                <td><a href="javascript:;" class="delete fa fa-remove" @click="deleteSlot(item.id)"></a></td>

              </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-primary addSlot pull-right mt20" @click="addSlot" id="addSlot" data-target="#add_slot_zone" data-trigger="#manage_slot_zone">Add</button>
    </div>
    </div></div>
    <appSlotEditModal :modalState="modalState_appSlotEdit"  :slotData="currentSlotData" :appData="appData" :appSlotModalType="appSlotModalType" :hideModal="hideModal_appSlotEdit"  :onConfirm="onAppSlotEditConfirm" :appTemplate="appTemplate"> </appSlotEditModal>


</div>
</template>
<script>

import publisherAPI from '../api/publisher'
import appSlotEditModal from './app-slot-edit-modal/'
export default {
  data(){
    return {
        appSlotModalType:"",
        currentSlotData:{status:'active', type:'BANNER'}
    }
  },
  components:{appSlotEditModal},
  props: {
    modalState:{},
    hideModal:{},
    hideModal_appSlotEdit:{},
    showModal_appSlotEdit:{},
    onConfirm:{},
    slotsList:{},
    modalState_appSlotEdit:{},
    onDeleteSlot:{},
    appData:{},
    appTemplate:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    deleteSlot:function(id){
      this.onDeleteSlot(id)
    },

    onAppSlotEditConfirm($form){
      this.onConfirm(this.appSlotModalType, $form)
    },
    addSlot(){
      this.currentSlotData = {status:'active', type:'BANNER'}
      this.appSlotModalType = "add"
      this.showModal_appSlotEdit()
    },
    editSlot(item){
      this.currentSlotData = item
      this.appSlotModalType = "edit"
      this.showModal_appSlotEdit()
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },

  },
  mounted () {
    let that = this

    $(this.$refs.modal).on('shown.bs.modal', function () {

    })
  },
  created () {
    let that = this




  }
}
</script>
<style>
.macro_link{
  color: #08c;
  text-decoration: underline;
}
</style>