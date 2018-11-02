export class Simulator {
    constructor (height, length) {
        this._height = height;
        this._length = length;
        // example cells => {"1":{"2":"#ff0000", "4":"#ff0000"}} => meaning 2 cells, one on line 1 column 2, the other on line 1 column 4
        this._cells = {};
    }
    simulate () {
        const modList = [];
        const lines = Object.keys(this._cells);
        const linesLen = lines.length;
        if (linesLen === 0) return;
        const cellsArray = [];
        for (let i = 0; i < linesLen; i++) {
            const cols = Object.keys(this._cells[lines[i]]);
            const colsLen = cols.length;
            for (let k = 0; k < colsLen; k++) {
                const counter = this.neighborsCounter(lines[i], cols[k]);
            }
        }
    }
    add (line, column, colour) {
        const cells = this._cells;
        if (typeof cells[line] === 'undefined') cells[line] = {};
        cells[line][column] = colour;
    }
    delete (line, column) {
        if (typeof this._cells[line] !== 'undefined')
            if (typeof this._cells[line][column] !== 'undefined') delete this._cells[line][column];
    }
    update (data) {
        
    }
    isAlive (line, column) {
        if (typeof this._cells[line] !== 'undefined')
            if(typeof this._cells[line][column] !== 'undefined') return true;
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
}
