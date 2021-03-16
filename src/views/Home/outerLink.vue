<template lang="html">
  <el-dialog
    :title="title"
    :visible.sync="showIframe"
    :width="width"
    class="outer-link"
    ref="elDialog"
    @close="Close">
    <div>
      <iframe
        id="childiframe"
        :src="iframeSrc"
        :style="{height: height,width: '100%'}"
        scrolling="auto"
        frameborder="0">00000</iframe>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'OuterLink',
  props: {
    OuterLinkShow: {
      type: Boolean,
      require: true,
      default: false
    },
    OuterLinkData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      showIframe: false,
      iframeSrc: '',
      title: '',
      width: '',
      height: '',
    }
  },
  watch: {
    OuterLinkShow(k){
      if(k){
        this.showIframe = true
        this.init()
      }
    }
  },
  methods: {
    init() {
      this.title = this.OuterLinkData.title
      this.iframeSrc = window.location.origin + this.OuterLinkData.url
      this.width = this.OuterLinkData.width
      this.height = this.OuterLinkData.height

      this.$refs.elDialog.$el.childNodes[0].style.height = (parseInt(this.height) + 78) + 'px'
    },
    Close() {
      this.showIframe = false
      this.$emit('CloseOuterLink',false)
    }
  }
}
</script>

<style lang="css" scoped>
.outer-link >>> .el-dialog{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto !important;
}
</style>
