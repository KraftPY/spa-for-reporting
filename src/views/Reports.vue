<template>
  <div>
    <div class="filter_blc">
      <label for="filter">Filter by tag: </label>
      <select name="filter" id="filter" v-model="filterValue">
        <option value="" selected></option>
        <option v-for="(t, i) in tagsList" :key="i">{{ t }}</option>
      </select>
    </div>
    <template v-if="filterReports.length">
      <div class="pag_blc">
        <div class="reports_blc" :style="leftCSS">
          <ReportItem 
            v-for="report in filterReports"
            :key="report.id"
            :report="report"
            :events="{ details: clickDetails, save: clickSave}"
          />
        </div>
      </div>
      <Pagination 
        :num="numPages"
        :callback="pagClick" 
        :activeBtn="left * -1"
      />
    </template>
    <template v-else>
      <h1 class="no_reports">no reports</h1>
    </template>
  </div>
</template>

<script>
  import ReportItem from '@/components/ReportItem.vue'
  import Pagination from '@/components/Pagination.vue'
  import { mapGetters, mapMutations, mapState } from 'vuex'
  export default {
    components: {
      ReportItem,
      Pagination,
    },
    data: () => {
      return {
        filterValue: null,
        numPages: null,
        left: 0,
      }
    },
    computed: {
      ...mapState(['arrReports', 'savedArrReports']),
      ...mapGetters(['allTags', 'allSaveTags']),
      tagsList() {
        const list = this.$route.name === 'reports' ? this.allTags : this.allSaveTags
        return list
      },
      filterReports() {
        const tempArr = this.$route.name === 'reports' ? this.arrReports : this.savedArrReports
        if (this.filterValue) {        
          return tempArr.filter( el => el.tags.includes(this.filterValue))
        } else {
          return tempArr
        }
      },
      leftCSS() {
        return { left: `calc(${this.left * 100}%)` }
      },
    },
    methods: {
      ...mapMutations(['SAVE_REPORTS']),
      pagClick(num) {
        switch (true) {
          case num === 'prev' && this.left !== 0:
            this.left++
            break;
          case num === 'next' && this.left !== (this.numPages - 1) * -1:
            this.left--
            break;
          case num > 0:
            this.left = (num - 1) * -1
            break;
        }
      },
      clickDetails(id) {
        const fromSaved = this.$route.path === '/save-reports' ? 'saved' : 'not-saved'
        this.$router.push(`/report-details/${fromSaved}/${id}`)
      },
      clickSave(rep) {
        this.SAVE_REPORTS(rep)
      }
    },
    watch: {
      filterReports(arr) {
        this.numPages = Math.ceil(arr.length/5)
        this.left = 0
      }
    },
    mounted() {
      this.numPages = Math.ceil(this.filterReports.length/5)
    }
  }
</script>

<style scoped>
.filter_blc {
  margin: 2rem 10rem;
}

.pag_blc {
  position: relative;
  width: 90%;
  height: 50rem;
  margin: 4rem auto;
  overflow: hidden;
}

.reports_blc {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  transition: left 1s;
}

.no_reports {
  width: 100%;
  margin-top: 11rem;
  text-align: center;
}
</style>