<template>
  <div class="home-wrap">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      text: 'this is home page'
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrap{
  color: red;
}
</style>
