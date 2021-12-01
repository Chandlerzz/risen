export default (data, splitter, path)=> {


  let pathFragments= path.split('/')

  let result = data && (data.map(item => {

    let prop = item
    for(let fragment of pathFragments) {
      prop = prop[fragment]
    }

    return prop
  } ).join(splitter))


  return result
}