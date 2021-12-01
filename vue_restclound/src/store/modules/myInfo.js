// import getUserInfo  from '@/api/getUserInfo'
// import {DictKeyToValue} from "../../dicts";

const myInfo = {
    state: {
        name: '',
        company: undefined,
        roles:[],
        permissions:[]
    },

    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_COMPANY:(state, company) => {
            state.company = company
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions)=>{
            state.permissions = permissions
        }
    },

    actions: {
        // 获取用户信息
        // GetMyInfo({ commit }) {
        //     return new Promise(async (resolve, reject) => {
        //         try {
        //             const result = await getUserInfo()

        //             if(DictKeyToValue('accountType','employee') == result.accountType) {
        //                 commit('SET_NAME',result.employee.name)
        //                 commit('SET_COMPANY', result.employee.company)
        //             } else  {
        //                 commit('SET_NAME', result.admin.name)
        //             }

        //             commit('SET_ROLES', result.roles)
        //             commit('SET_PERMISSIONS',result.permissions)

        //             resolve(result)
        //         } catch (e) {
        //             reject(e)
        //         }
        //     })
        // },
    }
}

export default myInfo
