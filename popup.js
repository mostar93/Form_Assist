// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
let key = document.getElementById('key')
let value = document.getElementById('value')

function addValue(){
    chrome.storage.sync.set({key:value}, function(){
        console.log('Data added')
    })
}