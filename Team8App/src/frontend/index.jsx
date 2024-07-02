import React, { useEffect, useState } from 'react';
import ForgeReconciler, { 
  Box, 
  Heading, 
  Image, 
  Inline, 
  Stack, 
  Tab, 
  Tabs, 
  TabPanel, 
  TabList, 
  Text,
  xcss, 
  Button, 
  ModalTransition, 
  Modal, 
  ModalHeader, 
  ModalTitle, 
  ModalBody, 
  LineChart,
  DynamicTable,
  ModalFooter,
  Form,
  Label,
  RequiredAsterisk,
  ValidationMessage,
  Textfield,
  useForm,
  ErrorMessage,
  HelperMessage,
  LinkButton,
  Link,} from '@forge/react';
import { invoke } from '@forge/bridge';

const createKey = (input) => {
  return input?input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}

const presidents = [
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

export const LeaderBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button appearance="primary" onClick={openModal}>
        Open modal
      </Button>

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle>Leaderboard</ModalTitle>
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

const App = () => {

  const cardData = [{
    name: "Volunteering SA&NT",
    imgurUrl: "pzpMdhI.png",
    imgurDescription: "Lunchtime conversation: Volunteering and Human Rights",
    description: "Domestic Short Hair",
  },{
    name: "Walter",
    imgurUrl: "1bCyWtV.png",
    imgurDescription: "Walter, a ginger cat wears a burgundy bow tie",
    description: "Domestic Short Hair",
  },{
    name: "Pickle",
    imgurUrl: "5of4ryw.png",
    imgurDescription: "Pickle is a smol tiny floof, wrapped in a pink blanket",
    description: "Domestic Short Hair",
  },
  {
    name: "Pickle",
    imgurUrl: "5of4ryw.png",
    imgurDescription: "Pickle is a smol tiny floof, wrapped in a pink blanket",
    description: "Domestic Short Hair",
  }
]

  const cardStyle = xcss({
    backgroundColor: 'elevation.surface',
    margin: 'space.200',
    width: '25%',
    padding: 'space.200',
    boxShadow: 'elevation.shadow.overflow',
    borderColor: 'color.border',
    borderWidth: 'border.width',
    borderStyle: 'solid',
    borderRadius: 'border.radius',
    ':hover': {
      backgroundColor: 'elevation.surface.hovered',
      width: '30%'
    },  });

  const priceStyle = xcss({
    backgroundColor: 'color.background.accent.purple.subtler',
    width: '90%',
    marginBottom: 'space.200',
    borderRadius: 'border.radius'
  });

  function Card(Volunteering) {
    return (
      <>
        <Box xcss={cardStyle}>
          <Stack alignInline="center" space="space.200" >
            <Heading as="h2">{Volunteering.name}</Heading>
            <Image src={"https://i.imgur.com/"+ Volunteering.imgurUrl} size="large" alt={Volunteering.imgurDescription}></Image>
            <Box>
              <Stack alignInline="center" space="space.0" >
                <Box><Text>{Volunteering.description}</Text></Box>
              </Stack>
            </Box>
            <Box xcss={priceStyle}>
              <Stack alignInline="center" space="space.0">
                <Box><Text> </Text></Box>
                <Button>Sign Up</Button>
                <Box><Text> </Text></Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </>
    )
  }

  function CardGroup(VolunteeringGroup) {
    return (
      <>
        <Box>
          <Inline alignInline="center">
            {VolunteeringGroup.map(Volunteering => (Card(Volunteering)))}
          </Inline>
        </Box>
      </>
    )
  }

  return (
    <>
      <LeaderBoard/>
      <Inline alignBlock="center">
        <Heading as="h1">Volunteering Opportunity</Heading>
      </Inline>
      <Tabs id="default">
      <Box xcss={{width: '100%'}}>
        {CardGroup(cardData)}
      </Box>
      </Tabs>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);