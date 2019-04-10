<template>
  <div class="about-wrap">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      text: 'this is about page'
    }
  }
}
</script>

<style lang="scss" scoped>
.about-wrap{
  color: orange;
}
</style>
