
import getAllDepartments from '@/api/getAllDepartments'
import {list2tree } from '@/functions/tree'

export default async (companyId, rootName)=>{

  const departmentList = await getAllDepartments({
    companyId,
  })
  return list2tree( departmentList.rows,rootName)
}