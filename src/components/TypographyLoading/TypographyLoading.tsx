import { Skeleton, SkeletonProps } from '@mui/material';
import React from 'react';

interface IProps {
  content: React.ReactNode;
  loading: boolean;
  skeletonProps?: SkeletonProps;
}

const TypographyLoading = (props: IProps) => {
  const { content, loading, skeletonProps } = props;
  return <>{loading ? <Skeleton variant="rounded" width={'40px'} sx={{ minHeight: '14px' }} height="100%" {...skeletonProps} /> : content}</>;
};

export default TypographyLoading;
