const generateLeaderboard = (humanitixData, confluenceUserData) => {
  const leaderboard = confluenceUserData.map(user => {
    const tickets = humanitixData.filter(ticket => ticket.user.email === user.email);
    return {
      username: user.username,
      tickets: tickets.length
    };
  });

  return leaderboard.sort((a, b) => b.tickets - a.tickets);
};
