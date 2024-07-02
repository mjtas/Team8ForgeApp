const fetch = require('node-fetch');

const getHumanitixData = async () => {
  const response = await fetch('https://api.humanitix.com/v1/events/{eventId}/tickets', {
    headers: {
      'x-api-key': `ae4559154a568e0a6f34e519d2df2b0672a0589352d5f7e1087a41c606b3a098571df7f17ae3f703a1ed95ea95cef4f52c4981d4467c479899013f3af5a378d3f002abd663c4e1a1e6a2008694b10d95e0bd47a55a093c54259a0422df63046def344f9356b0a2916f9a18b93ba7e7`
    }
  });

  const data = await response.json();
  return data;
};