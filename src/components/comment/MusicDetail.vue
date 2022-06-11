<template>
  <div class="music-detail" >
      <!-- <img :src="current_play_song.al.picUrl" class="bc-image" /> -->
     <div :style="{backgroundImage:`url(${current_play_song.al.picUrl})`,backgroundPosition:'center'}" class="bc-img">
     </div>
     <div class="top">
             <div class="left"><van-icon name="arrow-left" color="#fff" :size="30" @click="onClickLeft"></van-icon></div>
             <div class="middle">
                 <p style="font-size:20px">{{current_play_song.name}}</p>
                 <p>{{current_play_song.ar[0].name}}</p>
             </div>
    </div>
    <div v-if="showlyric" class="song-lyric"><music-ly :music_lyric_detail="music_lyric"></music-ly></div>
   <div v-else class="rotate-img">
        <img :src="current_play_song.al.picUrl" :class="{img_is_unrotate:!$store.state.playList.playBtn}"/>
   </div>
   <div class="progress-bar" >
       <div class="progress" ref="progress" @click="clickProgress">
           <div class="progress-bar"  :style="{width:`${current_progress}px`}"></div>
          <span class="wrap-btn" :style="{left:`${current_progress}px`}"></span>
       </div>
    </div>
     <div>
        <van-grid class="music-detail-footer" :column-num="5">
            <van-grid-item><i class="iconfont icon-shunxubofang"></i></van-grid-item>
            <van-grid-item><i class="iconfont icon-last" @click="playLast"></i></van-grid-item>
            <van-grid-item  v-if="!$store.state.playList.playBtn" @click="play"><i class="iconfont icon-play2"></i></van-grid-item>
            <van-grid-item v-else @click="play"><i class="iconfont icon-pause" ></i></van-grid-item>
             <van-grid-item><i class="iconfont icon-next4" @click="playNext"></i></van-grid-item>
             <van-grid-item> <i class="iconfont icon-24gf-playlist"></i></van-grid-item>
        </van-grid>
     </div>
   <div class="ly" @click="showLyric" :style="{color: !showlyric?'black':'red'}">
       <i class="iconfont icon-word"></i>
   </div>

  </div>
</template>
<script>
import {mapMutations,mapActions} from 'vuex'
import MusicLy from '@/components/comment/MusicLy.vue'
export default {
  components: { MusicLy },
    data(){
        return{
            isshow:false,
            showlyric:true, //是否显示歌词
            total_time:'',//当前播放音乐歌曲的总时间
            progress_length:'',//进度条长度
        }
    },
    props:['current_play_song'],
    components:{
        MusicLy
    },
    computed:{
         music_lyric(){
            if(this.$store.state.playList.musicLyric){
                let arr = [];
                console.log(this.$store.state.playList.musicLyric.lrc.lyric);
                let lyric = this.$store.state.playList.musicLyric.lrc.lyric;
                console.log('----------');
                console.log(lyric.split (/[(\r\n)\r\n]+/));
                console.log(Array.isArray(lyric.split (/[(\r\n)\r\n]+/)));
                arr = lyric.split (/[(\r\n)\r\n]+/).map((item,i) => {
                    let minute = item.slice(1,3);
                    let seconds = item.slice(4,6);
                    let mill =  item.slice(7,10);
                    let ly = item.slice(11,item.length)
                    if(isNaN(Number(mill))){
                        mill =  item.slice(7,9);
                        ly = item.slice(10,item.length);
                    }
                    let time = parseInt(minute*1000*60)+parseInt(seconds*1000)+parseInt(mill);
                    if(lyric.split (/[(\r\n)\r\n]+/).length-1 == i+1){
                        //当前的时间为总时间
                        this.total_time = time;
                        console.log('zongshijian',this.total_time);
                    }
                    return {minute,seconds,mill,ly,time}            
                })
                arr.forEach((item,index)=>{
                    if(index<arr.length-2){
                        item.pre = arr[index+1].time;
                    }else{
                        item.pre = 0;
                    }
                });
                console.log('arr',arr);
                return arr;
            }
        },
        current_progress(){
            //当前播放歌曲所到的进度条
            console.log('当前时间',this.$store.state.playList.currentTime);
          //  console.log('当前进度条',((this.progress_length/this.total_time)*this.$store.state.playList.currentTime).toFixed(3));
           return (((this.progress_length-10)/(this.total_time+1000))*(this.$store.state.playList.currentTime-500)).toFixed(3);
        }
    },
    methods:{
        onClickLeft(){
            this.isshow = false;
            this.showlyric = true;
            this.$emit('musicPopup',this.isshow);
        },
        totalPlayTime(data){
            console.log('wtwe',data);
        },
        ...mapMutations(['PLAYBTN','UPDATECURRENTTIME','updateIsClickProgress']),
        //play music
        play(){
            //播放按钮与暂停按钮切换
            this.PLAYBTN(!this.$store.state.playList.playBtn);
        },
        playNext(){
            //播放下一首
            if(this.$store.state.playList.currentIndex == this.$store.state.playList.playList.length-1){
                this.$store.state.playList.currentIndex = 0;
            }
            else{
                this.$store.state.playList.currentIndex++;
            }
            
        },
         playLast(){
             //播放上一首
               if(this.$store.state.playList.currentIndex !== 0){
                 this.$store.state.playList.currentIndex--;
            }
           
         },
        showLyric(){
            this.showlyric = !this.showlyric
        },
        //点击进度条进行快进
        clickProgress(e){
            //    console.log([this.$refs.progress]);
            //    console.log(this.progress_length);
            //    console.log('e',e);
            //    console.log('e.offset',e.offsetX);
            this.updateIsClickProgress(true);
            
            this.UPDATECURRENTTIME((e.offsetX/(this.progress_length-10))*this.total_time/1000);
            console.log('更改的时间',(e.offsetX/(this.progress_length-10))*this.total_time/1000);

        },
        ...mapActions(['getMusicLyric']),
    },
    created(){
         this.getMusicLyric(); //获取歌曲的 歌词
    },
    mounted(){
        this.progress_length = this.$refs.progress.clientWidth
    },
    watch:{
        current_progress(newValue){
            console.log('pro');
            console.log(this.$store.state.playList.currentTime);
            console.log(newValue);
            if(newValue >= this.progress_length-10){
                this.playNext();
            }
        }
    }
}
</script>

<style lang='scss'>
@keyframes rotate{
    from{
        transform: rotate(0deg);
        
    }
    to{
        transform: rotate(-359deg);
    }
}
.music-detail{
    width: 100%;
    height: 100%;
    position: relative;
    .bc-img{
        height: 100%;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        filter: blur(30px);
        opacity: .7;
           
    }
    .top{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 5px;
            display: flex;
            justify-content: flex-start;
            .middle{
                margin-left: 100px;
                p{
                    width: 100px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: center;
                    color: #fff;
                    padding:3px 0;
                }
            }
        }
    .rotate-img{
        display: block;
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-100px,-200px);
    }
    img{
        height: 100%;
        width: 100%;
        border-radius: 100px;
        animation-name: rotate;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: 5s;
    }
    .img_is_unrotate{
        animation-play-state:paused;
    }
    .van-hairline--top::after{
            border-top-width: 0;
        }
    .music-detail-footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px;
        .van-grid-item__content::after{
            border: none;
        }
        .van-grid-item__content{
            background-color: transparent;
        }
        .iconfont{
            font-size: 20px;
        }
    }
    .ly{
        position: absolute;
        bottom: 105px;
        left: 0;
        .iconfont{
            font-size: 40px;
        }
    }
    .song-lyric{
        position: absolute;
        left: 0;
        top: 100px;
        margin: 0 auto;
        height: 500px;
        width: 100%;
        overflow-y: scroll;
    }
    .progress-bar{
        position: absolute;
        width: 100%;
        bottom: 85px;
        // left: 10px;
        padding-top: 5px;
        // border-top: #ebedf0 solid 1px;
        .progress{
            position: relative;
            width: 100%;
            height: 2px;
            background-color: #ebedf0;
            .progress-bar{
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                padding: 0;
                border-top: none;
                background-color: #1e80ff;
            }
            .wrap-btn{
                position: absolute;
                left: 0;
                top: -4px;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background-color: #1e80ff;
            }
        }
    }
}

</style>