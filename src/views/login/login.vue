<template>
  <div class="login">
    {{ text }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: 'this is login'
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  color: red;
}
</style>
