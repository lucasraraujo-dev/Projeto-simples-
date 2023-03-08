function search() {
	// Verifique se o campo de pesquisa não está vazio
	if (searchTerm === '') {
		alert('Please enter a search term');
		return;
	}

	// Limpe os resultados anteriores, se houver algum
	searchResults.innerHTML = '';

	// Use a API do Google para buscar resultados
	const apiKey = 'YOUR_API_KEY_HERE';
	const cx = 'YOUR_SEARCH_ENGINE_ID_HERE';
	const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&searchType=image`;

	fetch(url)
	.then(response => response.json())
	.then(data => {
		// Verifique se há resultados
		if (!data.items || data.items.length === 0) {
			alert('No results found');
			return;
		}

		// Adicione cada resultado à lista de resultados
		data.items.forEach(item => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = item.link;
			a.textContent = item.title;
			li.appendChild(a);
			searchResults.appendChild(li);
		});
	})
	.catch(error => {
		alert('An error occurred while fetching search results');
		console.error(error);
	});
}

searchButton.addEventListener('click', function() {
	const searchTerm = searchInput.value;
	search();
});
