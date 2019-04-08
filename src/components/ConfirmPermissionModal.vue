<template>
    <div id="confirm_permission_modal" ref="confirm_permission_modal"　class="modal fade" data-backdrop="static">
        <div class="modal-backdrop fade in" style=""></div>
        <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"> <a class="close"  @click.prevent="onCancel">&times;</a>
            <h3 class="red">Warning</h3>
        </div>
        <div class="modal-body">
            <h4>Are you sure to make the offer private? </h4>
            <ul>
                <li>Level 1 &amp; 2 affiliates blocked. All application info is removed.</li>
                <li>Level 3 affiliates approved.</li>
                <li>Previous manual adjustment is not affected.</li>
                <li>The change you made results in offer access difference of affiliates.</li>
            </ul>
            <p>We suggest your in-time notification to your affiliates about all these changes.</p>
        </div>

        <div class="modal-footer"> <a href="javascript:;" class="btn secondary"  @click.prevent="onCancel">Cancel</a>
            <a href="javascript:;" class="btn btn-primary btn-danger" @click.prevent="editConfirm">OK</a>
        </div>
        </div></div>
    </div>
</template>
<style scoped="">
.modal h4 {
    font-size: 20px;
}
.modal ul {
    margin: 0;
    padding: 10px 0;
}
.modal ul li {
    font-size: 14px;
    display: table;
    color: #666;
    line-height: 24px;
}
.modal p {
    font-size: 13px;
    margin: 10px 0;
    font-weight: bold;
    color: #333;
}
</style>
<script>
export default {
    props: ['modalState','hideModal', 'editConfirm', 'editCancel'],
    data(){
        return {
        }
    },
    components: {
    },
    computed: {
        // param.is_require_approval = 0
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.confirm_permission_modal).modal(msg)
        },
        onCancel:function(){
            this.hideModal()
            this.editCancel()
        }
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        },
    },
    mounted () {
        let that = this
        $(this.$refs.confirm_permission_modal).on('hidden.bs.modal', function () {
            //that.hideModal()
        })
    }
}
</script>