// import { GET_WORKSHOP_BASIC_INFO } from '@/store/mutation'
import { getWorkshopBasicInfo, getDingTalkUserName } from '@/api/user'


export default {
 async getWorkShopBasicInfo({commit}){
   let res = await getWorkshopBasicInfo();
   commit('GET_WORKSHOP_BASIC_INFO',res)
},

    async getCurrentUri({commit},uri){
        let res =uri;
        commit('CURRENT_URI',res)
    },
  async getDingTalkUserName({commit}){
    let res = await getDingTalkUserName();
    commit('GET_DING_TALK_USER_NAME',res)
  }
}



