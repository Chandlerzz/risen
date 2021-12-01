import Dict from './'

// 用户、角色、权限类型

const dict = new Dict()
dict.data = [{
  key: 'SystemManagement',
  label: '系统管理',
  value: 1,
}, {
  key: 'SchoolManagement',
  label: '大学管理',
  value: 2,
}, {
  key: 'CompanyManagement',
  label: '公司管理',
  value: 3,
}]

export default dict