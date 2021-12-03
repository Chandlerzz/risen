import request from '@/utils/request'

export async function  getRepairInfo(obj) {
    let str = "?"
    for( let i in obj){
        str = str + i +"="+eval("obj."+i) + "&"
    }
    const data = await request({
    url: "/app_102_module_maintainment/query_repairinfo"+str,
    method: 'get',
    hideloading: true // 隐藏loading
  })
    return data;
}

