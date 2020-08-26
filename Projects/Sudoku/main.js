function generateSudoku() {
	var startTime;
	var endTime;

	// creating sudoku matrix
	let sudoku = new Array(9);
	for (let i = 0; i < 9; i++) sudoku[i] = new Array(9);

	let timeN = 1;
	while (true) {
		startTime = new Date();
		let sudokuMemory = new Set();
		
		let looping;
		for (let i = 0; i < 9; i++) {
			let currentRow = [];
			looping = false;
			for (let j = 0; j < 9; j++) {
				let val = Math.floor(Math.random() * 9);
				let row = `r:${i} v:${val}`;
				let col = `c:${j} v:${val}`;
				let block = `b:${Math.floor(i / 3)}x${Math.floor(
					j / 3
				)} v:${val}`;
				let k = 0;
				while (
					sudokuMemory.has(row) ||
					sudokuMemory.has(col) ||
					sudokuMemory.has(block)
				) {
					if (k % 9 == 8) {
						// console.log(currentRow);
						// console.log(sudoku);
						for (let dlt = j; dlt >= 0; dlt--) {
							sudokuMemory.delete(currentRow.pop());
							sudokuMemory.delete(currentRow.pop());
							sudokuMemory.delete(currentRow.pop());
							sudoku[i][j--] = -1;
						}
						j = 0;
						// val = Math.floor(Math.random() * 9);
						// console.log(currentRow);
					}
					// currentRow.pop();
					// currentRow.pop();
					// currentRow.pop();
					k++;
					val = (val + 1) % 9;
					row = `r:${i} v:${val}`;
					col = `c:${j} v:${val}`;
					block = `b:${Math.floor(i / 3)}x${Math.floor(
						j / 3
					)} v:${val}`;
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
				var seconds = Math.round(timeDiff);
				if (seconds > timeN) {
					looping = true;
					break;
				}
			}
			if (looping) break;
		}
		if (!looping) break;
		timeN += 0.75;
		console.log('afds');
	}

	// console.table(sudoku);
	// for (let i = 0; i < 9; i++) console.table(sudoku[i]);

	endTime = new Date();
	var timeDiff = endTime - startTime;
	timeDiff /= 1000;
	var seconds = Math.round(timeDiff);
	console.log(seconds + ' seconds');

	return sudoku;
}

console.table(generateSudoku());
