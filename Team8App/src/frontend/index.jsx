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

const cardData = [{
  name: "Volunteering SA&NT",
  imgurUrl: "u3vSo35qSBKJDv24Zgua",
  imgurDescription: "Lunchtime conversation: Volunteering and Human Rights",
  description: "Lunchtime conversation: Volunteering and Human Rights",
},{
  name: "Volunteering New Zealand",
  imgurUrl: "FL2bk9ZmQDqEIrKaBoPK",
  imgurDescription: "Volunteering Changemakers Hui",
  description: "Volunteering Changemakers Hui",
},{
  name: "Volunteering SA&NT",
  imgurUrl: "KqNMH0T2Txmr2a5lfz7I",
  imgurDescription: "Disability Inclusive Volunteer Management",
  description: "Disability Inclusive Volunteer Management",
},
{
  name: "Collingwood Children's Farm",
  imgurUrl: "WG8BOSMaTqiBtdUN6zUE",
  imgurDescription: "Corporate Volunteering",
  description: "Domestic Short Hair",
},
{
  name: "Nangak Tamboree Wildlife Sanctuary",
  imgurUrl: "P912JxTGQI6OQgSmn703",
  imgurDescription: "Senior's Festival Come and try volunteering",
  description: "Senior's Festival Come and try volunteering",
},
{
  name: "Collingwood Children's Farm",
  imgurUrl: "WG8BOSMaTqiBtdUN6zUE",
  imgurDescription: "Corporate Volunteering",
  description: "Domestic Short Hair",
}
]

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    invoke('getLeaderboard').then(setLeaderboardData);
  }, []);

  console.log('Leaderboard data: ', leaderboardData);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const rows = leaderboardData.map((entry, index) => ({
        key: `row-${index}-${entry.username}`,
        cells: [
          {
            key: `rank-${entry.rank}`,
            content: <Link href="">{entry.rank}</Link>,
          },
          {
            key: createKey(entry.username),
            content: <Link href="">{entry.username}</Link>,
          },
          {
            key: `score-${entry.username}`,
            content: entry.count,
          },
        ],
      }));

  const head = {
    cells: [
      { key: 'Rank', content: 'Rank', isSortable: true },
      { key: 'Name', content: 'Name', shouldTruncate: true, isSortable: true },
      { key: 'Score', content: 'Score', shouldTruncate: true, isSortable: true },
    ],
  };

  return (
    <>
      <Button appearance="primary" onClick={openModal}>
        Volunteer Leaderboard
      </Button>

      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal}>
            <ModalHeader>
              <ModalTitle>Leaderboard</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <>
                  <LineChart data={leaderboardData} xAccessor={'rank'} yAccessor={'count'} colorAccessor={'username'} />
                  <DynamicTable caption="Rankings of Volunteers" head={head} rows={rows} />
                </>
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
const LoginForm = ({ isOpen,onClose  }) => {
  const { handleSubmit, register, getFieldId } = useForm();

  const submit = (data) => {
    console.log(data);
  };

  return (
    <>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={close}>
            <Form onSubmit={handleSubmit(submit)}>
              <ModalHeader>
                <ModalTitle>Sign up</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Stack space="space.100">
                  <Box>
                    <Label labelFor={getFieldId("name")}>Name</Label>
                    <Textfield {...register("name")} />
                  </Box>
                  <Box>
                    <Label labelFor={getFieldId("email")}>Email</Label>
                    <Textfield {...register("email")} />
                  </Box>
                </Stack>
                <Box>
                  <Label labelFor={getFieldId("firstName")}>First Name</Label>
                  <Textfield {...register("firstName")} />
                </Box>
                <Box>
                  <Label labelFor={getFieldId("lastName")}>Last Name</Label>
                  <Textfield {...register("lastName")} />
                </Box>
                <Box>
                  <Label labelFor={getFieldId("country")}>Country</Label>
                  <Textfield {...register("country")} />
                </Box>
                <Box>
                  <Label labelFor={getFieldId("state")}>State</Label>
                  <Textfield {...register("state")} />
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} appearance="subtle">
                  Cancel
                </Button>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
}

const App = () => {

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const cardStyle = xcss({
    backgroundColor: 'elevation.surface',
    margin: 'space.200',
    width: '25%',
    height: '50%',
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

  const SignUpStyle = xcss({
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
            <Image src={"https://cdn.filestackcontent.com/compress/output=format:webp/cache=expiry:max/resize=width:1250/"+ Volunteering.imgurUrl} size="large" alt={Volunteering.imgurDescription}></Image>
            <Box>
              <Stack alignInline="center" space="space.0" >
                <Box><Text>{Volunteering.description}</Text></Box>
              </Stack>
            </Box>
            <Box xcss={SignUpStyle}>
              <Stack alignInline="center" space="space.0">
                <Box><Text> </Text></Box>
                <Button onClick={open}>Sign Up</Button>
                <Box><Text> </Text></Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </>
    )
  }

  function CardGroup(VolunteeringGroup) {
    const midpoint = Math.ceil(VolunteeringGroup.length / 2);
    const VolunteeringGroup1 = VolunteeringGroup.slice(0, midpoint);
    const VolunteeringGroup2 = VolunteeringGroup.slice(midpoint);
    return (
      <>
        <Box>
          <Inline alignInline="center">
            {VolunteeringGroup1.map(Volunteering => (Card(Volunteering)))}
          </Inline>
          <Inline alignInline="center">
            {VolunteeringGroup2.map(Volunteering => (Card(Volunteering)))}
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
      <LoginForm isOpen={isOpen} onClose={close} />
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);