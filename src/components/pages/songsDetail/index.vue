<template>
    <div class="songs-detail">
       <van-nav-bar left-arrow left-text="歌单" class="top" @click-left="onClickLeft">
           <template #right>
               <van-icon name="search" ></van-icon>
           </template>
       </van-nav-bar>
       <div class="content">
           <img :src="imgUrl" />
            <p>{{songsListName}}</p>
       </div>
       <div class="play-top">
           <i class="iconfont icon-play-fill"></i>
           <span>播放全部</span>
           <span>共({{songsNumber.length }})首</span>
       </div>
       <div class="songs" v-for="(item,i) in songsNumber" :key="i" @click="playSong(i)">
           <div class="songs-left">
               <span class="songs-index">{{i+1}}</span>
               <span class="songs-name">
                    <strong>{{item.name}}</strong>
                    <br>
                   <span>{{item.ar[0].name}}</span> 
               </span>
           </div>
           <!-- <div class="songs-right">
                <i v-if="playBtn" class="iconfont icon-suspended"></i>
                <i  v-else class="iconfont icon-play"></i>    
           </div> -->
       </div>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
    
    data(){
        return{
            imgUrl:"",
            songsListName:'',
            index:'',
         
            // currentIndex:-1
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        ...mapMutations(['PLAYBTN']),
        ...mapMutations(['UPDATESONGID']),//更换音乐id
        ...mapMutations(['UPDATECURRENTINDEX']),
        playSong(i){
            ///获取当前点击歌曲的id
            // console.log(this.songsNumber[i].id);
        //    this.UPDATESONGID(this.songsNumber[i].id)
        //    if(this.$refs.audio.paused){
        //         if(this.currentIndex == i || this.currentIndex==-1){
        //             this.PLAYBTN(true);
        //         }   
        //         this.currentIndex = i;
        //         this.$refs.audio.play(); //播放歌曲      
        //        console.log(this.$refs.audio.paused);
        //    }else{
        //         if(this.currentIndex == i || this.currentIndex==-1){
        //             this.PLAYBTN(false);
        //         }
        //          this.currentIndex = i;
        //         this.$refs.audio.pause();//暂停播放
        //        console.log(this.$refs.audio.paused);
        //    }

           this.UPDATECURRENTINDEX(i);
        }
    },
    computed:{
        ...mapGetters({
            songsNumber:'playSongsList'
        }),
  
        //  song_id(){
        //      return this.songId
        //  },
         //播放按钮与暂停按钮的切换
        // playBtn(){
        //     return this.$store.state.playList.playBtn
        // }
    },
    created(){
        //将params参数存储到localStorage中，防止页面刷新params参数清空
        let tempData = JSON.parse(localStorage.getItem("tempIndex"));
        if(!tempData){
            tempData = this.$route.params;
            localStorage.setItem('tempIndex',JSON.stringify(tempData))
        }
        this.index = tempData.index;
        this.$store.commit('UPDATELISTINDEX',this.index);
        //将 vuex中state保存在localStorage中
        let tempPersionalizedList =  JSON.parse(localStorage.getItem("tempPersionalized"));
        if(!tempPersionalizedList){
            tempPersionalizedList =  this.$store.state.personalized.persionalizedList;
            localStorage.setItem("tempPersionalized",JSON.stringify(tempPersionalizedList))
        }
        this.imgUrl = tempPersionalizedList.result[this.index].picUrl;
        this.songsListName = tempPersionalizedList.result[this.index].name;
        console.log(this.imgUrl);
        this.$store.commit('SONGID',this.$route.query.id)
        this.$store.dispatch('getPlayList')
    },
    
    beforeDestroy(){
        localStorage.removeItem('tempIndex');
        localStorage.removeItem('tempPersionalized')
    },
}
</script>

<style lang="scss">
@import './songsdetail.scss'
</style>