document.body.innerHTML = `<canvas id="can" height=400 width=400></canvas>
<textarea id="output"></textarea>`;
const c = document.getElementById('can');
const ctx = c.getContext('2d');
ctx.fillRect(10, 10, 10, 10);
//const imgUrl = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/373280/Conways_game_of_life_breeder.png";
const imgUrl = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/373280/turing_js_r.gif";

const img = new Image();
img.src = imgUrl;
img.crossOrigin = "Anonymous";
img.onload = function () {
    can.height = this.height;
    can.width = this.width;
    ctx.drawImage(img, 0, 0, this.width, this.height);
    let y = 0;
    let x = 0;
    const cells = {};
    while (x < this.width) {
        y = 0;
        while (y < this.height) {
            const pixelData = ctx.getImageData(x,y,1,1).data;
            const isWhite = (pixelData[0] === 255 && pixelData[1] === 255 && pixelData[2] === 255);
            const isTransparent = pixelData[3] === 0;
            const omitPixel = isTransparent || isWhite;
            if (!omitPixel) {
                const r = pixelData[0];
                const g = pixelData[1];
                const b = pixelData[2];
                const color = `rgb(${r}, ${g}, ${b})`;
                if (typeof cells[color] === "undefined") {
                   cells[color] = [];
                }
                cells[color].push([x,y]);
            }
            ++y;
        }
        ++x;
    }
    output.value = JSON.stringify(cells);
}
