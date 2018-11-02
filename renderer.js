// import { Simulator } from "./src/predetermined/simulator-v2"; //TODO: idk why this isn't working

class GameOfLife extends Simulator{
    constructor (options) {
        super(options.height, options.width);
        this._height = options.height;
        this._width = options.width;
        this._columnCount = options.columns;
        this._rowCount = options.rows;
        this._speed = options.speed;
        this._cellHeight = this._height/this._rowCount;
        this._cellWidth = this._width/this._columnCount;
        // example cells => {"1":{"2":"#ff0000", "4":"#ff0000"}} => meaning 2 cells, one on line 1 column 2, the other on line 1 column 4
        this._cells = {};
        this._log = options.log;
        this._timestamps = [];
        this._drawCount = 0;
        this.canvas(options.canvas);
    }
    canvas (canvasElement) {
        this._canvas = canvasElement;
        this._canvas.height = this._height;
        this._canvas.width = this._width;
        this._ctx = this._canvas.getContext('2d');
    }
    start() {
        this._interval = setInterval(_=>{
            this.simulate();
            this.draw();
            this._timestamps.push(new Date().getTime());
            if((this._drawCount % this._speed * 5) === 0){
                this.outputLog();
            }
        },1000/this._speed);
    }
    outputLog(){
        const now = new Date().getTime();
        const fps = this._timestamps.filter(time=>time > now - 1000).length;
        this._log.innerHTML = `fps: <b>${fps}</b>`;
    }
    draw() {
        this._ctx.clearRect(0, 0, this._width, this._height);
        for(let y of Object.keys(this._cells)){
            for(let x of Object.keys(this._cells[y])){
                this.drawCell(x * this._cellWidth, y * this._cellHeight, this._cells[y][x]);
            }
        }
        ++this._drawCount;
    }
    drawCell(x, y, color) {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x,y,this._cellWidth,this._cellHeight);
    }
    addObject (obj) {
        const colorArray = Object.keys(obj);
        const colorCount = colorArray.length;
        let i = 0;
        while(i < colorCount){
            this.addArray(obj[colorArray[i]], colorArray[i]);
            ++i;
        }
    }
    addArray (arr, colour) {
        let i = arr.length;
        while(i > 0){
            --i;
            this.add(arr[i][1], arr[i][0], colour);
        }
    }
}