const button = document.getElementById("click");
const city = document.getElementById("city");
const name = document.getElementById("name");
const description = document.getElementById("description");
const url = document.getElementById("url");

async function getData(countryCode) {
    try {
        const response = await fetch(`/api/top-headlines?countryCode=${countryCode}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("API request failed with status:", response.status, "Response text:", errorText);
            return { articles: [] };
        }
        
        return await response.json();
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        return { articles: [] };
    }
}

button.addEventListener('click', async () => {
    const countryCode = city.value;
    console.log("Country Code:", countryCode); // For debugging
    const result = await getData(countryCode);

    if (result.articles && result.articles.length > 0) {
        const article = result.articles[0];
        name.innerText = article.source.name || 'N/A';
        description.innerText = article.description || 'N/A';
        url.innerHTML = article.url ? `<a href="${article.url}" target="_blank">Read more about the news</a>` : 'N/A';
    } else {
        name.innerText = 'No results found';
        description.innerText = '';
        url.innerHTML = '';
    }
});
