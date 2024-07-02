import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const getHumanitixData = async (eventId) => {
  const response = await fetch(`https://api.humanitix.com/v1/events/${eventId}/orders`, {
    headers: {
      'x-api-key': 'ae4559154a568e0a6f34e519d2df2b0672a0589352d5f7e1087a41c606b3a098571df7f17ae3f703a1ed95ea95cef4f52c4981d4467c479899013f3af5a378d3f002abd663c4e1a1e6a2008694b10d95e0bd47a55a093c54259a0422df63046def344f9356b0a2916f9a18b93ba7e7'
    }
  });

  const data = await response.json();
  return data;
};

const eventIds = ['66835945adee163d1a4112e5', '668342566df0c0087307ed9b']; // event IDs to fetch

const getAllEventAttendees = async () => {
  const allAttendees = [];

  for (const eventId of eventIds) {
    try {
      const ordersData = await getHumanitixData(eventId);
      ordersData.forEach(order => {
        allAttendees.push({ firstName: order.firstName, lastName: order.lastName });
      });
    } catch (error) {
      console.error(`Error fetching orders for event ${eventId}:`, error);
    }
  }

  return allAttendees;
};

const confluenceUsers =  // array of Confluence users to match 
[{
      "firstName": "Melissa",
      "lastName": "Paisley"
    },{
      "firstName": "Mary",
      "lastName": "Bickel"
    }, {
      "firstName": "Kshama",
      "lastName": "Patel"
    }, {
      "firstName": "Laura",
      "lastName": "White"
    },
    {
      "firstName": "Tenzin",
      "lastName": "Shakya"
    }, 
    {
      "firstName": "Yixuan",
      "lastName": "Wang"
    }

]

const resolver = new Resolver();

resolver.define('getLeaderboard', async (req) => {
  const allAttendees = await getAllEventAttendees(); // fetch all attendees from Humanitix orders

  const generateLeaderboard = (allAttendees, confluenceUsers) => {
    const leaderboard = confluenceUsers.map(user => {
      const matchedAttendees = allAttendees.filter(attendee => 
        attendee.firstName === user.firstName && attendee.lastName === user.lastName
      );
      return {
        username: `${user.firstName} ${user.lastName}`,
        count: matchedAttendees.length // count matched attendees
      };
    });

    return leaderboard.sort((a, b) => b.count - a.count);
  };

  const leaderboardData = generateLeaderboard(allAttendees, confluenceUsers);
  console.log('Leaderboard Data:', leaderboardData); // print leaderboard data to terminal

  return leaderboardData
});

export const handler = resolver.getDefinitions();
