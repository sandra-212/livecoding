function digitPermutation(arr){
    let map = new Map
    for(let el of arr){
        let key = el.toString().split('').sort().join('')
      if(!map.has(key)){
          map.set(key,[])
      } 
      map.get(key).push(el);
    }
     
     return Array.from(map.values())
      
  }
  console.log(digitPermutation([199,991,1230,2301]))
  //[199,991],[123,2301,1230]