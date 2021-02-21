<template>
  <div class="main_form">
    <div>
      <label for="title">Title: </label>
      <input :class="isValidTitle ? '' : 'no_valid'" type="text" id="title" v-model="report.title">
    </div>
    <div>
      <label for="tags">Tags: </label>
      <input :class="isValidTags ? '' : 'no_valid'" type="text" id="tags" v-model="report.tags">
    </div>
    <div>
      <label for="desc">Description: </label>
      <textarea :class="isValidDesc ? '' : 'no_valid'" type="text" id="desc" v-model="report.desc"></textarea>
    </div>
    <button class="btn_create" @click="clickCreate">Create</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data: () => {
      return {
        report:{
          title: null,
          tags: null,
          desc: null,
        },
        isValidTitle: true,
        isValidTags: true,
        isValidDesc: true,
      }
    },
    methods: {
      ...mapMutations(['CREATE_REPORT']),
      clickCreate () {
        if (this.report.title && this.report.tags && this.report.desc) {
          this.CREATE_REPORT(this.report)
          this.$router.push('/save-reports')
        } else {
          this.isValidTitle = this.report.title ? true : false
          this.isValidTags = this.report.tags ? true : false
          this.isValidDesc = this.report.desc ? true : false
        }
      }
    }

  }
</script>

<style scoped>
.main_form {
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main_form div {
  display: flex;
  margin-bottom: 1rem;
}

.main_form div label {
  display:inline-block;
  width: 11rem;
  font-weight: 600;
}

.main_form div input {
  width: 30rem;
}

.main_form div textarea {
  width: 30rem;
  min-height: 20rem;
  resize: vertical;
}

.main_form button {
  width: 10rem;
  padding: 0.5rem 2rem;
  margin-top: 5rem;
}

.no_valid {
  border: 1px solid red;
}
</style>