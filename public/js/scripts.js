var $email = $('.email');
var $app = $('.app');
var $form = $('.token-form');

$form.on('submit', getToken);

async function getToken(event) {
  event.preventDefault();
  const url = '/authenticate';
  const email = $('.email').val();
  const appName = $('.app').val();
  const data = { email, appName }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
  const token = await response.json()
  console.log(token)
}