import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, DynamicTable, Link, LineChart } from '@forge/react';
import { invoke } from '@forge/bridge';


export const presidents = [
  {
    id: 1,
    name: "George Washington",
    score: 613,
  },
  {
    id: 2,
    name: "John Adams",
    score: 563,
  },
  {
    id: 3,
    name: "Thomas Jefferson",
    score: 358,
  },
  {
    id: 4,
    name: "James Madison",
    score: 203,
  },
  {
    id: 5,
    name: "James Monroe",
    score: 150,
  },
];


const createKey = (input) => {
  return input?input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}

// applied as rows in the form
const rows = presidents.map((president, index) => ({
  key: `row-${index}-${president.name}`,
  cells: [
    {
      key: president.id,
      content: <Link href="">{president.id}</Link>,
    },
    {
      key: createKey(president.name),
      content: <Link href="">{president.name}</Link>,
    },
    {
      key: president.score,
      content: president.score,
    },
  ],
}));

const head = {
  cells: [
    {
      key: "id",
      content: "id",
      isSortable: true,
    },
    {
      key: "Name",
      content: "Name",
      shouldTruncate: true,
      isSortable: true,
    },
    {
      key: "Score",
      content: "Score",
      shouldTruncate: true,
      isSortable: true,
    },
  ],
};

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <>
      <LineChart 
        data={presidents} 
        xAccessor={'id'} 
        yAccessor={'score'} 
        colorAccessor={'name'}
      />;
      <DynamicTable
        caption="List of US Presidents"
        head={head}
        rows={rows}
      />
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
