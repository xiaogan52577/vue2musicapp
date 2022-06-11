<template>
  <div class="music-footer">
      <div  class="left" v-if="playSongsList[0]">
          <span class="span-img"><img  :src="playSongsList[songsIndex].al.picUrl" :class="{'img-rotate':isrotate}" @click="rotate"/></span>
          <span class="song-name">{{playSongsList[songsIndex].name}}</span>
      </div>
      <div class="right">
        <div class="playmusic" @click="playMusic">
              <i v-if="playBtn" class="iconfont icon-pause"></i>
           <i v-else class="iconfont icon-play2"></i>
        </div>
          <i class="iconfont icon-next3"></i>
          <i class="iconfont icon-24gf-playlist"></i>
      </div>
       <audio ref="audio"  :src="`https://music.163.com/song/media/outer/url?id=${song_id}.mp3`"></audio>
       <van-popup v-model="show" position="left" :style="{height:'100%',width:'100%'}">
           <MusicDetail @musicPopup="showPopup" :current_play_song="current_play_song"></MusicDetail>
       </van-popup>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import MusicDetail from '@/components/comment/MusicDetail'
export default {
    data(){
        return {
            isshowimg:false,
            playIndex:'-1',
            isrotate:true,
            show:false,  //音乐详情是否显示
            timer:'',
        }
    },
    components:{
        MusicDetail
    },
    computed:{      
        ...mapGetters(['playSongsList']), //当前需要播放的歌曲列表
         //播放按钮与暂停按钮的切换
        playBtn(){
            return this.$store.state.playList.playBtn
        },
     
        songsNumber(){
            return this.playSongsList //播放列表
        },
        song_id(){
            return this.$store.state.playList.songId 
        },
        songsIndex(){
            return this.$store.state.playList.currentIndex;
        },
        //当前正在播放的歌曲
        current_play_song(){
            return this.songsNumber[this.songsIndex];
        }
    },
    methods:{
         ...mapMutations(['PLAYBTN']),
         rotate(){
             this.show = true;
         },
         showPopup(data){
             this.show = data;
         },
        playMusic(){
            
            this.PLAYBTN(!this.playBtn);
        //      if(this.$refs.audio.paused){
        //         // if(this.currentIndex == i || this.currentIndex==-1){
        //         //     this.PLAYBTN(true);
        //         // }   
        //         // this.currentIndex = i;
        //          this.PLAYBTN(true);
        //         this.$refs.audio.play(); //播放歌曲   
        //          this.isrotate = false;   
        //    }else{
        //         // if(this.currentIndex == i || this.currentIndex==-1){
        //             this.PLAYBTN(false);
        //         // }
        //         //  this.currentIndex = i;
        //         this.$refs.audio.pause();//暂停播放
        //          this.isrotate = true;

        //    }
             
        },
        ...mapMutations(['UPDATESONGID','UPDATESONGID','UPDATECURRENTTIME','updateIsClickProgress']),
    },
    watch:{
        songsNumber(newValue,OldValue){
            //当当前的播放列表被切换时
           this.UPDATESONGID(newValue[this.songsIndex].id)
            console.log('播放列表切换');
           console.log('监视',newValue);
           if(this.playBtn){
               this.$refs.audio.autoplay = true;
           }
        },
        songsIndex(){
            //     if(this.$refs.audio.paused){
            //         if(this.playIndex == this.songsIndex || this.playIndex==-1){
            //             this.PLAYBTN(true);
            //         }   
            //         this.currentIndex = this.songsIndex;
            //         this.$refs.audio.play(); //播放歌曲      
            //    }else{
            //        if(this.playIndex == this.songsIndex || this.playIndex==-1){
            //             this.PLAYBTN(false);
            //         }
            //          this.playIndex = this.songsIndex;
            //         this.$refs.audio.pause();//暂停播放
            //    }
            // this.UPDATESONGID(this.songsNumber[this.songsIndex].id)
            console.log('数据变化');
            console.log(this.songsNumber[this.songsIndex].id);
            console.log(this.song_id);
            this.UPDATESONGID(this.songsNumber[this.songsIndex].id);
            this.PLAYBTN(true);
            this.$refs.audio.autoplay = true;
            this.isrotate = false;
        },
        playBtn(){
            console.log('按钮变化了');
            if(this.$refs.audio.paused){

                this.$refs.audio.play(); //播放歌曲   
                 this.isrotate = false;   
                this.timer =  setInterval(()=>{
                    //   console.log(this.$refs.audio.currentTime*1000);
                    // console.log('播放时间',this.$refs.audio.currentTime);
                    //触发了进度条,通过改变this.$refs.audio.currentTime的值来实现快进与后退
                    if(this.$store.state.playList.isClickProgress){
                       this.$refs.audio.currentTime =  this.$store.state.playList.currentTime;
                        this.updateIsClickProgress(!this.$store.state.playList.isClickProgress);
                    }else{
                        this.UPDATECURRENTTIME(this.$refs.audio.currentTime*1000);
                    }
                 },500)
           }else{
               
                this.$refs.audio.pause();//暂停播放
                this.isrotate = true;
                clearInterval(this.timer);
           }
        }
    }
}
</script>

<style lang="scss">
@keyframes userImage{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(-359deg);
    }
}
.music-footer{
    width: 100%;
    height: 80px;
    border-top: 1px solid #bbb;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    .left{
        height: 80px;
        .span-img{
            line-height: 80px;
            img{
                vertical-align: middle;
                height: 60px;
                width: 60px;
                border-radius: 30px;
                animation-name:userImage;
                animation-duration:5s;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
            }
            .img-rotate{
                animation-play-state: paused;
            }
        }
        .song-name{
            display: inline-block;
            width: 100px;        
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
    }
    .right{
        line-height: 80px;
        padding-right: 20px;
        .playmusic{
            display: inline-block;
        }
        .iconfont{
            font-size: 24px;
            padding: 10px;
        }
    }
}
</style>