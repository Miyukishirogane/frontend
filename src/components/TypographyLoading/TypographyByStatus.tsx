import { Skeleton, SkeletonProps, Typography, TypographyProps } from '@mui/material';
import React from 'react';

export type TStatusTypography = 'error' | 'idle' | 'pending' | 'success';
type TProps = {
  children: React.ReactNode;
  status: TStatusTypography;
  errorContent?: string;
  skeletonProps?: SkeletonProps;
} & TypographyProps;

const TypographyByStatus = (props: TProps) => {
  const { status, skeletonProps, errorContent = '- -', children, ...rest } = props;

  if (status === 'pending' || status === 'idle')
    return <Skeleton variant="rounded" width={'40px'} sx={{ minHeight: '14px' }} height="100%" {...skeletonProps} />;

  if (status === 'error') return <Typography {...rest}>{errorContent}</Typography>;
  if (status === 'success') return <Typography {...rest}>{children}</Typography>;

  return null;
};

export default TypographyByStatus;
