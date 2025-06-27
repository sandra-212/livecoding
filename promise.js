const all =(promises) =>{
  let results=[]
  let completed=0
  if (promises.length === 0) {
    resolve(results);
    return;
  }
  return new Promise((resolve, reject) => {

    promises.forEach((pr,idx)=>{
     Promise.resolve(pr)
      .then(val =>{
        results[idx]=val
        completed+=1
        if (completed===promises.length){
             resolve(results);
        }
    })
    .catch(err => reject(err))
    
    })
 })
}

const any = (promises) => {
  return new Promise((resolve, reject) => {
      let errors = [];
      let rejectedCount = 0;

      promises.forEach((pr, index) => {
          Promise.resolve(pr).then(resolve).catch(err => {
              errors[index] = err;
              rejectedCount++;
              if (rejectedCount === promises.length) {
                  reject(new AggregateError(errors, 'All promises were rejected'));
              }
          });
      });
  });
};