import Resolver from '@forge/resolver';
import {fetch} from '@forge/api';
import { requestConfluence } from '@forge/bridge';


const getHumanitixData = async () => {
  const response = await fetch('https://api.humanitix.com/v1/events/5ee71c2bc42165000727beeb/tickets?page=1', {
    headers: {
      'x-api-key': `ae4559154a568e0a6f34e519d2df2b0672a0589352d5f7e1087a41c606b3a098571df7f17ae3f703a1ed95ea95cef4f52c4981d4467c479899013f3af5a378d3f002abd663c4e1a1e6a2008694b10d95e0bd47a55a093c54259a0422df63046def344f9356b0a2916f9a18b93ba7e7`
    }
  });

  const data = await response.json();
  return data;
};

const eventIds = ['66835945adee163d1a4112e5', '668342566df0c0087307ed9b']; // event IDs to fetch

const getAllEventTickets = async () => {
  const allTickets = [];

  for (const eventId of eventIds) {
    try {
      const eventData = await getHumanitixData(eventId);
      allTickets.push({ eventId, tickets: eventData });
    } catch (error) {
      console.error(`Error fetching tickets for event ${eventId}:`, error);
    }
  }

  return allTickets;
};

const getConfluenceUserData = async () => {
  const response = await requestConfluence('/wiki/rest/api/search/user?cql={cql}');
  const data = await response.json();
  return data.results;
};

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'Hello, world!';
});

resolver.define('getConfluence', async (req) => {
  return getConfluenceUserData()
});

resolver.define('getHumanitix', async (req) => {
  return getHumanitixData()
});


resolver.define('getLeaderboard', (req) => {
  const generateLeaderboard = (humanitixData, confluenceUserData) => {
    const leaderboard = confluenceUserData.map(user => {
      const tickets = humanitixData.filter(ticket => ticket.user.email === user.email);
      return {
        username: user.username,
        tickets: tickets.length
      };
    });
  
    return leaderboard.sort((a, b) => b.tickets - a.tickets);
  };
});


export const handler = resolver.getDefinitions();



