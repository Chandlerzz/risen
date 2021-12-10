const GET_WORKSHOP_BASIC_INFO = 'GET_WORKSHOP_BASIC_INFO'
const GET_DING_TALK_USER_NAME = 'GET_DING_TALK_USER_NAME'
const CURRENT_URI = "CURRENT_URI"
export default  {
  [GET_WORKSHOP_BASIC_INFO] (state,res) {
    state.workshop_basic_info1=res;
  },
 [GET_DING_TALK_USER_NAME] (state,res) {
    state.ding_talk_name=res;
  },

    [CURRENT_URI] (state,res) {
        state.current_uri=res;
    },
}

