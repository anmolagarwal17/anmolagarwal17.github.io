class Note {
	constructor() {
		this.noteData = {
			title: '',
			textData: '',
			checkboxData: [],
			listData: [],
		};
		// ! color will be set when the user set the color other than default color
		// this.color = '';
		this.properties = {
			modified: new Date().getTime(),
			index: {
				textData: 0,
				checkboxData: 1,
				listData: 2,
			},
			// ! pin position will start from 0 for highest priority and increase in number for lower priorities
			// pinPosition: -1,
			listType: 'bullet-1', // *, *, *, *
			// listType: 'bullet-2'  // ->, ->, ->, ->
			// listType: 'bullet-3'  // ⏺, ⏺, ⏺, ⏺
			// listType: 'number-1'  // for normal numbering 1, 2, 3, 4
			// listType: 'number-1'  // for capital roman numbering I, II, III, IV
			// listType: 'number-1'  // for small roman numbering i, ii, iii, iv
			// listType: 'number-1'  // for capital alphabetical numbering A, B, C, D
			// listType: 'number-1'  // for small alphabetical numbering a, b, c, d
		};
	}

	// note title

	get noteTitle() {
		return this.noteData.title;
	}
	set noteTitle(title) {
		this.noteData.title = title;
		// updating note object modified time property
		this.properties.modified = new Date().getTime();
	}

	// note text data

	get textData() {
		return this.noteData.textData;
	}
	set textData(text) {
		this.noteData.textData = text.substr(0, 20000);
		// updating modified time
		this.properties.modified = new Date().getTime();
	}

	// checkbox

	get allCheckboxData() {
		return this.noteData.checkboxData;
	}
	getCheckbox(id) {
		return this.noteData.checkboxData[id];
	}
	addCheckbox(text) {
		if (this.noteData.checkboxData.length >= 500)
			throw new Error('Checkbox cannot have more than 500 items!');
		let checkbox = {
			// max. length of text for each checkbox is 500 characters
			text: text.substr(0, 500),
			checked: false,
			id: this.allCheckboxData.length,
		};
		this.noteData.checkboxData.push(checkbox);
		// updating modified time
		this.properties.modified = new Date().getTime();
	}
	updateCheckboxText(id, text) {
		this.noteData.checkboxData[id].text = text.substr(0, 500);
		// updating modified time
		this.properties.modified = new Date().getTime();
	}
	toggleCheckCheckbox(id) {
		this.noteData.checkboxData[id].checked = !this.noteData.checkboxData[id]
			.checked;
		// updating modified time
		this.properties.modified = new Date().getTime();
	}
	deleteCheckbox(id) {
		if (this.noteData.checkboxData.some((chkBox) => chkBox.id == id)) {
			this.noteData.checkboxData = this.noteData.checkboxData.filter(
				(chkBox) => {
					console.log(chkBox.id != id);
					return chkBox.id != id;
				}
			);
			// after deleting the element setting id of every element after deleted element equal to its the object index
			for (let i = id; i < this.noteData.checkboxData.length; i++) {
				this.noteData.checkboxData[i].id = i;
			}
			// updating modified time
			this.properties.modified = new Date().getTime();
		} else throw new Error('Checkbox object does not exist error!');
	}
	moveCheckbox(id, position) {
		// when the id is invalid
		if (
			id < 0 ||
			id >= this.noteData.checkboxData.length ||
			position < 0 ||
			position >= this.noteData.checkboxData.length
		) {
			throw new Error(
				`Invalid checkbox ID (${id}), or position (${position}) to move!`
			);
			return;
		} else {
			if (id < position) {
				let checkbox = this.noteData.checkboxData[id];
				for(let i=id; i<position; i++)
				{
					this.noteData.checkboxData[i] = this.noteData.checkboxData[i+1];
					this.noteData.checkboxData[i].id--; 
				}
				this.noteData.checkboxData[position] = checkbox;
				this.noteData.checkboxData[position].id = position;
			}
			else if(id > position)
			{
				console.log('hello');
				let checkbox = this.noteData.checkboxData[id];
				for(let i=id; i>position; i--)
				{
					console.log(`this.noteData.checkboxData[i] = this.noteData.checkboxData[i-1] ${this.noteData.checkboxData[i].id} = ${this.noteData.checkboxData[i-1].id}`);
					this.noteData.checkboxData[i] = this.noteData.checkboxData[i-1];
					this.noteData.checkboxData[i].id++; 
				}
				this.noteData.checkboxData[position] = checkbox;
				this.noteData.checkboxData[position].id = position;
			}
			else{
				console.log('Cannot move checkbox to its own position!(id and position same)');
			}
		}
	}

	// list

	// ! implement id-index to use as position when updating time/position
	// ! make a algorithm that takes id(or say index) to update and its new position and then update it along with other element ids/indexes that need to be updated
	// ! take inspiration from sorting algorithms that move array elements from place to place
	// ! do this first
	// ! implement for checkbox then copy paste it for list as well
}

console.clear();
console.log('\n---------------------------------------------\n');
let note = new Note();
// console.log(note);



note.addCheckbox('this is checkbox at index 0');
note.addCheckbox('this is checkbox at index 1');
note.addCheckbox('this is checkbox at index 2');
note.addCheckbox('this is checkbox at index 3');
note.addCheckbox('this is checkbox at index 4');
note.addCheckbox('this is checkbox at index 5');
note.addCheckbox('this is checkbox at index 6');
note.addCheckbox('this is checkbox at index 7');
note.addCheckbox('this is checkbox at index 8');
note.addCheckbox('this is checkbox at index 9');


console.log(note.allCheckboxData);


note.moveCheckbox(9, 2);
console.log(note.allCheckboxData);



note.moveCheckbox(2, 8);
console.log(note.allCheckboxData);





// textData: {
//     text: "All the text in the note itself.",
//     modified: new Date().getTime() // gets the ms from 1 January 1970 00:00:00 UTC to the given date-time(UTC) which will be unique
// },
// checkboxData: [{
//         text: "text for the first checkbox line",
//         modified: new Date().getTime(),
//         checked: false
//     },{
//         text: "text for the first checkbox line",
//         modified: new Date().getTime(),
//         checked: false
//     }
// ],
// listData: [{
//         text: "list text",
//         modified: new Date().getTime()
//     },{
//         text: "list text",
//         modified: new Date().getTime()
//     }
// ]
