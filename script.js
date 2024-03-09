// generate code snippet
function generateSnippet() {
    const inputText = document.getElementById('inputField').value;
    const titleText = document.getElementById('titleField').value;
    const descriptionText = document.getElementById('descriptionField').value;

    let lines = inputText.split('\n');

    // escape special characters
    lines = lines.map(line => {
        return line
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
    });

    let snippet = lines.join('",\n        "')

    snippet = `"${titleText}": {
    "prefix": "",
    "body": [
        "${snippet}"
    ],
    "description": "${descriptionText}"
}`;

    document.getElementById('outputField').value = snippet;
}

document.getElementById('inputField').addEventListener('input', generateSnippet);
document.getElementById('descriptionField').addEventListener('input', generateSnippet);
document.getElementById('titleField').addEventListener('input', generateSnippet);


// allow user to tab inside text field
function tabInside(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var cursorPosition = this.selectionStart;

        var currentValue = this.value;
        var newValue = currentValue.substring(0, cursorPosition) + '    ' + currentValue.substring(cursorPosition);

        this.value = newValue;

        this.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
        generateSnippet();
    }
}

document.getElementById('inputField').addEventListener('keydown', tabInside);
