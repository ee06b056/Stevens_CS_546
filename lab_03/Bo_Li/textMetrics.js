function count_unique_words (text_arr) {
    let word_occurrence = {};
    for (let word of text_arr) {
        if (!word_occurrence[word]) {
            word_occurrence[word] = 1;
        } else {
            word_occurrence[word]++;
        }
    }
    return word_occurrence;
}

function simplify (text) {
    if (typeof(text) != 'string') {
        throw 'argument must be string';
    }
    if (arguments.length != 1) {
        throw 'should be only one argument'
    }
    return text.replace(/[^a-zA-Z\s]/g, '').toLowerCase().replace(/\s+/g,' ').trim();
}

function createMetrics (text) {
    if (typeof(text) != 'string') {
        throw 'argument must be string';
    }
    if (arguments.length != 1) {
        throw 'should be only one argument'
    }
    let rt_obj = {};
    let long_word_count = 0;
    let raw_text = simplify(text);
    let text_arr = raw_text.split(' ');
    for (let word of text_arr) {
        if (word.length >= 6) {
            long_word_count++;
        }
    }
    let word_occurrence = count_unique_words(text_arr);
    rt_obj['totalLetters'] = raw_text.replace(/\s/g,'').length;
    rt_obj['totalWords'] = text_arr.length;
    rt_obj['uniqueWords'] = Object.keys(word_occurrence).length;
    rt_obj['longWords'] = long_word_count;
    rt_obj['averageWordLength'] = rt_obj.totalLetters / rt_obj.totalWords;
    rt_obj['wordOccurrences'] = word_occurrence;

    return rt_obj;
}

module.exports = {
    simplify,
    createMetrics
}