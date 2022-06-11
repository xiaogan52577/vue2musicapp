import {reqPlayList,reqMusicLyric} from '@/api'

const state = {
    playList:[], //当前需要播放的歌单列表
    id:'',  //获取音乐列表的id
    songId:'',//获取当前播放音乐歌曲的id
    currentIndex:0,//播放歌曲的索引
    playBtn:false,//暂停按钮
    musicLyric:'',//当前播放歌曲的歌词
    currentTime:0,//当前播放歌曲的时间
    isClickProgress:false,//是否点击了进度条
}
const mutations = {
    GETPLAYLIST(state,playList){
        state.playList = playList;
    },
    SONGID(state,id){
        state.id = id;
    },
    //播放按钮与暂停按钮的切换
    PLAYBTN(state,value){
        state.playBtn = value;
    },
    UPDATESONGID(state,value){
        state.songId = value;
    },
    UPDATECURRENTINDEX(state,value){
        state.currentIndex = value;
    },
    UPDATEMUSICLYRIC(state,value){
        state.musicLyric = value;
    },
    //更新当前歌曲播放时间
    UPDATECURRENTTIME(state,value){
        state.currentTime = value;
    },
    updateIsClickProgress(state,value){
        state.isClickProgress = value;
    }
}
const actions = {
    //获取当前播放歌曲列表即当前播放的歌单列表
    async getPlayList({state,commit}){
        let res = await reqPlayList(state.id);
        console.log('playlist');
        console.log(res);
        if(res.data.code == 200){
            commit("GETPLAYLIST",res.data)
            return "ok";
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //获取当前播放歌曲的歌词
    async getMusicLyric({state,commit}){
        let res = await reqMusicLyric(state.songId);
        if(res.data.code  == 200){
            commit('UPDATEMUSICLYRIC',res.data)
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    //当前需要播放的歌曲列表
    playSongsList(state){
        return state.playList.songs || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}