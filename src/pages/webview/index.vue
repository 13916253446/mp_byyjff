<template>
  <div>
    <web-view :src="src"></web-view>
  </div>
</template>

<script>
export default {
  name: 'WebView',
  data () {
    return {
      src: ''
    }
  },
  mounted () {
    this.src = this.$root.$mp.query.src || ''
  }
}
</script>

