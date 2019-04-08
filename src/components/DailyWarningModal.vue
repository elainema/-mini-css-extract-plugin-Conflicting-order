<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>Detail</h3>
            </div>
            <div class="modal-body ">
                <div id="detail_aff" class="detail_aff">
                    <p class="detail_aff"><span>ID : {{affInfo.id}}</span><span>Affiliate : {{affInfo.first_name}} {{affInfo.last_name}} </span><span class="ml15">Company : {{affInfo.company_name}}</span><span>Status : {{affInfo.status}}</span></p>
                    <p class="detail_aff"><span>Email : {{affInfo.email_send_address}}</span> <span class="ml15">Phone : <span v-if="affInfo.phone">{{affInfo.phone}}</span><span v-else class="empty">(empty)</span></span>
                    </p>
                    <p class="table_desc mt20">Top 10 offers with high revenue raise.</p>
                </div>
                <div id="detail_aff" class="detail_aff">

                </div>
                <div class="overflow_scroll">
                  <table class="table table-hover  tablesorter" id="">
                      <colgroup>
                          <!-- <col width="25" /> -->
                          <col width="80" />
                          <col width="280" />
                          <col width="80" />
                          <col width="100" />
                          <col width="100" />
                          <col width="80" />
                          <col width="80" />
                      </colgroup>
                      <thead>
                          <tr>
                              <!-- <th class="tl-left"><input type="checkbox" id="check_all" /></th> -->
                              <th class="tl-left">Offer ID</th>
                              <th class="tl-left">Offer</th>
                              <th class="tl-left">Status</th>
                              <th class="tl-left">Revenue</th>
                              <th class="tl-left">CR</th>
                              <th class="tl-left">Click</th>
                              <th class="tl-left">Conversion</th>
                          </tr>
                      </thead>
                      <tbody id="offer_list">
                      <tr v-for="item in offerAnalysisInfo">
                        <td>{{item.offer_id}}</td>
                        <td>{{item.offer}}</td>
                        <td>{{item.status}}</td>
                        <td>{{item.revenue}}/{{item.revenue_range}}</td>
                        <td>{{item.cr}}/{{item.cr_range}}</td>
                        <td>{{item.click}}/{{item.click_range}}</td>
                        <td>{{item.conversion}}/{{item.conversion_range}}</td>
                      </tr>
                      </tbody>
                  </table>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>

export default {
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    offerAnalysisInfo:{},
    affInfo:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
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

  }
}
</script>
<style>
  .empty {
    color: #999;
  }
</style>