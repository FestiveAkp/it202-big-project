// Logic for dictionary functionality

async function queryDictionary(word) {
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


// When the search button is clicked, query the API for that search term
document.querySelector('#search-button').addEventListener('click', () => {
    const searchValue = document.querySelector('#search-input').value;
    
    queryDictionary(searchValue)
        .then(result => updateUI(result));
});
