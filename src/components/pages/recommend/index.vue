<template>
  <div id="recommend" @scroll="handleScroll">
      <van-nav-bar title="音乐播放器" class="header" @click-left="onClickLeft">
          <template #left>
              <van-icon name="wap-nav" color="#fff" size="25px"></van-icon>
          </template>
          <template #right>
              <van-icon name="search" color="#fff" size="25px" @click="search"></van-icon>
          </template>
      </van-nav-bar>
     <van-popup
        v-model="show"
        position="left"
        :style="{width: '60%',height:'100%'}"
        round
    />
    <van-tabs v-model="active" color="#fff" background="#d44439" title-inactive-color="#fff" title-active-color="#fff"
    line-width="25px" line-height="2px">
    <van-tab title="推荐" name="recommend_song">
        <van-swipe :autoplay="2000" style="height: 180px;width:95%;margin:0 auto;border-radius:10px">
        <van-swipe-item v-for="(item,index) in banner_list" :key="index">
            <img v-lazy="item.imageUrl" style="width:100%;height:100%"/>
        </van-swipe-item>
    </van-swipe>
        <h1 class="recommend-song">推荐歌曲</h1> 
        <div class="songs">
           <router-link v-for="(item,index) in this.$store.state.personalized.persionalizedList.result" :key="index" 
           :to="{name:'SongsDetail',query:{id:item.id},params:{index:index}}">
                <recommendSongs :name="item.name" :imgUrl="item.picUrl"></recommendSongs>
           </router-link>
        </div>
    </van-tab>  
    <van-tab title="排行" name="singer_rank">歌手排行</van-tab>  
    <van-tab title="歌手" name="singer_name"><singers></singers></van-tab>  
    </van-tabs>
  
  </div>
</template>

<script>
import {getBanner,reqGetPersonalized} from '@/api'
import RecommendSongs from '@/components/pages/recommendSongs';
import Singers from '@/components/pages/singers/singers.vue'
import {mapGetters} from 'vuex'

export default {
    data(){
        return {
            show:false,
            active:'recommend_song',
            banner_list:[],
        }
    },
    components:{
        RecommendSongs,
        Singers
    },
    computed:{
        listIndex(){
            return this.$store.state.personalized.listIndex;
        },
        ...mapGetters(['listToPlay']),
    },
    methods:{
        handleScroll(e){
            console.log('eeeeee',e);
        },
        onClickLeft(){
            this.show = true;
        },
        showPopup(){
            this.show = true;
        },
        search(){
            this.$router.push('/search');
        }
    },
    created(){
        getBanner().then(res=>{
           if(res.data.code == 200){
               this.banner_list = res.data.banners;
            //    console.log(this.banner_list);
           }else{
               Toast.fail("获取banner数据失败");
           }
        })
        this.$store.dispatch('getPersionalizedList')
    },
    watch:{
        //已经获取到推荐歌曲
        listToPlay(){
            // console.log('---------');
            // console.log(this.listToPlay);
            // console.log(this.listIndex);
            // console.log(this.listToPlay[this.listIndex]);
            this.$store.commit('SONGID',this.listToPlay[this.listIndex].id)
            this.$store.dispatch('getPlayList')
        }
    },
  
}
</script>

<style lang="scss">
@import  "./recommend.scss";

</style>