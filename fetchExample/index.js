

const field = document.getElementById("jokeSection");



  fetch('https://v2.jokeapi.dev/joke/Any')
  .then(response => response.json()) 
  .then(data => {
    if (data.type === 'single') {
    console.log('Joke:', data.joke);  
    field.innerHTML = data.joke;
    } else if (data.type === 'twopart') {
      console.log('Setup:', data.setup); 
      console.log('Delivery:', data.delivery);  
      field.innerHTML = `<p>${data.setup}</p><p><strong>${data.delivery}</strong></p>`;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
