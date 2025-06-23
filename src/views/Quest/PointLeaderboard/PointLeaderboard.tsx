import React from 'react';
import QuestLeaderboard from 'src/components/Table/QuestLeaderboard/QuestLeaderboard';
import QuestUserRank from 'src/components/Table/QuestLeaderboard/QuestUserRank';
import AnnouncementLeaderboard from '../Announcement/AnnouncementLeaderboard';
import BlankPage from 'src/components/Quest/BlankPage/BlankPage';
import { useAuthState } from 'src/jotai/auth/auth';
import { Helmet } from 'react-helmet';

const PointLeaderboard = () => {
  const { isLogin } = useAuthState();

  if (!isLogin) {
    return (
      <>
        <Helmet>
          <title>TCV | Point Leaderboard</title>
        </Helmet>
        <AnnouncementLeaderboard />
        <BlankPage />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>TCV | Point Leaderboard</title>
      </Helmet>
      <AnnouncementLeaderboard />

      <QuestLeaderboard />

      <QuestUserRank />
    </>
  );
};

export default PointLeaderboard;
