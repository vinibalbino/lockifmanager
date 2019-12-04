const axios = require('axios');
const crypto = require('crypto');

const id = '5de660ef43b156fbcb114c8b';
function createHeaders() {
  let time = Date.now()/1000;
  let signature = sign(time);
  return {
    'x-sauth-time': time,
    'x-sauth-application-signature': signature,
    'x-sauth-application-key': id,
  };
}

function sign(time) {
  let token = '51a608d8-20b9-488c-a834-1603e084a934';
  let hmac = crypto.createHmac('sha1', id);
  hmac.update(token+time);
  return hmac.digest('hex');
}

axios.get('http://localhost:8080/pad/5de660ef43b156fbcb114c8b/wemos', {
  headers: createHeaders()
})
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });