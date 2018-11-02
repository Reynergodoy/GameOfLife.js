export class Simulator {
    constructor (height, length) {
        this._height = height;
        this._length = length;
        // example cells => {"1":{"2":"#ff0000", "4":"#ff0000"}} => meaning 2 cells, one on line 1 column 2, the other on line 1 column 4
        this._cells = {};
    }
    simulate () {
        const modList = [];
        const checkedNeighbors = []
        const lines = Object.keys(this._cells);
        const linesLen = lines.length;
        if (linesLen === 0) return;
        for (let i = 0; i < linesLen; i++) {
            const cols = Object.keys(this._cells[lines[i]]);
            const colsLen = cols.length;
            for (let k = 0; k < colsLen; k++) {
                const counter = this.neighborsCounter(lines[i], cols[k]);
                if (!this.willLive(counter, true)) modList.push([lines[i] + " " + cols[k], "delete"]);
            }
        }
        this.update(modList);
        return modList;
    }
    add (line, column, colour) {
        const cells = this._cells;
        if (typeof cells[line] === "undefined") cells[line] = {};
        cells[line][column] = colour;
    }
    delete (line, column) {
        if (typeof this._cells[line] !== "undefined")
            if (typeof this._cells[line][column] !== "undefined") delete this._cells[line][column];
    }
    update (data) {
        const len = data.length;
        for(let i = 0; i < len; i++) {
            const instructions = data[i];
            const coords = instructions[0].split(" ");
            if (i[1] === "delete") {
                this.delete(coords[0], coords[1]);
                continue;
            } else if (i[1] === "add"){
                this.add(coords[0], coords[1], instructions[2]);
                continue;
            }
            continue;
        }
    }
    isAlive (line, column) {
        if (typeof this._cells[line] !== "undefined")
            if(typeof this._cells[line][column] !== "undefined") return true;
        return false;
    }
    neighborsCounter (line, column) {
        let counter = 0;
        if (this.isAlive(line-1, column-1)) counter++;
        if (this.isAlive(line-1, column  )) counter++;
        if (this.isAlive(line-1, column+1)) counter++;
        if (this.isAlive(line  , column-1)) counter++;
        if (this.isAlive(line  , column+1)) counter++;
        if (this.isAlive(line+1, column-1)) counter++;
        if (this.isAlive(line+1, column  )) counter++;
        if (this.isAlive(line+1, column+1)) counter++;
        return counter;
    }
    checkNeighbors (line, column, checked, list) {
        const points = [[line-1, column-1], [line-1, column], [line-1, column+1],
                      [line, column-1]  ,                   [line, column+1],
                      [line+1, column-1], [line+1, column], [line+1, column+1]];
        const _length = this._length;
        const _height = this._height;
        for (let i = 0; i < 8; i++) {
            const point = points[i];
            if (checked.indexOf(point[0] + " " + point[1])) continue;
            checked.push(point[0] + " " + point[1]);
            if (this.isAlive(point[0], point[1])) continue;
            if (!this.willLive(this.neighborsCounter(point[0], point[1]), false)) continue;
            if (point[0] < 0 || point[1] < 0 || point[0] >= _length || point[1] >= _height) continue;
            list.push([point[0] + " " + point[1], "add", '#'+ Math.floor(Math.random()*16777215).toString(16)]);
        }
    }
    willLive (counter, living) {
        if (living) {
            if (counter === 2 || counter === 3) return true;
            return false;
        } else {
            if (counter === 3) return true;
            return false;
        }
    }
}
