export class Simulator {
    constructor (height, length) {
        this._height = height;
        this._length = length;
        //example cells => {"1":{"2":"#ff0000", "4":"#ff0000"}} => meaning 2 cells, one on line 1 column 2, the other on line 1 column 4
        this._cells = {};
    }
    simulate () {
        const modList = [];
        
    }
    push (line, column, colour) {
        const cells = this._cells;
        if (typeof cells[line] === 'undefined') cells[line] = {};
        cells[line][column] = colour;
    }
    delete (line, column) {
        if (typeof this._cells[line] !== 'undefined' & typeof this._cells[line][column] !== 'undefined') delete this._cells[line][column];
    }
}
