<template>
  <div id="app">
       <router-view/>
    <music-footer></music-footer>
  </div>
</template>

<script>
import MusicFooter from '@/components/pages/musicfooter/MusicFooter'

export default {
  name: 'App',
  components:{
    MusicFooter
  }
}
</script>

<style lang="scss">
#app{
  height: 100%;
  overflow: hidden;
  &::-webkit-scrollbar{
    display: none;
    width: 0;
    height: 0;
  }
}
// #app{
//   height: 50%;
//   width: 100%;
//   overflow-y: scroll;
//   border: 5px solid red;
//   & div:nth-child(2n){
   
//      height: 200px;
//     width: 100%;
//   }
//   & div:nth-child(2n+1){
   
//      height: 200px;
//     width: 100%;
//   }
//   & div:last-child{
//     margin-bottom: 100px;
//   }
//}
</style>
