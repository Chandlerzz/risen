var jdy_mixin = {
    methods:{
        getElement(event){
            const id =event.currentTarget.name;
            const cit = this.cit;
            const keys = Object.keys(cit);
            let result = null;
            keys.forEach(function(key){
                if( ("" + cit[key].id) === id){
                    result = cit[key];
                }
            })
            return result;
        },
        transform2d(cit){
          const length = Math.ceil(cit.length/2)
          let cit1 = []
          for(let i=0;i<length;i++)
          {
              let arr = []
              firstelementnum = i*2
              secondelementnum = i*2 + 1
              if(firstelementnum <= cit.length - 1)
              {
                arr.push(cit[firstelementnum])
              }
              if(secondelementnum <= cit.length - 1)
              {
                  arr.push(cit[secondelementnum])
              }
              cit1.push(arr)
          }
         return cit1
        },
        transform3l(cit){
          const length = Math.ceil(cit.length/3)
          let cit1 = []
          for(let i=0;i<length;i++)
          {
              let arr = []
              firstelementnum = i*3
              secondelementnum = i*3 + 1
              threeelementnum = i*3 + 2
              if(firstelementnum <= cit.length - 1)
              {
                arr.push(cit[firstelementnum])
              }
              if(secondelementnum <= cit.length - 1)
              {
                  arr.push(cit[secondelementnum])
              }
              if(secondelementnum <= cit.length - 1)
              {
                  arr.push(cit[threeelementnum])
              }
              cit1.push(arr)
          }
         return cit1
        }
    },
}
