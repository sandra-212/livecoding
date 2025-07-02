const getResult = (id) =>
    new Promise((resolve)=>{
        console.log('Fetching result for ',id)
        setTimeout(()=>resolve(id),500)
    })
    
    const memoize = (fn) =>{
        const cache = {}
        return function(...args){
            const key = args.toString()
            if(key in cache){
                console.log('fetching from cache ',key)
                return cache[key]
            }else{
                const result = fn(...args)
                cache[key] = result
                return result
            }
        }
    }
    
    const memoizedGetResult = memoize(getResult)
    memoizedGetResult(1).then((r)=>console.log(1,r))
    memoizedGetResult(1).then((r)=>console.log(1,r))
    memoizedGetResult(2).then((r)=>console.log(2,r))
    memoizedGetResult(2).then((r)=>console.log(2,r))
    
    setTimeout(()=>{
      memoizedGetResult(3).then((r)=>console.log(3,r)) 
      memoizedGetResult(1).then((r)=>console.log(1,r)) 
    },1000)

//2
const plus =(a) =>(b) => a+b
const multiply = (a) =>(b) => a*b

const pipe = (fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const firstCalculation = pipe([plus(2),multiply(3)])
console.log(firstCalculation(2))
const secondCalculation = pipe([multiply(2),plus(4),multiply(2)])
console.log(secondCalculation(5))