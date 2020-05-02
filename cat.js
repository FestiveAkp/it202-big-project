fetch('https://api.thecatapi.com/v1/images/search', {
    headers: {
        'x-api-key': 'bc36e402-ec3a-4981-bc67-3dcb038382b0'
    }
})
.then(response => response.json())
.then(data => {
    document.querySelector('#cat-image').setAttribute('src', data[0].url);
});
