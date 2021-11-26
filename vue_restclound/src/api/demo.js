import request from '@/utils/request'

export async function getActivationDemo(){
    return request({
        url: "/analysis/getEqptDrByTooId.do",
        method: 'get',
        hideloading: true, // 隐藏loading
        })
}
export async function getProductionDemo(){
    return request({
        url: "/analysis/getAllProduction.do",
        method: 'post',
        hideloading: true, // 隐藏loading
    })
}
