window.addEventListener('load', function (evt) {
    renderKeyValuePairs()
})


document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault()
    let value = document.getElementById('value').value
    addValue(value)
})


document.getElementById('clear').addEventListener('click', function (event) {
    event.preventDefault()
    chrome.storage.sync.clear(function () {
        const list = document.getElementById('keyValuePairs')
        list.innerHTML = ''
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
})


function renderKeyValuePairs() {

    chrome.storage.sync.get(null, function (data) {
        console.log(data)
        var valueArray = Object.values(data)
        var keyArray = Object.keys(data)
        var listIndex = 0;

        for (x in valueArray) {
            var keyValuePair = document.createElement('li');
            keyValuePair.setAttribute('id', listIndex)
            var keySpan = document.createElement('span')
            var valueSpan = document.createElement('span')
            var spaceSpan = document.createElement('span')

            var copyText = document.createElement('button')
            var deletePair = document.createElement('button')
            copyText.classList.add('itemButton')
            deletePair.classList.add('itemButton')
            copyText.innerHTML = 'copy'
            deletePair.innerHTML = 'delete'

            copyText.onclick = function (evt) {
                var textToCopy = evt.path[1].childNodes[2].innerHTML
                var textArea = document.createElement("textarea");
                textArea.value = textToCopy
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("Copy");
                textArea.remove();
                alert(textArea.value + ' has been copied to clipboard')
            }

            deletePair.onclick = function (evt) {
                var id = evt.path[1].id
                var keyToDelete = evt.path[1].childNodes[0].innerHTML
                console.log(keyToDelete)
                var itemToDelete = document.getElementById(id)
                console.log(itemToDelete)
                document.getElementById('keyValuePairs').removeChild(itemToDelete)
                chrome.storage.sync.remove(keyToDelete, function (data) {
                    var error = chrome.runtime.lastError;
                    if (error) {
                        console.error(error);
                    }
                    console.log(data)
                })
            }

            var key = document.createTextNode(keyArray[x])
            var value = document.createTextNode(valueArray[x])
            var space = document.createTextNode(' : ')

            keySpan.appendChild(key)
            spaceSpan.appendChild(space)
            valueSpan.appendChild(value)

            keyValuePair.appendChild(keySpan)
            keyValuePair.appendChild(spaceSpan)
            keyValuePair.appendChild(valueSpan)
            keyValuePair.appendChild(copyText)
            keyValuePair.appendChild(deletePair)

            document.getElementById('keyValuePairs').appendChild(keyValuePair)
            listIndex++
        }
    })
}


function addValue(value) {
    let key = document.getElementById('key').value
    var div = document.querySelector('ul')
    div.innerHTML = ''
    chrome.storage.sync.set({ [key]: value }, function () {
        document.getElementById("form").reset();
        renderKeyValuePairs()
    })
}


