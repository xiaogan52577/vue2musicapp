<template>
  <div class="login">
      <h1>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</h1>
      <img src="@/assets/images/logo.png" />
      <van-form @submit="onSubmit" class="login-form">
          <van-field label="手机号" v-model="userPhone"
          name="pattern" placeholder="请输入手机号"
          :rules="[{required:true,message:'手机号不能为空'},{pattern,message:'手机号输入不正确 '}]">        
          </van-field>
          <van-field label="密码" v-model="userPassword" placeholder="请输入密码" :rules="[{required:true,message:'密码不能为空'}]">
          </van-field>
          <van-button size="large" native-type="submit"> 登录</van-button>
          <van-button size="large" native-type="button" to="/register"> 注册</van-button>
      </van-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            userPhone:'',
            userPassword:'',
            pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
        }
    },
    methods:{
        onSubmit(){
            //验证用户手机号与密码并进行登录
        },
    }
}
</script>

<style lang="scss">
@import './login.scss';
</style>