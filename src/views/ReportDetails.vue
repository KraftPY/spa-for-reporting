<template>
  <div class="main_details">
    <table class="details_tab">
      <tbody>
        <tr>
          <td>ID:</td>
          <td>{{ report.id }}</td>
        </tr>
        <tr>
          <td>Title:</td>
          <td>{{ report.title }}</td>
        </tr>
        <tr>
          <td>Tags:</td>
          <td>{{ report.tags.reduce((a, b) => `${a}, ${b}`) }}</td>
        </tr>
        <tr>
          <td>Description:</td>
          <td>{{ report.description }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="$router.go(-1)">Close</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data: () => {
      return {
        report: null
      }
    },
    computed: {
      ...mapGetters(['getReport','getSavedReport'])
    },
    beforeMount() {
      const id = Number(this.$route.params.id)
      const isSaved = this.$route.params.saved
      if (isSaved === 'saved') {
        this.report = this.getSavedReport(id)
      } else {
        this.report = this.getReport(id)
      }
      
    }
  }
</script>

<style scoped>
.main_details {
  width: 50%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main_details button {
  width: 10rem;
  padding: 0.5rem 2rem;
  margin-top: 5rem;
}

.details_tab {
  border-spacing: 1rem;
}

.details_tab td {
  vertical-align: text-top;
  text-align: justify;
}

.details_tab td:first-child {
  width: 11rem;
  font-weight: 600;
}
</style>