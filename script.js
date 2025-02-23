"use strict";


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        generate();
    });
});

//generates n amount of cards
function generate(){
    let i, list, spaces;

    //get the values of elements that won't change their value throught the code
    const title = document.getElementById('bingo-title').value;
    const width = document.getElementById('cols').value;
    const height = document.getElementById('rows').value;
    const freespot = document.getElementById('freespot-yesno').value;
    const freespot_text = document.getElementById('freespot-text').value;
    const freespot_random = document.getElementById('freespot-random').value;
    //define the center square
    const center = Math.floor(height / 2) * width + Math.floor(width/2);

    list = format_words(document.getElementById('bingo-words').value);

    $("#results").html("");

    //check if they're enough words to cover the whole board up
    const spaces_required = width * height;
    spaces = list.length;
    if(freespot == 'true'){
        spaces += 1;
    }
    if(spaces < spaces_required){
        alert("you don't have enough words to fill your bingo card")
    }

    for(i = 0; i < document.getElementById('quantity').value; i += 1){
        bingo(
            title, width, height, freespot, freespot_text, freespot_random, spaces_required, center,
            format_words(document.getElementById('bingo-words').value),
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

function bingo(title, width, height, freespot, freespot_text, freespot_random, spaces_required, center, list){
    let output, spaces=[];

    //generate a random place for the freespot to be in
        let random_spot = Math.floor(Math.random() * spaces_required);

    //creates a random array of numbers (in range 0 to amount of words from the input)
    for(let i = 0; i < width * height; i += 1){
        if(i == center && freespot == 'true' && freespot_random == 'false'){
            spaces.push(freespot_text);
        }
        else if(freespot == 'true' && freespot_random == 'true' && i == random_spot){
            spaces.push(freespot_text);
        }
        else{
        spaces.push(list.splice(Math.floor(Math.random() * list.length), 1));
        }
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