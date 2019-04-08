<template>
  <div style="height: 100%">
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'Echarts',
    props: {
      viewOpt: [Object],
      modelOpt: [Object],
      renderer: {
        type: String,
        default: 'canvas'
      }
    },

    data() {
      return {
        chart: {}
      }
    },

    watch: {
      modelOpt(val) {
        if(val) {
          this.setModelOpt()
        }
      }
    },

    computed: {
    },

    methods: {
      init() {
        this.chart = echarts.init(this.$el, null, {renderer: this.renderer})
        this.chart.showLoading()

        if(this.modelOpt) {
          this.setModelOpt()
        }
      },

      setOption(opt) {
        if(!opt) {
          return 
        }
        this.chart.setOption(opt)
      },

      setModelOpt() {
        this.setOption(this.modelOpt)
        this.chart.hideLoading()
      },
      bindEvent(event,type,callback) {
        this.chart.on(event, type,function(obj){
          callback && callback(obj)
        })
      }
    },

    mounted() {
      this.init()
      this.setOption(this.viewOpt)
    },
    registerMap (mapName, geoJSON, specialAreas) {
      echarts.registerMap(mapName, geoJSON, specialAreas)
    },
    registerTheme (name, theme) {
      echarts.registerTheme(name, theme)
    },
    destroyed() {
      
    }
  }
</script>
