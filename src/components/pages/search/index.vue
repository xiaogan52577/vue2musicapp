<template>
  <div class="search">
      <van-nav-bar left-arrow @click-left="onClickLeft">
          <template #title>
              <van-search placeholder="请输入搜索关键词"  v-model="search_keywords" @keydown.enter="enterKey"></van-search>
          </template>
      </van-nav-bar>
      <div>
          <span class="history">搜索历史：</span>
      </div>
      <div class="history-content">
          <span v-for="(item,index) in search_history" :key="index">
              {{item}}
          </span>
      </div>
      <div class="songs-list" v-for="(item,index) in search_lists" :key="index">
           <div class="songs-left">
               <span class="songs-index">{{index+1}}</span>
               <span class="songs-name">
                    <strong>{{item.name}}</strong>
                    <!-- <br>
                   <span>{{item.ar[0].name}}</span>  -->
               </span>
           </div>
      </div>
  </div>
</template>

<script>
import {reqSearchMusic} from '@/api'
import { Toast } from 'vant';
export default {
    data(){
        return{
            search_keywords:'',
            search_history:[],//搜索历史 
            search_lists:[],
        }
    },
    methods:{
        async getSearchMusic(data){
            let res = await reqSearchMusic(data);
            console.log('获取搜索歌曲',res);
            if(res.data.code == 200){
                this.search_lists = res.data.result.songs;
                console.log(this.search_lists);
            }else{
                Toast.fail('获取数据失败')
            }
        },
        enterKey(){
            this.getSearchMusic(this.search_keywords);
           if(this.search_keywords!==''){
               if(this.search_history.length>6){
                    this.search_history.splice(this.search_history.length-1,1);
                }
                this.search_history.unshift(this.search_keywords)
                //去除重复的元素
                this.search_history = [...new Set(this.search_history)]
           }


        },
        onClickLeft(){
            this.$router.go(-1);
        }
    },
}
</script>

<style lang="scss">
@import './search.scss';
</style>