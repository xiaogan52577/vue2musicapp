import axios from 'axios'
const baseUrl = "http://localhost:3000";

const requests = axios.create({
    baseURL:baseUrl,
    timeout:5000
})
//获取轮播图数据
export function getBanner(){
    const url = baseUrl +'/banner';
    return axios.get(url);
}

//获取推荐歌曲
export const reqGetPersonalized = () =>{ return axios.get(baseUrl+'/personalized?limit=9')};
//发送验证码
export const reqSendCaptcha = (params) =>requests({url:'/captcha/sent',method:'get',params});
//校验验证码
export const reqCheckCaptcha = (params) => requests({url:'/captcha/verify',method:'get',params});
//账号注册
export const reqRegister = (params) => requests({url:'/register/cellphone',method:'get',params});
//获取歌单的 所有歌曲
export const reqPlayList = (id) => requests({url:`/playlist/track/all?id=${id}`,method:'get'});
//获取歌词
export const  reqMusicLyric = (id) => requests({url:`/lyric?id=${id}`,method:'get'})
//搜索歌曲
export const reqSearchMusic = (data)=>requests({url:`/search?keywords=${data}`,method:'get'})
//获取歌手
export const reqGetSingers = (page)=>requests({url:`/artist/list?type=-1&area=7&offset=${page}`,method:'get'})