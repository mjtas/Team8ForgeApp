import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Table, Head, Row, Cell } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    // Fetch the leaderboard data using the 'invoke' function
    invoke('getLeaderboard').then(setLeaderboardData);
  }, []);

  return (
    <>
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
