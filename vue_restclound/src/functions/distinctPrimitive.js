export default (arr) =>{

  const newArr = []
  for (let item of arr) {
  if (! newArr.includes(item)) {
    newArr.push(item)
  }
}
return newArr
}