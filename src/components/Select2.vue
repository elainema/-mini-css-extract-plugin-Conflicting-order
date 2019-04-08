<template>
<div class="control-group form-group field-required">
    <label class="control-label col-md-2" for="category">Category</label>
    <div class="controls">
      <select data-placeholder="- Categories -" class="select2-offscreen" name="category_ids[]" id="category" ref="select2" multiple="multiple" tabindex="-1">
          <option value="2">Adult/Sexy</option>
          <option value="18">Anti-Virus Subscription</option>
          <option value="48">App Download-Android</option>
          <option value="155">App Download-Game</option>
          <option value="4">App Download-iOS</option>
          <option value="64">CPS</option>
          <option value="6">Dating</option>
          <option value="8">Email/Zip Submit</option>
          <option value="12">Entertainment Subscription</option>
          <option value="187">fix category name</option>
          <option value="50">Gambling</option>
          <option value="30">Health&amp;Beauty</option>
          <option value="32">Incentive</option>
          <option value="154">Offline APK Package/DDL</option>
          <option value="153">Online APK Package/DDL</option>
          <option value="70">PC Download</option>
          <option value="24">Sweepstakes Subscription</option>
          <option value="77">Windows Download</option>
          <option value="151">[YM TECH TEST] 测试Category</option>
      </select>
    </div>
</div>
</template>
<script>

export default {
  props: [],
  computed: {

  },
  methods: {

  },
  mounted () {
    //$('.filter_by', '#filter_by').chosen({width:'120px'});
    $(this.$refs.select2).select2();
  }
}
</script>
