const fetch = require('node-fetch');

const getHumanitixData = async () => {
  const response = await fetch('https://api.humanitix.com/v1/events/{eventId}/tickets', {
    headers: {
      'Authorization': `Bearer YOUR_HUMANITIX_API_KEY`
    }
  });

  const data = await response.json();
  return data;
};