<template>
  <div>
    <uu-header />
    <p>{{ text }}</p>
    <uu-footer />
  </div>
</template>

<script>
import UuHeader from './components/header/header.vue'
import UuFooter from './components/footer/footer.jsx'
export default {
  components: {
    UuHeader,
    UuFooter
  },
  data () {
    return {
      text: 'hello world!'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
