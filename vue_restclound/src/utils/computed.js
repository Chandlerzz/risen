function getValue(dataPlusCount){
    let data = dataPlusCount.data;
    data = data/10;
    let count = dataPlusCount.count;
    count = count +1
    dataPlusCount.data = data;
    dataPlusCount.count = count;
    if(data>10){
        return getValue(dataPlusCount)
    }else{
        dataPlusCount.data = Math.ceil(data)}
        return dataPlusCount
}

function getKeysAndValues (production){
    if(this.workshop=== 201){
        production = this.production[0]
    }else if(this.workshop === 202){
        production = this.production[1]
    }

    let valuesSorted =[]
    let values = Object.values(production);
    let keys = Object.keys(production);
    let keysSorted = Object.keys(production).sort();
    console.log(keys.length)

    keys.forEach((item,key)=>{
        keysSorted.forEach((item1,key1) =>{
            if(keys[key] === keysSorted[key1]){
                valuesSorted[key1] = values[key]
            }
        })
    })
    return {
        keys:keysSorted,
        values: valuesSorted,
    }
}
export default{
    getValue,
    getKeysAndValues,
}
