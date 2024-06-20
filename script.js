document.addEventListener('DOMContentLoaded', function() {
    const notepad = document.getElementById('notepad');

    // Load saved content from localStorage
    const savedContent = localStorage.getItem('notepadContent');
    if (savedContent) {
        notepad.value = savedContent;
    }

    // Save content automatically
    notepad.addEventListener('input', function() {
        localStorage.setItem('notepadContent', notepad.value);
    });
});