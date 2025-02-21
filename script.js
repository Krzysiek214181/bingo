"use strict";


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        let words = document.getElementById('bingo-words').value;

        test();
    });
});

function test(){
    bingo(
        document.getElementById('bingo-title').value,
        document.getElementById('cols').value,
        document.getElementById('rows').value,
        format_words(document.getElementById('bingo-words').value)
    )
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
    let output, spaces=[];

    for(let i = 0; i < width * height; i += 1){
        spaces.push(list.splice(Math.floor(Math.random() * list.length), 1));
    }

    output = '<table><thead><tr><th colspan="' + width + '">' + title + '</th></tr></thead><tbody>';
    for(let i = 0; i < height; i += 1){
        output += '</tr>';
            for(let j = 0; j < width; j += 1)
            {
                output += '<td>' + spaces.shift() + '</td';
            }
    }
    output += '</tbody></table>'

    document.getElementById('results').append(output);

}