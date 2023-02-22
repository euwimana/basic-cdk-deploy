const url = `https://${window.apiId}.execute-api.us-west-2.amazonaws.com/prod`;

let count = 10;

setInterval(() => {
  document.querySelector('#timer').textContent = `Fetching in ${count--} sec`;

  if (count >= 0) return

  count = 10;
  fetchAndUpdate();
}, 1000);

function fetchAndUpdate() {
  fetch(`${url}/quotes`).then((response) => response.json()).then((body) => {
    document.querySelector('#content').textContent = body.content;
    document.querySelector('#author').textContent = `by ${body.author}`;
  });
}

fetchAndUpdate();
