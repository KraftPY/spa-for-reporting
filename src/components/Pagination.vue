<template>
  <div class="main_pagin">
    <div class="prev" @click="callback('prev')">&lt;</div>
    <div 
      v-for="(n, i) in num" 
      :key="i" 
      class="num" 
      @click="callback(n)"
    >
      {{ n }}
    </div>
    <div class="next" @click="callback('next')">&gt;</div>
  </div>
</template>

<script>
  export default {
    props:['num', 'callback', 'activeBtn'],
    data() {
      return {
        numBtnsNode: null,
        prevBtn: null,
        nextBtn: null,
      }
    },
    methods: {
      init() {
        this.numBtnsNode = document.querySelectorAll('.num')
        this.prevBtn = document.querySelector('.prev')
        this.nextBtn = document.querySelector('.next')
        this.numBtnsNode.forEach( el => el.classList.remove('active'))
        this.numBtnsNode[0]?.classList.add('active')
        this.prevBtn.classList.add('disabled')
        this.nextBtn.classList.remove('disabled')
        if (this.num === 1) {
          this.nextBtn.classList.add('disabled')
        }

      }
    },
    watch: {
      activeBtn(val) {
        this.numBtnsNode.forEach( el => el.classList.remove('active'))
        this.numBtnsNode[val].classList.add('active')
        switch (true) {
          case val === 0 && this.num === 1:
            this.prevBtn.classList.add('disabled')
            this.nextBtn.classList.add('disabled')
            break;
          case val === 0 && this.num > 1:
            this.prevBtn.classList.add('disabled')
            this.nextBtn.classList.remove('disabled')
            break;
          case val > 0 && val < this.num - 1:
            this.prevBtn.classList.remove('disabled')
            this.nextBtn.classList.remove('disabled')
            break;
          case val > 0 && val === this.num - 1:
            this.prevBtn.classList.remove('disabled')
            this.nextBtn.classList.add('disabled')
            break;        
        }
      }
    },
    updated() {
      this.init()
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>
.main_pagin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 3rem;
}

.main_pagin div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
  border-radius: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  user-select: none;
}

.active {
  background-color: rgb(184, 184, 184);
}

.disabled {
  color: rgb(209, 209, 209);
  border-color: rgb(209, 209, 209) !important;
}

</style>