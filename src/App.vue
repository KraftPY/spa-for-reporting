<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions(['GET_REPORTS'])
    },
    created() {
      this.GET_REPORTS();
    }
  }
</script>

<style>
</style>
