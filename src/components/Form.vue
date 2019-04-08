<template>
<form class="form-horizontal frm-entity frm-detail form-report" ref="form" @submit.prevent="submitForm" id="qf_offer">
    <!-- <div class="box-sub-header">
                <h3>Options</h3>
                <div class="box-action">
                    <i class="icon-chevron-up" title="Fold"></i>
                    <i class="icon-chevron-down hide" title="Unfold"></i>
                </div>
            </div> -->
    <div class="box-sub-header">
        <h3>Basic Options</h3>
        <div class="box-action"><span class="icon-chevron-up" title="Fold"></span> <span class="icon-chevron-down hide" title="Unfold"></span></div>
    </div>
    <div class="box-content">
        <div class="form-group">
            <label class="control-label col-md-2 col-xs-6" for="">Offer Information</label>
            <div class="col-md-10 col-xs-6" id="data_chk_box"><span class="hide1" id="am_user"><label class="checkbox-inline"><input type="checkbox" data-name="affiliate_id"> Affiliate</label><label class="checkbox-inline"><input type="checkbox" data-name="affiliate_manager_id"> PM</label></span> <span class="hide1" id="bd_user"><label class="checkbox-inline"><input type="checkbox" data-name="advertiser_id"> Advertiser</label><label class="checkbox-inline"><input type="checkbox" data-name="advertiser_manager_id"> AM</label></span> <span class="" id="am_team"><label class="checkbox-inline"><input type="checkbox" value="" name="filters[am_team]" data-name="am_team">PM Team</label></span> <span class="" id="bd_team"><label class="checkbox-inline"><input type="checkbox" value="" name="filters[bd_team]" data-name="bd_team">AM Team</label></span>
                <label class="checkbox-inline">
                    <input type="checkbox" name="filters[cpa]" data-name="filters[cpa]" value="1" :disabled="individual_offer ? 'disabled' : false "  :checked="individual_offer? false : false"> CPA</label>
                <label class="checkbox-inline">
                    <input type="checkbox" name="filters[rpa]" data-name="filters[rpa]" value="1" :disabled="individual_offer ? 'disabled' : false "  :checked="individual_offer? false : false"> RPA</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="filters[publisher_app_id]" data-name="publisher_app_id">Publisher App</label>
            </div>
        </div>
        <div class="form-group" id="tracking_source">
            <label class="control-label col-md-2 col-xs-6" for="">Tracking Source</label>
            <div class="col-md-10 col-xs-6" id="">
                <label class="checkbox-inline">
                    <input type="checkbox" value="individual_offer" data-name="individual_offer" v-model="individual_offer"> Individual Offer (on checked, the CPA RPA will disabled and unchecked)</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="sl_normal" data-name="sl_normal"> Smart Link (Normal Traffic)</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="sl_utr" data-name="sl_utr"> Smart Link (Unqualified Traffic Recycled)</label>
                <input type="hidden" data-name="filters[traffic_source]" value="" name="">
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-2 col-xs-6" for="">Tracking Statistics</label>
            <div class="col-md-10 col-xs-6" id="stat_chk_box">
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="statistic[click]" data-name="statistic[click]"> Gross Clicks</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="statistic[unique_click]" data-name="statistic[unique_click]"> Unique Clicks</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="statistic[conversion]" data-name="statistic[conversion]"> Conversion</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="statistic[cost]" data-name="statistic[cost]"> Cost</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="statistic[revenue]" data-name="statistic[revenue]"> Revenue</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="statistic[profit]" data-name="statistic[profit]"> Profit</label>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-2 col-xs-6" for="">Data Calculations</label>
            <div class="col-md-10 col-xs-6" id="calcus_chk_box">
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="calcus[cr]" data-name="calcus[cr]"> CR(Gross)</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="calcus[cpc]" data-name="calcus[cpc]"> CPC</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="calcus[rpc]" data-name="calcus[rpc]"> RPC</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="calcus[acpa]" data-name="calcus[acpa]"> aCPA</label>
                <label class="checkbox-inline">
                    <input type="checkbox" value="" name="calcus[arpa]" data-name="calcus[arpa]"> aRPA</label>
            </div>
        </div>
    </div>
    <div class="form-actions">
        <div class="form-group">
            <div class="col-md-10 col-xs-6 col-md-offset-2">
                <button type="submit" class="btn btn-primary" id="RunReportBtn">Run Report</button> <a href="report.html" class="btn btn-default" id="resetPage">Reset</a>
                <!-- <input type="text" name="title" class="col-md-2" id="title" />
                    <button type="button" class="btn" id="save_my_report">Save Report</button> -->
                <button type="button" class="btn btn-default pull-right" id="export_report"><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button>
            </div>
        </div>
    </div>
</form>

</template>
<style>

</style>
<script>
export default {
  data (){
    return {
        individual_offer:""
    }
  },
  props: [],
  methods: {
    submitForm (e) {
        console.table($(this.$refs.form).serializeArray())
    }
  }
}
</script>