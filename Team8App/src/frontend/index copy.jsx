import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Table, Head, Row, Cell } from '@forge/react';
import { invoke, requestConfluence } from '@forge/bridge';

const App = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [data, setData] = useState(null);


  const getConfluenceUserData = async () => {
    const response = await requestConfluence('/wiki/rest/api/search/user?cql=type=user&maxResults=1000');
    const data = await response.json();
    return data.results;
  };

  useEffect(() => {
    setData = getConfluenceUserData();
  })

  useEffect(() => {
    // Fetch the leaderboard data using the 'invoke' function
    // invoke('getLeaderboard').then(setLeaderboardData);
    invoke('getConfluence').then(setData);
  }, []);

  return (
    <>
      {console.log(data)}
      <Text>Leaderboard</Text>
      {leaderboardData ? (
        <Table>
          <Head>
            <Cell>User</Cell>
            <Cell>Tickets Bought</Cell>
          </Head>
          {leaderboardData.map(({ email, count }) => (
            <Row key={email}>
              <Cell>{email}</Cell>
              <Cell>{count}</Cell>
            </Row>
          ))}
        </Table>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
