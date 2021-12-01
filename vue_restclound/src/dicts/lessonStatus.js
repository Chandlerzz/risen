import Dict from './'

const dict = new Dict()
dict.data = [{
  key: 'Normal',
  label: '正常',
  value: 1,
}, {
  key: 'Stop',
  label: '停用',
  value: 0,
},{
  key: 'Show',
  label: '已发布',
  value: 2,
},{
  key: 'Finish',
  label: '已结束',
  value: 3,
}]

export default dict
