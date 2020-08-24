/*
 *
 *
 * This algo is NOT copied!
 * I've developed this algo by myself
 * Just the idea of using set (instead originally of using arrays) is taken form a youtube video
 *
 *
 */

var startTime = new Date(),
    endTime;

// creating sudoku matrix
let sudoku = new Array(9);
for (let i = 0; i < sudoku.length; i++) sudoku[i] = new Array(9);

// initializing with -1 - invalid value
// for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) sudoku[i][j] = -1;

while(true){
    startTime = new Date();
let sudokuMemory = new Set();
// sudokuMemory.add('row:-1 col:-1 block:(-1x-1) val:-1');

for (let i = 0; i < 9; i++) {
    let currentRow = new Array(0);
    var looping = false;
    for (let j = 0; j < 9; j++) {
        let val = Math.floor(Math.random() * 9);
        let row = `row:${i} val:${val}`;
        let col = `col:${j} val:${val}`;
        let block = `block:${Math.floor(i / 3)}x${Math.floor(
            j / 3
        )} val:${val}`;
        let k = 0;
        while (
            sudokuMemory.has(row) ||
            sudokuMemory.has(col) ||
            sudokuMemory.has(block)
        ) {
            // console.log(currentRow);
            // console.table(sudoku);
            // console.log(sudokuMemory);
            // console.log(`${row} ${col} ${block} ${i}x${j}`);

            if (k % 9 == 8) {
                // console.log(currentRow);
                // console.log(sudoku);
                for (let dlt = j; dlt >= 0; dlt--) {
                    sudokuMemory.delete(currentRow.pop());
                    sudokuMemory.delete(currentRow.pop());
                    sudokuMemory.delete(currentRow.pop());
                    sudoku[i][j--] = -1
                }
                // while(currentRow.length>0){
                //     sudokuMemory.delete(currentRow.pop());
                // }
                j = 0;
                // val = Math.floor(Math.random() * 9);
                // console.log(currentRow);
            }
            // currentRow.pop();
            // currentRow.pop();
            // currentRow.pop();
            k++;
            val = (val + 1) % 9;
            row = `row:${i} val:${val}`;
            col = `col:${j} val:${val}`;
            block = `block:${Math.floor(i / 3)}x${Math.floor(
                j / 3
            )} val:${val}`;
            // currentRow.push(row);
            // currentRow.push(col);
            // currentRow.push(block);
            // console.log(`${row} ${col} ${block} ${i}x${j}`);
            // console.log(sudoku);
        }
        sudokuMemory.add(row);
        sudokuMemory.add(col);
        sudokuMemory.add(block);

        currentRow.push(row);
        currentRow.push(col);
        currentRow.push(block);
        // console.log(sudokuMemory);
        sudoku[i][j] = val;
        
        
endTime = new Date();
var timeDiff = endTime - startTime;
timeDiff /= 1000;
var seconds = Math.round(timeDiff)
if(seconds>2)
{
    looping = true;
    break;
}
    }
    if(looping) break;
}
if(!looping) break
}

console.table(sudoku);
// for (let i = 0; i < 9; i++) console.table(sudoku[i]);

endTime = new Date();
var timeDiff = endTime - startTime;
timeDiff /= 1000;
var seconds = Math.round(timeDiff);
console.log(seconds + ' seconds');