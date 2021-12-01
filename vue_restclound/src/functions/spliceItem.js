export default (arr, item) => {

  let index = arr.indexOf(item)
  if(index >-1)
    arr.splice(index, 1)

}