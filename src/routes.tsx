// import LayoutPrivate from './layout/LayoutPrivate';
// import { urlPrivateSale } from './layout/menu';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import { lazy } from 'react';

// import { urlPrivateSale } from './layout/menu';
const Airdrop = lazy(() => import('./views/Airdrop'));
const ConvertTCP = lazy(() => import('./views/ConvertTCP'));
const TodConvert = lazy(() => import('./views/ConvertTOD'));
const LeaderBoard = lazy(() => import('./views/LeaderBoard'));
const LiquidityDex = lazy(() => import('./views/Liquidity/LiquidityDex/LiquidityDex'));
const DailyQuest = lazy(() => import('./views/Quest/DailyQuest'));
const PointLeaderboard = lazy(() => import('./views/Quest/PointLeaderboard/PointLeaderboard'));
const SocialQuest = lazy(() => import('./views/Quest/SocialQuest'));
const SpecialQuest = lazy(() => import('./views/Quest/SpecialQuest'));
const Faucet = lazy(() => import('./views/faucet/Faucet'));
const Dashboard = lazy(() => import('./views/Dashboard'));
const ProjeetTrade = lazy(() => import('./views/YieldFlex'));
const Governance = lazy(() => import('./views/Governance'));
const ProposalDetail = lazy(() => import('./views/Governance/components/Proposal/components/ProposalDetail'));
const AutoRaid = lazy(() => import('./views/AutoRaid'));

export default function RouterUrl() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Navigate to={'/liquidity'} /> },
        {
          path: '',
          element: <Outlet />,
          children: [{ path: 'liquidity', element: <LiquidityDex /> }],
        },
        { path: 'faucet', element: <Faucet /> },
        {
          path: 'campaign',
          element: <Airdrop />,
        },

        {
          path: '',
          element: <Outlet />,
          children: [
            {
              path: '/yieldFlex',
              element: <ProjeetTrade />,
            },
          ],
        },

        {
          path: `/leader_board`,
          children: [{ path: '', element: <LeaderBoard /> }],
        },
        {
          path: `/convert_tcp`,
          children: [{ path: '', element: <ConvertTCP /> }],
        },
        {
          path: `/convert_tod`,
          children: [{ path: '', element: <TodConvert /> }],
        },
        {
          path: `/dashboard`,
          children: [{ path: '', element: <Dashboard /> }],
        },
        {
          path: '',
          element: <Outlet />,
          children: [
            {
              path: 'quest/daily_quest',
              element: <DailyQuest />,
            },
            {
              path: 'quest/social_quest',
              element: <SocialQuest />,
            },
            {
              path: 'quest/special_quest',
              element: <SpecialQuest />,
            },
            {
              path: 'quest/leaderboard',
              element: <PointLeaderboard />,
            },
          ],
        },
        {
          path: 'governance',
          element: <Outlet />,
          children: [
            {
              path: '',
              element: <Governance />,
            },
            {
              path: '/governance/:index/:id',
              element: <ProposalDetail />,
            },
          ],
        },
        {
          path: `/autoRaid`,
          children: [{ path: '', element: <AutoRaid /> }],
        },
      ],
    },
    // {
    //   path: '',
    //   element: <Outlet />,
    //   children: [
    //     {
    //       path: '/market',
    //       element: <Market />,
    //     },
    //     { path: '/market/:marketId', element: <DetailMarket /> },
    //   ],
    // },
    // {
    //   path: '',
    //   element: <Outlet />,
    //   children: [
    //     { path: '/pool', element: <Pool /> },
    //     { path: '/pool/:poolId', element: <DetailPool /> },
    //   ],
    // },
    // { path: 'portfolio', element: <Portfolio /> },
    // { path: 'early_seed', element: <EarlySeed /> },
    // {
    //   path: `/${urlPrivateSale}`,
    //   element: <LayoutPrivate />,
    //   children: [{ path: '', element: <Privatesale /> }],
    // },
  ]);
}
