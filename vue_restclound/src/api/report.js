import request from '@/utils/request'

export async function  getRepairInfo(obj) {
    let str = "?"
    for( let i in obj){
        str = str + i +"="+eval("obj."+i) + "&"
    }
    let url="/api/query_repairinfo"
    if(process.env.NODE_ENV === 'production'){
        url = "/dev/risen_module_maintainment_and_management/query_repairinfo"
    }
    const data = await request({
    url: url+str,
    method: 'get',
    hideloading: true // 隐藏loading
  })
    return data;
}

