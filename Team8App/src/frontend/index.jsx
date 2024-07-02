import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Table, Head, Row, Cell } from '@forge/react';
import { invoke, requestConfluence } from '@forge/bridge';

const App = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null); //chart is array 


  // const getConfluenceUserData = async () => { //not needed 
  //   response = await requestConfluence('/wiki/rest/api/search/user?cql={user.fullname~Ksh}');
  //   data = await response.json();
  //   console.log(data);
  //   return data.results;
  // };

  // useEffect(() => {
  //   getConfluenceUserData()  ;
  // }, [])

  useEffect(() => {
    // Fetch the leaderboard data using the 'invoke' function
    // invoke('getLeaderboard').then(setLeaderboardData);
    invoke('getHumanitix').then(setData); //
  }, []); 

  useEffect(() => {
    // Fetch the leaderboard data using the 'invoke' function
    // invoke('getLeaderboard').then(setLeaderboardData);
    console.log("data has changed") //for debugging 
    //TODO: process data and store it in chart variable 
    //use setChart() method to update chart array  
  }, [data]); 

  return (
    <>
      {console.log(data)}
      <Text>Leaderboard</Text>
      {data ? (
        <Table>
          <Head>
            <Cell>User</Cell>
            <Cell>Tickets Bought</Cell>
          </Head>
          {data.tickets.map(({ ticket}) => ( //use chart.map instead of data.tickets and user instead of ticket (add more fields below where neccessary)
            <Row key={ticket.firstName}>
              <Cell>{ticket.firstName}</Cell>
              <Cell>{1}</Cell> 
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
