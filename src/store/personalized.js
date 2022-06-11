import {reqGetPersonalized} from '@/api'
const state = {
    //推荐歌曲数据
    persionalizedList:[],
    //当前推荐歌曲，推荐的歌单索引,默认值设为0
    listIndex:0,
}
const mutations = {
    GETPERSIONALIZED(state,persionalizedList){
        state.persionalizedList = persionalizedList;
        console.log('----------')
        console.log(state.persionalizedList);
    },
    UPDATELISTINDEX(state,value){
        state.listIndex = value;
    },
}
const actions = {
    async getPersionalizedList({commit}){
        let res = await reqGetPersonalized();
        console.log(res)
        if(res.status == 200){
            commit("GETPERSIONALIZED",res.data);
            return "ok"
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    //推荐歌曲列表数据，为一个数组，里面每一项代表一个歌单
    // songsList(state){
    //     return state.persionalizedList.result || []
    // },
     //推荐歌曲的数据，里面包含获取播放歌曲列表的id
     listToPlay(state){
        return state.persionalizedList.result || []
     }
}
export default {
    state,
    mutations,
    actions,
    getters
}