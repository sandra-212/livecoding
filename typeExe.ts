const getUser = async(): Promise<{name:string; age:number;}> => ({name:'john',age:30})
  
//type User = Awaited<ReturnType<typeof getUser>>
type User =  ReturnType<typeof getUser> extends Promise<infer U> ? U : ReturnType<typeof getUser>
type test = Expect<Equal<User,{name:string; age:number;}>>

type Expect <T extends true> =T
type Equal <X,Y> = (<T>()=> T extends X ? 1 :2) extends <T>()=> T extends Y ? 1 :2 ? true :false