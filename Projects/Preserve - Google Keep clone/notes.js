
// the note object
{
    noteData: {
        title: "Title of the note!",
        textData: {
            text: "All the text in the note itself.",
            modified: new Date().getTime() // gets the ms from 1 January 1970 00:00:00 UTC to the given date-time(UTC) which will be unique
        },
        checkboxData: [
            {
                text: "text for the first checkbox line",
                modified: new Date().getTime(),
                checked: false
            },
            {
                text: "text for the first checkbox line",
                modified: new Date().getTime(),
                checked: false
            }
            
        ],
        listData: [
            {
                text: "list text",
                modified: new Date().getTime()
            },
            {
                text: "list text",
                modified: new Date().getTime()
            }
            
        ]
    },
    themeData: {},
    properties: {
        modified: new Date().getTime(),
        pinPosition: -1 // -1 for default, i.e, not pinned else the pin position like 0th(pinned at top), 1st(sencond pin), 2nd ...
    }
}


// ! use event deligation to add events to everything on the page in the app
// ! use event deligation to add events to everything on the page in the app
// ! use event deligation to add events to everything on the page in the app
// ! use event deligation to add events to everything on the page in the app
// ! use event deligation to add events to everything on the page in the app
// ! use event deligation to add events to everything on the page in the app
// ? use event deligation to add events to everything on the page in the app
// ? use event deligation to add events to everything on the page in the app
// ? use event deligation to add events to everything on the page in the app
// ? use event deligation to add events to everything on the page in the app
// ? use event deligation to add events to everything on the page in the app
// ? use event deligation to add events to everything on the page in the app
// todo use event deligation to add events to everything on the page in the app
// todo use event deligation to add events to everything on the page in the app
// todo use event deligation to add events to everything on the page in the app
// todo use event deligation to add events to everything on the page in the app
// todo use event deligation to add events to everything on the page in the app
// todo use event deligation to add events to everything on the page in the app
// * use event deligation to add events to everything on the page in the app
// * use event deligation to add events to everything on the page in the app
// * use event deligation to add events to everything on the page in the app
// * use event deligation to add events to everything on the page in the app
// * use event deligation to add events to everything on the page in the app
// * use event deligation to add events to everything on the page in the app





// todo do this:

// todo add methods to move textData, checkbox block, list block etc up and down(index of those will be stored in the properties section of every note object)
// todo 