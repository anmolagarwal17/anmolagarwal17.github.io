console.clear();

class Note {
	constructor() {
		this.noteData = {
			title: '',
			textData: {
				text: '',
				modified: new Date().getTime(),
			},
			checkboxData: [],
			listData: [],
		};
		// ! color will be set when the user set the color other than default color
		// this.color = '';
		this.properties = {
			modified: new Date().getTime(),
			// ! pin position will start from 0 for highest priority and increase in number for lower priorities
			// pinPosition: -1,
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
		return this.noteData.textData.text;
	}
	set textData(text) {
		this.noteData.textData.text = text.substr(0, 20000);
		// setting modified variables of textData and the whole Note object to the current time - when it is modified
		this.noteData.textData.modified = new Date().getTime();
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
		let checkbox = {
			// max. length of text for each textbox is 500 characters
			text: text.substr(0, 500),
			modified: new Date().getTime(),
			checked: false,
			id: this.allCheckboxData.length,
		};
		this.noteData.checkboxData.push(checkbox);
		// updating modified time
		this.properties.modified = new Date().getTime();
	}
	updateCheckboxText(id, text) {
		this.noteData.checkboxData[id].text = text;
		// updating modified time
		this.noteData.checkboxData[id].modified = new Date().getTime();
		this.properties.modified = new Date().getTime();
	}
	toggleCheckCheckbox(id) {
		this.noteData.checkboxData[id].checked = !this.noteData.checkboxData[id]
			.checked;
		// updating modified time
		this.noteData.checkboxData[id].modified = new Date().getTime();
		this.properties.modified = new Date().getTime();
	}
	updateCheckboxTime(id)
	{
		// updating modified time
		this.noteData.checkboxData[id].modified = new Date().getTime();
		this.properties.modified = new Date().getTime();	
	}
	removeCheckbox(id) {
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
			this.noteData.checkboxData[id].modified = new Date().getTime();
			this.properties.modified = new Date().getTime();
		} else throw new Error('Checkbox object does not exist error!');
	}
}
console.log('\n-----------------------------------------------------------\n');
let note = new Note();
console.log(note);
console.log(note);

note.addCheckbox('lorem0');
note.addCheckbox('ipsum1');
note.addCheckbox('ipsum2');
note.addCheckbox('ipsum3');
note.addCheckbox('ipsum4');
note.addCheckbox('ipsum5');
note.addCheckbox('ipsum6');
note.addCheckbox('ipsum7');
note.addCheckbox('ipsum8');
console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
console.log(note.noteData.checkboxData);
console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
note.removeCheckbox(note.allCheckboxData[1].id);
// console.log('hello', note.allCheckboxData[0]);
// console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
// console.log(note.noteData.checkboxData);
// console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
// note.toggleCheckCheckbox(2);
// note.toggleCheckCheckbox(5);
// console.log(note.noteData.checkboxData);
// console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
// note.toggleCheckCheckbox(5);
// console.log(note.noteData.checkboxData);
// console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
// note.toggleCheckCheckbox(1);
// console.log(note.getCheckbox(1));

note.toggleCheckCheckbox(7);
note.updateCheckboxText( 7, 'updated text');
console.log(note.allCheckboxData);
note.updateCheckboxText(7);
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
