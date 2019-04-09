<template>
  <div class="uu-hader">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'UuHeader',
  data () {
    return {
      text: 'this is header'
    }
  }
}
</script>

<style lang="scss" scoped>
$testColor: red;
.uu-header{
  color: $testColor;
}
</style>
