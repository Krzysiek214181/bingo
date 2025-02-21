"use strict";


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        generate();
    });
});

//generates n amount of cards
function generate(){
    let i;

    for(i = 0; i < document.getElementById('quantity').value; i += 1){
        bingo(
            document.getElementById('bingo-title').value,
            document.getElementById('cols').value,
            document.getElementById('rows').value,
            format_words(document.getElementById('bingo-words').value)
        )
    }

    location.href = '#results'
}

//formats the input from #bingo-words into an array without empty fields and "\n"
function format_words(str){
    let newArray = [];
    let arr = str.split(',');

    for(let i = 0; i < arr.length; i += 1){
        arr[i] = arr[i].replace(/\n/g, "");
        
        if(arr[i]){
            newArray.push(arr[i]);
        }
    }

    return newArray;
}

function bingo(title, width, height, list){
    let output, spaces=[], spaces_required;

    spaces_required = width * height;
    if(list.length < spaces_required){
        alert("you don't have enough words to fill your bingo card")
    }

    //creates a random array of numbers (in range 0 to amount of words from the input)
    for(let i = 0; i < width * height; i += 1){
        spaces.push(list.splice(Math.floor(Math.random() * list.length), 1));
    }

    output = '<table><thead><tr><th colspan="' + width + '">' + title + '</th></tr></thead><tbody>';
    for(let j = 0; j < height; j += 1){
        output += '<tr>';
            for(let k = 0; k < width; k += 1)
            {
                output += '<td>' + spaces.shift() + '</td>';
            }
        output += '</tr>'
    }
    output += '</tbody></table>'

    $('#results').append(output);

}