function addValue(value){
    let key = document.getElementById('key').value
    console.log(key)
    chrome.storage.sync.set({  [key] : value}, function(){
        renderKeyValuePairs()
    })
}

function renderKeyValuePairs(){
    console.log('rendering')
    chrome.storage.sync.get(null,function(data){
        console.log(data)
        var array = Object.values(data)
        console.log(array)
        var keyValuePair = document.createElement('div');
    })

    

}

document.getElementById('submit').addEventListener('click', function(event){
    event.preventDefault()
    let value = document.getElementById('value').value
    console.log(value)
    addValue(value)
})

// document.getElementById('show').addEventListener('click', function(event){
//     event.preventDefault()
   
// })

document.getElementById('clear').addEventListener('click', function(event){
    event.preventDefault()
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
})


    
