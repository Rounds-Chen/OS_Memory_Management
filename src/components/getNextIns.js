

// 产生下一条指令
function nextIns(m){
    if(m===-1){
        return Math.floor(Math.random()*320);
    }

    let arr=[0,0,0,0,1,1,2,2];
    let c=Math.floor(Math.random()*(arr.length));
    
    switch(c){
        // 顺序产生
        case 0:
            return m!=319? m+1:m;

        // 随机产生[0,m-1]之一
        case 1:
            return m!=0? Math.floor(Math.random()*(m)):m;

        // 随机产生[m+1,319]之一
        case 2:
            return m!=319? Math.floor(Math.random()*(319-m)+m+1):m;
    }
}