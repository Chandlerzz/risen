export default (items, id) =>{
  let result
  for(let item of items) {
    if(item.id === id)
      result= item
  }

  return result

}