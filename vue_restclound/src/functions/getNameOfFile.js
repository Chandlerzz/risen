export default (pathname) =>{
    let extIndex = pathname.lastIndexOf('.')
    if(extIndex === -1) throw new Error('文件路径名格式不正确')

    let pathDelimiterIndex = pathname.lastIndexOf('/')

    let startIndex = pathDelimiterIndex!==-1? pathDelimiterIndex + 1: 0
    let endIndex = extIndex

    if(endIndex < 0 || startIndex > endIndex)
        throw new Error('文件路径名格式不正确')

    return pathname.substring(startIndex, endIndex)

}