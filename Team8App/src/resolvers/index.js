import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const eventIds = ['66835945adee163d1a4112e5', '668342566df0c0087307ed9b']; // Event IDs to fetch

const getHumanitixData = async (eventId) => {
  const response = await fetch(`https://api.humanitix.com/v1/events/${eventId}/tickets?page=1`, {
    headers: {
      'x-api-key': `ae4559154a568e0a6f34e519d2df2b0672a0589352d5f7e1087a41c606b3a098571df7f17ae3f703a1ed95ea95cef4f52c4981d4467c479899013f3af5a378d3f002abd663c4e1a1e6a2008694b10d95e0bd47a55a093c54259a0422df63046def344f9356b0a2916f9a18b93ba7e7`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data for event ${eventId}`);
  }

  return await response.json();
};

const resolver = new Resolver();

resolver.define('getHumanitix', async (req) => {
  const { eventId } = req.payload; // Get eventId from the request payload
  if (!eventId) {
    throw new Error('Event ID is required');
  }
  return getHumanitixData(eventId);
});

const getAllEventAttendees = async () => {
  const allAttendees = [];

  try {
    const ticketDataArray = await Promise.all(eventIds.map(eventId => getHumanitixData(eventId)));

    ticketDataArray.forEach(ticketData => {
      ticketData.forEach(ticket => {
        allAttendees.push({ firstName: ticket.firstName, lastName: ticket.lastName });
      });
    });
  } catch (error) {
    console.error('Error fetching tickets for events:', error);
  }

  console.log('Attendee Data:', allAttendees);
  return allAttendees;
};

resolver.define('getAttendees', async () => {
  return getAllEventAttendees();
});

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

console.log('Confluence User Data:', confluenceUsers); // print user data to terminal

resolver.define('getLeaderboard', async (req) => {
  const allAttendees = await getAllEventAttendees(); // fetch all attendees from Humanitix orders
  const generateLeaderboard = (allAttendees, confluenceUsers) => {
    const counter = {};

    // Count occurrences of each user in allAttendees
    allAttendees.forEach(attendee => {
      const key = `${attendee.firstName} ${attendee.lastName}`;
      counter[key] = (counter[key] || 0) + 1;
    });

    // Create leaderboard array based on confluenceUsers
    const leaderboard = confluenceUsers.map(user => {
    const username = `${user.firstName} ${user.lastName}`;
    //const count = counter[username] || 0;
    const count = Math.floor(Math.random() * 10) + 1;
    return { username, count };
    });

    // Sort leaderboard by count in descending order
    leaderboard.sort((a, b) => b.count - a.count);

    // Assign rank based on the sorted order
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1; // Assign rank (index + 1)
    });

    // Return only the top 5 entries
    return leaderboard.slice(0, 5);
  };

  const leaderboardData = generateLeaderboard(allAttendees, confluenceUsers);

  return leaderboardData;
})


export const handler = resolver.getDefinitions();
