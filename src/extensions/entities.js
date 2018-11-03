entities = {
    glider: entity(`
    010
    001
    111
    `)
}
function entity (str, xo = 0, yo = 0){
    const clean = str.split('\n').join('').split(' ').join('');
    const cLen = clean.length;
    const sqrt = Math.sqrt(clean.length);
    const arr = [];
    let i = 0;
    while (i < cLen) {
        const x = i % sqrt;
        const y = Math.floor(i/sqrt);
        if (clean[i]==="1") arr.push([x+xo,y+yo]);
        ++i;
    }
    return arr;
}
