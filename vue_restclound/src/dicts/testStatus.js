import Dict from './'

const dict = new Dict()
dict.data = [{
  key: 'NotStarted',
  label: '未开始',
  value: 1,
}, {
  key: 'Started',
  label: '已开始',
  value: 2,
}, {
  key: 'Submitted',
  label: '已提交',
  value: 3,
}, {
  key: 'Pass',
  label: '通过',
  value: 4,
},{
  key: 'UnPass',
  label: '未通过',
  value: 5,
}]



export default dict;
