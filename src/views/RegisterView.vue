<template>
  <div id="register">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名" />
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onRegister" />
    <el-button size="medium" @click="onRegister">立即注册</el-button>
    <p class="notice">
      已有账号？
      <router-link to="/login" @click="onRegister">立即登录</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    ...mapActions(['register']),

    onRegister() {
      this.register({
        username: this.username,
        password: this.password,
      }).then(() => {
        this.$router.push({ path: '/' });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/base.scss';

#login,
#register {
  display: grid;
  justify-content: center;
  padding-top: 30px;

  h4 {
    margin: 10px 0 5px;
  }

  p {
    margin: 5px 0;
  }

  input {
    width: 400px;
  }

  .error {
    font-size: 12px;
    color: #f00;
  }

  button {
    margin-top: 10px;
    justify-self: start;
  }

  .notice {
    font-size: 12px;
    color: $textLighterColor;
    text-align: center;
    margin-top: 30px;

    a {
      color: $themeColor;
    }
  }
}
</style>
