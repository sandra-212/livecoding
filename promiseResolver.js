function promiseWithResolvers(){
    let resolver
    let rejector
    const promise =new Promise((resolve,reject)=>{
        resolver=resolve
        rejector =reject
    })
    return {promise,resolver,rejector}
}
const {resolver,rejector, promise}= promiseWithResolvers()
promise.then(console.log)
setTimeout(()=>resolver(1),10)