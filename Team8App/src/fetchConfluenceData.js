import { api } from '@forge/bridge';

const getConfluenceUserData = async () => {
  const response = await api.asApp().requestConfluence('/wiki/rest/api/user/search?cql=type=user&maxResults=1000');
  const data = await response.json();
  return data.results;
};
