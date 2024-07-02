# Team8ForgeApp

In today’s fast paced world, fostering volunteering engagement and recognising contribution is more important than ever
Our solution, a leaderboard that integrates Humanitix event and participation data into Confluence, celebrates the achievements of volunteers to inspire motivation and competition in the community
Our solution addresses the prompt by leveraging technology to create a cohesive solution that promotes and encourages active engagement with philanthropic endeavours

**Backend**
1. We use the Humanitix API to retrieve ticket data from Humanitix
2. We match Humanitix participants to Confluence users based on first and last names and store participant information.
3. We use a counter to rank participants by number of events attended and generate the leaderboard of top 5 participants

**Frontend**
Key Components and features:
- Volunteering opportunities: we display listings of volunteer opportunities and provide a button for users to sign up for available opportunities
- Leaderboard Table: we display a sorted list and line chart of top participants based on event participation counts fetched from backend APIs

**Future Scope and Opportunities**
Using the Confluence API to obtain Confluence user details 
Implementing functionality for users to be awarded badges through volunteering/donating
Fetching volunteering events from Humanitix to be displayed on the Confluence page 
Implementing autofill from profile information when signing up for events or donations. By streamlining this process, we will reduce any friction to the experience and encourage repeat participation 
