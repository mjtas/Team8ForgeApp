import { storage } from '@forge/api';
import { api } from '@forge/api';

export async function matchUsersAndStoreData(humanitixData) {
  const confluenceUsersResponse = await api.asApp().requestConfluence('/wiki/rest/api/user/search?cql=type=user');
  const confluenceUsers = await confluenceUsersResponse.json();

  const matchedUsers = humanitixData.tickets.filter(ticket => 
    confluenceUsers.some(user => user.email === ticket.email));

  const userTicketsCount = matchedUsers.reduce((acc, ticket) => {
    acc[ticket.email] = (acc[ticket.email] || 0) + 1;
    return acc;
  }, {});

  await storage.set('userTicketsCount', userTicketsCount);  //user.accountId 
}

