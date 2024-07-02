import { fetchHumanitixData } from './fetchHumanitixData';
import { matchUsersAndStoreData } from './matchUsersAndStoreData';

export async function syncTickets() {
  const humanitixData = await fetchHumanitixData();
  await matchUsersAndStoreData(humanitixData);
}
