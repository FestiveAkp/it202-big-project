// Logic for dictionary functionality

async function queryDictionary(word) {
    // See if the word has been searched before, we can just grab the result from IndexedDB then
    const definitionInHistory = await db.searches.get(word);

    if (definitionInHistory === undefined) {
        // This is a unique search, go to the API
        const api = 'https://wordsapiv1.p.rapidapi.com/words/';
    
        let response = await fetch(api + word, {
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": "57368629e3msh7692a01be021d2ep14d981jsnc3f2f5d052c0"
            }
        });
        let data = await response.json();
        console.log(data);
        return data;
    }
    else {
        // We've searched for this before
        return definitionInHistory;
    }
}


function clearUI() {
    console.log('clearing ui');
    document.querySelector('#word-title').textContent = '';
    document.querySelector('#pronunciation').textContent = '';
    document.querySelector('#syllables').textContent = '';
    document.querySelectorAll('.definition').forEach(d => d.remove());
}


function updateUI(result) {
    document.querySelector('#word-title').textContent = result.word;
    
    const pronunciation = document.querySelector('#pronunciation');
    pronunciation.textContent = `[ ${result.pronunciation.all || result.pronunciation} ]`;
    pronunciation.classList.add('mdc-typography--subtitle1');

    const syllables = document.querySelector('#syllables');
    syllables.textContent = result.syllables.list.join('\u00B7');
    syllables.classList.add('mdc-typography--subtitle1');
    

    document.querySelector('#syllables').textContent 

    result.results.forEach(definition => {
        const listingPartOfSpeech = document.createElement('span');
        listingPartOfSpeech.textContent = definition.partOfSpeech;
        listingPartOfSpeech.classList.add('part-of-speech');
        
        const listingDefinition = document.createElement('span');
        listingDefinition.textContent = " - " + definition.definition;
        listingDefinition.classList.add('definition');
        
        const listing = document.createElement('li');
        listing.classList.add('definition', 'mdc-typography--body1');
        listing.append(listingPartOfSpeech, listingDefinition);
        
        // If the definition has an example, show it
        if (definition.examples != null) {
            const exampleListing = document.createElement('li');
            exampleListing.textContent = definition.examples[0];
            exampleListing.classList.add('example', 'mdc-typography--body2');
            
            const exampleList = document.createElement('ul');
            exampleList.appendChild(exampleListing);
    
            listing.appendChild(exampleList);
        }

        // Add definition to list
        document.querySelector('#definitions').appendChild(listing);
    });
}


// IndexedDB store for search history
const db = new Dexie('dictionary_db');
db.version(1).stores({
    searches: 'word'
});

function updateStore(data) {
    // Put a new entry in the table, then update the history view
    db.searches.put(data)
    .then(() => updateHistoryView());
}

function updateHistoryView() {
    const list = document.querySelector('#history-list');

    // Clear what's already on the screen
    list.textContent = '';

    // Add an entry for each entry in the table
    db.searches.each(search => {
        const historyText = document.createElement('span');
        historyText.textContent = search.word;
        historyText.classList.add('mdc-list-item__text');

        const historyListing = document.createElement('li');
        historyListing.classList.add('mdc-list-item');

        historyListing.appendChild(historyText);
        list.appendChild(historyListing);

        // When the listing is clicked, search for the word
        historyListing.addEventListener('click', () => {
            document.querySelector('#search-input').value = search.word;
            document.querySelector('#search-button').click();
            document.querySelector('#search-input').value = '';
            routeTo('search');
        })
    });
}


// When the search button is clicked, query the API and build view
document.querySelector('#search-button').addEventListener('click', () => {
    const searchValue = document.querySelector('#search-input').value;

    if (searchValue !== '') {
        const loading = createLoadingIcon();
        document.querySelector('main').prepend(loading);

        queryDictionary(searchValue)
            .then(result => {
                loading.remove();
                clearUI();
                updateUI(result);
                updateStore(result);
                // routeTo('result');
            });
    }
});

// Update the history view with entries that are already in the IndexedDB
updateHistoryView();
