<template>
  <div class="register">
          <van-form class="register-form" @submit="onSubmit">
          <van-field placeholder="昵称 " label="昵称:" v-model="user_name" :rules="[{required: true,message:'昵称不能为空'}]"></van-field>
          <van-field placeholder="手机号" label="手机号:" v-model="user_phone" 
                     :rules="[{required:true,message:'手机号不能为空'},{pattern,message:'请输入正确的手机号'}]" name="pattern">      
         </van-field>
         <van-button ref="btnCap" type="info" size="mini" native-type="button" round class="btn-captcha" :disabled="this.btn_captcha" @click="sendCaptcha">
              发送验证码
        </van-button>
          <van-field type="password" placeholder="密码" label="密码:"  v-model="user_password" 
          :rules="[{required: true,message:'密码不能为空'}]"> </van-field>
          <van-field placeholder="验证码" label="验证码:" v-model="user_captcha" 
          :rules="[{required: true,message:'验证码不能为空'}]" > </van-field>
          <van-button type="danger" round size="large" class="btn-register" native-type="submit">
                注册
          </van-button>
      </van-form>
  </div>
</template>

<script>
import {reqSendCaptcha,reqCheckCaptcha,reqRegister} from '@/api'
import {Toast} from 'vant'
import Vue from 'vue'
Vue.use(Toast)
export default {
  data(){
      return{
          user_name:"",
          user_phone:'',
          user_password:'',
          user_captcha:'',
          pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
          time:60,
      }
  },
  computed:{
      btn_captcha(){
          return this.user_phone?false:true
      },
    //  disabled_captcha(){
    //     return this.user_captcha?false:true
    // }
  },
  methods:{
      //发送验证码
     async sendCaptcha(){
        let params = {
            phone:this.user_phone  
         }
         let res = await reqSendCaptcha(params);
         console.log(res);
         if(res.data.code == 200){
            var timer = setInterval(()=>{
                this.time--;
                this.$refs.btnCap.innerText = `验证码${this.time}后发送`
                this.btn_captcha = false
                if(this.time==0){
                    this.btn_captcha =true
                    this.$refs.btnCap.innerText = '发送验证码'
                    clearInterval(timer)
                }
        },1000)
         }else{
             Toast.fail('获取验证码失败');
         }
      },
     async onSubmit(){
          //进行验证码的校对
          let params = {
              phone:this.user_phone,
              captcha:this.user_captcha,
          }
         let res  = await reqCheckCaptcha(params);
         console.log('获取验证码数据');
         console.log(res);
         if(res.data.code == 200){
             //进行注册
             this.phoneRegister()
         }else{
             Toast.fail('验证码错误')
         }
      },
      //手机号注册
      async phoneRegister(){
          let params = {
              phone:this.user_phone,
              password:this.user_password,
              captcha:this.user_captcha,
              nickname:this.user_name,
          }
          let res  = await reqRegister(params)
          console.log("注册成功",res);
          if(res.data.code == 200){
              Toast.success("注册成功");
              this.$router.path = '/login'
          }else{
              Toast.fail("注册失败");
          }
      }
  },
  created(){
      console.log(this.$router);
  }

}
</script>

<style lang="scss">
@import './register.scss'
</style>