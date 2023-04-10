const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

async function get_courses(department) {
  const payload = qs.stringify({
    dept: department,
    maxRes: 10000,
  });

  const headers = {
    'authority': 'www.scu.edu',
    'accept': '*/*',
    'x-requested-with': 'XMLHttpRequest',
    'user-agent': process.env.USER_AGENT,
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'sec-gpc': '1',
    'origin': 'https://www.scu.edu',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'accept-language': 'en-US,en;q=0.9',
  };

  const response = await axios.post('https://www.scu.edu/apps/ws/courseavail/search/4440/ugrad', payload, {headers});
  const data = response.data;
  return data;
}

async function main() {
  const data = await get_courses('POLI');
  for (const info of data.results) {
    if (info.class_nbr === '59098') {
      console.log(`Seats Remaining in Senzai's POLI 2: ${info.seats_remaining}`);
    }
  }
}

main();
