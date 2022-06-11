<template>
  <div id="recom-songs">
      <img class="image" :src="imgUrl" />
      <p>{{name}}</p>
  </div>
</template>

<script>
export default {
    props:['name','imgUrl']
}
</script>

<style lang="scss">
@import './recommendSongs.scss';
 /* .slide-box{
            margin-top: 200px;y
            /* display: -webkit-box; */
            /* overflow-x: scroll;
            white-space: nowrap;
            /* -webkit-overflow-scrolling:toach; */
        /* } */ 
        /*去掉滚动条*/
        /* .slide-box::-webkit-scrollbar{
            width:0; 
            height:0; 
            display: none;
        }
        .slide-item{
            display: inline-block;
            width: 200px;
            height: 200px;
            border:1px solid #ccc;
            margin-right: 30px;
        }  */

</style>