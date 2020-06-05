console.clear();

class Note {
	constructor() {
		this.noteData = {
			title: '',
			textData: {
				text: '',
				modified: new Date().getTime()
			},
			checkboxData: [],
			listData: []
		};
		// ! color will be set when the user set the color other than default color
		// this.color = '';
		this.properties = {
            modified: new Date().getTime()
            // ! pin position will start from 0 for highest priority and increase in number for lower priorities
			// pinPosition: -1, 
		};
	}
    get noteTitle() {
        return this.noteData.title;
    }
	set noteTitle(title) {
		this.noteData.title = title;
        // updating note object modified time property
        this.properties.modified = new Date().getTime();
	}
    get textData()
    {
        return this.noteData.textData.text;
    }
    set textData(text)
    {
        this.noteData.textData.text = text.substr(0, 20000);
        // setting modified variables of textData and the whole Note object to the current time - when it is modified
        this.noteData.textData.modified = new Date().getTime();
        this.properties.modified = new Date().getTime();
    }
    get allCheckboxData(){
        return this.noteData.checkboxData;
    }
    set addCheckbox(text)
    {
        let checkbox = {
            // max. length of text for each textbox is 500 characters
            text: text.substr(0, 500),
            modified: new Date().getTime(),
            checked: false
        }
        this.noteData.checkboxData.push(checkbox);
        this.properties.modified = new Date().getTime();
    }
    removeCheckbox(checkboxObj)
    {
        let indexToRemove = this.noteData.checkboxData.indexOf(checkboxObj);
        console.log(indexToRemove);
        if(indexToRemove >= 0)
            this.noteData.checkboxData.splice(indexToRemove, 1);
        // else throw new Error("custom error")
    }
}
console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
let note = new Note();
console.log(note);
// note.noteTitle = 'My note title!';
// console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
// console.log(note);
// note.textData = 'lorem'
// console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
console.log(note);


note.addCheckbox = 'lorem'
note.addCheckbox = 'ipsum'
console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
console.log(note.noteData.checkboxData);
console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
note.removeCheckbox(note.allCheckboxData.filter(checkbox => checkbox == {
    // text: 'lorem',
    // checked:false
}));
console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
console.log(note.noteData.checkboxData);
console.log('\n+++++++++++++++++++++++++++++++++++++++++\n');
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
