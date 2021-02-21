<template>
  <div class="main_blc">
    <h2 class="title">{{ report.title }}</h2>
    <h4 class="tags">Tags: {{ report.tags.reduce((a, b) => `${a}, ${b}`) }}</h4>
    <div class="desc">{{ report.description }}</div>
    <div class="btn_blc">
      <button @click="events.details(report.id)">Details</button>
      <button :disabled="$route.path === '/save-reports' ? true : false" @click="events.save(report)">Save</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['report', 'events']
  }
</script>

<style scoped>
.main_blc {
  display: flex;
  flex-direction: column;
  min-width: 18%;
  width: 18%;
  height: 45rem;
  box-shadow: 0 0 1rem 0.1rem rgba(0,0,0,0.5);
  overflow: hidden;
  margin: 1% 1%;
  padding: 1rem 1rem;
  border-radius: 1rem;
}

.title {
  margin: 0;
}

.desc {
  width: 100%;
  height: 30rem;
  overflow: auto;
  text-align: justify;
  padding-right: 1rem;
}

.btn_blc {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 10rem;
}

.btn_blc button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

</style>