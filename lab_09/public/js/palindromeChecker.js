function palindromeCheck (input) {
    if (!input) {
        alert('Error! No input!');
        return;
    }
    
    let list = document.createElement("li");
    list.textContent = input;
    if (_pcheck(input)) {
        list.setAttribute('class','is-palindrome');
    } else {
        list.setAttribute('class','not-palindrome');
    }
    
    document.getElementById('attempts').appendChild(list);
    return;

    function _pcheck (raw_input) {
        let text = raw_input.replace(/\W/g,'').toLowerCase();
        for (let i = 0; i < text.length/2; i++) {
            if (text[i] != text[text.length - 1 - i]) {
                return false;
            }
        }
        return true;
    }
}