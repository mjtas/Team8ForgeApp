import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const eventIds = ['66835945adee163d1a4112e5', '668342566df0c0087307ed9b']; // Event IDs to fetch

const getHumanitixData = async (eventId) => {
  const response = await fetch(`https://api.humanitix.com/v1/events/${eventId}/tickets?page=1`, {
    headers: {
      'x-api-key': 'your-api-key-here'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data for event ${eventId}: ${response.statusText}`);
  }

  return await response.json();
};

const getAllEventAttendees = async () => {
  const allAttendees = [];

  try {
    const results = await Promise.allSettled(eventIds.map(eventId => getHumanitixData(eventId)));

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const ticketData = result.value;

        if (Array.isArray(ticketData)) {
          ticketData.forEach(ticket => {
            if (ticket.firstName && ticket.lastName) {
              allAttendees.push({ firstName: ticket.firstName, lastName: ticket.lastName });
            } else {
              console.warn(`Incomplete ticket data:`, ticket);
            }
          });
        } else {
          console.error(`Invalid data for event ${eventIds[index]}:`, ticketData);
        }
      } else {
        console.error(`Failed to fetch data for event ${eventIds[index]}:`, result.reason);
      }
    });
  } catch (error) {
    console.error('Error fetching tickets for events:', error);
  }

  console.log('Attendee Data:', allAttendees);
  return allAttendees;
};

const confluenceUsers = [
  { firstName: "Melissa", lastName: "Paisley" },
  { firstName: "Mary", lastName: "Bickel" },
  { firstName: "Kshama", lastName: "Patel" },
  { firstName: "Laura", lastName: "White" },
  { firstName: "Tenzin", lastName: "Shakya" },
  { firstName: "Yixuan", lastName: "Wang" }
];

const generateLeaderboard = (allAttendees, confluenceUsers) => {
  const counter = {};

  allAttendees.forEach(attendee => {
    const key = `${attendee.firstName} ${attendee.lastName}`;
    counter[key] = (counter[key] || 0) + 1;
  });

  const leaderboard = confluenceUsers.map(user => {
    const username = `${user.firstName} ${user.lastName}`;
    //const count = counter[username] || 0;
    const count = Math.floor(Math.random() * 10) + 1;
    return { username, count };
  });

  leaderboard.sort((a, b) => b.count - a.count);

  leaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  return leaderboard.slice(0, 5);
};

const resolver = new Resolver();

resolver.define('getHumanitix', async (req) => {
  const { eventId } = req.payload;
  if (!eventId) {
    throw new Error('Event ID is required');
  }
  return getHumanitixData(eventId);
});

resolver.define('getAttendees', async () => {
  return getAllEventAttendees();
});

resolver.define('getLeaderboard', async () => {
  const allAttendees = await getAllEventAttendees();
  const leaderboardData = generateLeaderboard(allAttendees, confluenceUsers);
  return leaderboardData;
});

export const handler = resolver.getDefinitions();