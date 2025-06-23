import { Box } from '@mui/material';
import TableLeaderBoard from 'src/components/Table/LeaderBoard/TableLeaderBoard';
import TableUserRank from 'src/components/Table/LeaderBoard/TableUserRank';
import AnnouncementLeaderBoard from './Announcement/Announcement';
import Slider from 'react-slick';
import AnnouncementLiquidity from '../Liquidity/Announcement/Announcement';
import { Helmet } from 'react-helmet';

const LeaderBoard = () => {
  return (
    <>
      <Helmet>
        <title>TCV | Leaderboard</title>
      </Helmet>

      <Box sx={{ mt: '20px' }}>
        <Slider
          className="slider_container"
          infinite={true}
          slidesToShow={1}
          speed={500}
          autoplay={true}
          autoplaySpeed={10000}
        >
          <AnnouncementLiquidity />
          <AnnouncementLeaderBoard />
        </Slider>

        <TableLeaderBoard />
      </Box>

      <Box sx={{ mt: '20px', pb: 4, textAlign: 'center' }}>
        <TableUserRank />
      </Box>
    </>
  );
};

export default LeaderBoard;
