<template>
  <div class="singers" @scroll="handleScroll(event)">
      <h2 class="list-group-title">热</h2>
      <ul class="singers-list">
          <li v-for="(item,index) in singersLists" :key="index">
              <img :src="item.picUrl">
              <span>{{item.name}}</span>
          </li>
      </ul>
 </div>
</template>

<script>
import {reqGetSingers} from '@/api/index.js'
export default {
    data(){
        return{
            singersLists:[],//获取歌手列表
        }
    },
    computed:{
        clientTop(){
            return document.documentElement.clientTop;
        }
    },
    methods:{
        handleScroll(e){
            console.log('e',e);
        },
       async getSingersList(page){
           let res = await reqGetSingers(page);
           console.log('singersList',res);
           if(res.data.code == 200){
               this.singersLists = res.data.artists;
               console.log(this.singersLists);
           }else{
               return Promise.reject(new Error('fail'))
           }
       }
    },  
    mounted(){
        this.getSingersList(1);
        this.getSingersList(2);
        console.log([document.documentElement]);
        console.log(document.documentElement.clientTop)
    },
    watch:{
        clientTop(newValue){
            console.log('new',newValue);
        }
    }
}
</script>s

<style lang="scss">
.singers{
    width: 100%;
    height: 100%;
    background: #fff;
    padding-bottom: 90px;
    
    .list-group-title{
        height: 20px;
        line-height: 20px;
        padding-left: 12px;
        margin-bottom: 10px;
        font-size: 11px;
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
    }
    .singers-list{
        height: 100%;
        overflow-y:scroll;
        overflow: hidden;
        &::-webkit-scrollbar{
            display: none;
        }
        li{
            padding: 5px 0;
            margin: 0 5px;
            border-bottom: 1px solid #e4e4e4;
            img{
                width: 50px;
                height: 50px;
                border-radius: 3px;
                vertical-align: middle;
            }
            span{
                display: inline-block;
                margin-left: 5px;
                font-size: 14px;
            }
        }
    }
}
</style>