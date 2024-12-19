/*console.log("Hello world!");
const newsSection = document.getElementsByClassName("news");
var xmlDoc = '';

async function fetchXML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "application/xml");
        console.log(xmlDoc);

        const title = xmlDoc.getElementsByTagName("title")[0].text;
        newsSection[0].innerHTML += `<h1>${title}</h1>`

    } catch (error) {
        console.error('Error fetching XML:', error);
    }
}

fetchXML('rss.xml');*/
console.log("Hello world!");

const newsSection = document.getElementsByClassName("news")[0]; // Access the first element with the 'news' class

var xmlDoc = '';

async function fetchXML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "application/xml");
        console.log(xmlDoc);

        const items = Array.from(xmlDoc.getElementsByTagName("item"));
        items.forEach((item, index) => {
                                    
            const title = item.getElementsByTagName("title")[0]?.textContent || "No Title";
            const description = item.getElementsByTagName("description")[0].textContent || "no description";
            newsSection.innerHTML += `<div class="newsElement"><a href="news.html" onclick="saveDescription('${description}')"><h1>${title}</h1></a></div>`;
        
        })

    } catch (error) {
        console.error('Error fetching XML:', error);
    }
}

function saveDescription(description) {
    sessionStorage.setItem('newsDescription', description); // Store in sessionStorage
}


fetchXML('rss.xml');

