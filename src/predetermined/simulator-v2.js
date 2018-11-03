export class Simulator { // colors are predetermined by the highest amount of parents of given color
    constructor (height, length) {
        this._height = height;
        this._length = length;
        this._cells = {};
        this._colorAndCounterCache = {};
        this._colorMap = {};
        this._colorMapIndex = {};
    }
    
    simulate () {
        this._colorAndCounterCache = {};
        const birthList = [];
        const deathList = [];
        const lines = Object.keys(this._cells);
        const linesLen = lines.length;
        if (linesLen === 0) return;
        for (let i = 0; i < linesLen; i++) {
            const cols = Object.keys(this._cells[lines[i]]);
            const colsLen = cols.length;
            for (let k = 0; k < colsLen; k++) {
                const line = parseInt(lines[i]);
                const col = parseInt(cols[k]);
                const counter = this.neighborsCounter(line, col);
                if (!this.willLive(counter, true)) deathList.push([line, col]);
                this.checkNeighbors(line, col, birthList);
            }
        }
        this.update(birthList, deathList);
    }
    
    add (line, column, colour) {
        const cells = this._cells;
        if (typeof cells[line] === "undefined") cells[line] = {};
        if(typeof this._colorMap[colour] === "undefined"){
            this._colorMap[colour] = Object.keys(this._colorMap).length + 1;
            this._colorMapIndex[this._colorMap[colour]] = colour;
        }
        cells[line][column] = this._colorMap[colour];
    }
    
    delete (line, column) {
        if (typeof this._cells[line] !== "undefined")
            if (typeof this._cells[line][column] !== "undefined") delete this._cells[line][column];
    }
    
    update (birthData, deathData) {
        this.applyBirths(birthData);
        this.applyDeaths(deathData);
    }

    applyBirths (data) {
        const len = data.length;
        for(let i = 0; i < len; i++) {
            this.add(data[i][0], data[i][1], data[i][2]);
            continue;
        }
    }

    applyDeaths (data) {
        const len = data.length;
        for(let i = 0; i < len; i++) {
            this.delete(data[i][0], data[i][1]);
            continue;
        }
    }
    isAlive (line, column) {
        const _temp = this._cells[line]
        return _temp && (_temp[column] !== undefined);
    }
    
    getColor (line, column) {
        if (typeof this._cells[line] !== "undefined")
            if(typeof this._cells[line][column] !== "undefined") return this._colorMapIndex[this._cells[line][column]];
        return false;
    }
    
    neighborsCounter (line, column) {
        let counter = 0;
        const prevLine = this._cells[line-1];
        const currLine = this._cells[line];
        const nextLine = this._cells[line+1];
        if(prevLine){
            if (prevLine[column-1]) counter++;
            if (prevLine[column  ]) counter++;
            if (prevLine[column+1]) counter++;
        }
        if(currLine){
            if (currLine[column-1]) counter++;
            if (currLine[column+1]) counter++;
        }
        if(nextLine){
            if (nextLine[column-1]) counter++;
            if (nextLine[column  ]) counter++;
            if (nextLine[column+1]) counter++;
        }
        return counter;
    }
    
    colorAndCounter(line, column) {
        if(this._colorAndCounterCache[line] && this._colorAndCounterCache[line][column]){
            return this._colorAndCounterCache[line][column];
        }
        const points = [[line-1, column-1], [line-1, column], [line-1, column+1],
                       [line, column-1]   ,                   [line, column+1],
                       [line+1, column-1] , [line+1, column], [line+1, column+1]];
        let counter = 0;
        const color = {};
        for (let i = 0; i < 8; i++) {
            let point = points[i];
            if (this.isAlive(point[0], point[1])) {
                const _temp = this.getColor(point[0], point[1]);
                if (typeof color[_temp] === undefined) {
                    color[_temp] = 1;
                } else {
                    color[_temp]++;
                }
                counter++;
            }
        }
        const _tempColor = Object.keys(color);
        const _tempColorLen = _tempColor.length;
        if (_tempColorLen === 0) return [counter, {}];
        const biggest = [0, 0];
        for (let i = 0; i < _tempColorLen; i++) {
            const _value = color[_tempColor[i]];
            if (biggest[0] < _value) biggest = [_value, i]
            continue;
        }
        if(!this._colorAndCounterCache[line])this._colorAndCounterCache[line] = {};
        this._colorAndCounterCache[line][column] = [counter, _tempColor[biggest[1]]];
        return [counter, _tempColor[biggest[1]]];
    }
    
        checkNeighbors (line, column, list) {
        const points = [[line-1, column-1], [line-1, column], [line-1, column+1],
                       [line, column-1]   ,                   [line, column+1],
                       [line+1, column-1] , [line+1, column], [line+1, column+1]];
        const _length = this._length;
        const _height = this._height;
        for (let i = 0; i < 8; i++) {
            const point = points[i];
            if (this.isAlive(point[0], point[1])) continue;
            const _counterColor = this.colorAndCounter(point[0], point[1]);
            if (!this.willLive(_counterColor[0], false)) continue;
            if (point[0] < 0 || point[1] < 0 || point[0] >= _height || point[1] >= _length) continue;
            list.push([point[0], point[1], _counterColor[1]]);
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
