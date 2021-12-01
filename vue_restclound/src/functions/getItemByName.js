export default (items, name) =>{
  let result
  for(let item of items) {
    if(item.name === name)
      result= item
  }

  return result

}