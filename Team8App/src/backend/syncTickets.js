import { fetchHumanitixData } from './fetchHumanitixData';
import { matchUsersAndStoreData } from './matchUsersAndStoreData';

const resolver = new Resolver();

export async function syncTickets() {
  const humanitixData = await fetchHumanitixData();
  await matchUsersAndStoreData(humanitixData);
}

export const syncTicketsHandler = resolver.getDefinitions();