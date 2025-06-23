import { Container } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { IconSpinLoading } from 'src/assets/icon';

export default function Content({ headerHeight }: { headerHeight: string }) {
  return (
    <Container sx={{ minHeight: `calc(100svh - ${headerHeight})` }}>
      <Suspense fallback={<IconSpinLoading sx={{ fontSize: '110px', mt: '30vh' }} />}>
        <Outlet />
      </Suspense>
    </Container>
  );
}
