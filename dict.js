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
}


// When the search button is clicked, query the API for that search term
document.querySelector('#search-button').addEventListener('click', () => {
    const searchValue = document.querySelector('#search-input').value;
    queryDictionary(searchValue);
});
