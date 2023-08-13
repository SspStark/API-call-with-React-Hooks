import LeaderBoardRow from "../LeaderBoardRow";

import {
  LeaderBoardTableContainer,
  LeaderBoardHeader,
  Rank,
  Name,
  Score,
  Language,
  TimeSpent,
} from "./styledComponents";

const LeaderBoardTable = (props) => {
  const { leaderBoardData } = props;

  const renderLeaderBoardHeader = () => (
    <LeaderBoardHeader>
      <Rank>Rank</Rank>
      <Name>Name</Name>
      <Score>Score</Score>
      <Language>Language</Language>
      <TimeSpent>Time Spent</TimeSpent>
    </LeaderBoardHeader>
  );

  return (
    <LeaderBoardTableContainer>
      {renderLeaderBoardHeader()}
      {leaderBoardData.map((eachUser) => (
        <LeaderBoardRow key={eachUser.id} userDetails={eachUser} />
      ))}
    </LeaderBoardTableContainer>
  );
};

export default LeaderBoardTable;
