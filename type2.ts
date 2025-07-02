const customMap = <T,R>(array:T[],transform:(item:T)=>R):R[] => {
    return array.map(transform)
}

const stringResults= customMap([1,2,3],(item)=>item.toString())

const lengths = customMap(['hello','world'],(item)=>item.length)