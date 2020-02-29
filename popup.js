window.addEventListener('load', function(evt){
    renderKeyValuePairs()
})


document.getElementById('submit').addEventListener('click', function(event){
    event.preventDefault()
    let value = document.getElementById('value').value
    console.log(value)
    addValue(value)
})


document.getElementById('clear').addEventListener('click', function(event){
    event.preventDefault()
    chrome.storage.sync.clear(function() {
        const list = document.getElementById('keyValuePairs')
        list.innerHTML = ''
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
})

document.addEventListene('click', function(event){
    console.log(event)
})


function addValue(value){
    let key = document.getElementById('key').value
    console.log(key)
    chrome.storage.sync.set({  [key] : value}, function(){
        document.getElementById("form").reset();
        renderKeyValuePairs()
    })
}


function renderKeyValuePairs(){
    console.log('rendering')
    chrome.storage.sync.get(null,function(data){
        console.log(data)
        var valueArray = Object.values(data)
        var keyArray = Object.keys(data)
        console.log(valueArray)
        console.log(keyArray)
        for (i in keyArray){
            var keyValuePair = document.createElement('div');

            var keySpan = document.createElement('span')
            var valueSpan = document.createElement('span')
            var spaceSpan = document.createElement('span')

            var copyText = document.createElement('button')
            var deletePair = document.createElement('button')

            var key = document.createTextNode(keyArray[i])
            var value = document.createTextNode(valueArray[i])
            var space = document.createTextNode(' : ')

            keySpan.appendChild(key)
            spaceSpan.appendChild(space)
            valueSpan.appendChild(value)

            keyValuePair.appendChild(keySpan)
            keyValuePair.appendChild(spaceSpan)
            keyValuePair.appendChild(valueSpan)
            keyValuePair.appendChild(copyText)
            keyValuePair.appendChild(deletePair)

            keyValuePair.classList.add('keyPair')

            document.getElementById('keyValuePairs').appendChild(keyValuePair)
        }
    })
}


    
