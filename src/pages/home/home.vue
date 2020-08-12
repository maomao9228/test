<template>
  <div>
主页面
    <div class="box" v-for="(l,i) in list" :key="i">{{l}}</div>
    <button class="btn" @click="btn($event)">点击</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list: [],
        num: 0
      }
    },
    methods: {
      btn(e){
        console.log(e);
        this.num += 1;
        // this.list.push(this.num)
      }
    }
  }
</script>

<style scoped>
.box {
  width: 300px;
  height: 200px;
  background-color: greenyellow;
}

button {
  border: none;
  outline: none;
  background: none;
}

.btn.focus{
  border: none;
}

/* .btn:b */


.btn:hover {
  background: blue;
}
.btn:hover:active {
 background: red;
}
/* .btn:active {
  background: red;
} */
</style>
