<template>
  <div class="music-ly"  ref="musicLy">     
      <p v-for="(item,index) in music_lyric_detail" :key="index" :class="{active:item.time<current_music_time&&current_music_time<item.pre}">
          {{item.ly}}
      </p>
  </div>
</template>

<script>    
import {mapActions} from 'vuex'
export default {
    props:['music_lyric_detail'],
    computed:{
       
        current_music_time(){
            return this.$store.state.playList.currentTime;
        },
    },
    methods:{
        
    },
    created(){
       
    
    },
     watch:{
            current_music_time(){
                console.log('shujubianhua');
                console.log([this.$refs.musicLy]);
            // console.log(this.$refs.musicLy.scrollTop);
            let p = document.querySelector("p.active");
            console.log([p]);
            if(p){
                if(p.offsetTop > 300){
                console.log('---------');
                this.$nextTick(()=>{
                      this.$refs.musicLy.scrollTop =p.offsetTop-300;
                })
                 
                // console.log( p.offsetTop-300);
                // console.log('nextTick',this.$refs.musicLy.scrollTop);
            }
            }
            }
        },
}
</script>

<style lang="scss">
.music-ly{
    height: 100%;
      overflow-y: scroll;
   p{
       text-align: center;
       padding: 5px 0;
   } 
   .active{
       color: #fff;
       font-size: 20px;
       font-weight:bold;
       transition: 1s all;
   }
}
</style>