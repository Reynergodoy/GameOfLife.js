entities = {
    glider: entity(`
    010
    001
    111
    `)
}
function entity(str, xo=0, yo=0){
    const cleanStr = str.split('\n').join('').split(' ').join('');
    let arr = [];
    let i = 0;
    const sqrt = Math.sqrt(cleanStr.length);
    while(i < cleanStr.length) {
        const x = i % sqrt;
        const y = Math.floor(i/sqrt);
        if(cleanStr[i]==="1")arr.push([x+xo,y+yo]);
        ++i;
    }
    return arr;
}
