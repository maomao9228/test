<template>
  <div class="login">
    <div class="login-box">
      <div class="login-username">
        <label for="">用户名</label>
        <input type="text">
      </div>
      <div class="login-username">
        <label for="">密码</label>
        <input type="password">
      </div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    methods: {
      login(){
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>

</style>
