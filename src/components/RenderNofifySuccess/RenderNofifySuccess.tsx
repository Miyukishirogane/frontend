import { Box, Typography } from '@mui/material';
import { useClient } from 'wagmi';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function RenderNofifySuccess({ hash, title }: { hash: string; title?: string }) {
    const { chain } = useClient();
    return (
        <Box>
            <Typography mb={1} fontWeight={600}>
                {title || 'Transaction successfull!'}
            </Typography>
            <Typography mb={1} fontWeight={600}>
                <Typography
                    component={'a'}
                    href={`${chain.blockExplorers.default.url}/tx/${hash}`}
                    target="_blank"
                    sx={{
                        color: 'rgb(130, 130, 130)',
                        textDecoration: 'none',
                        display: 'flex', textAlign: 'center',
                    }}>
                    Check on Arbiscan
                    {" "}
                    <OpenInNewIcon style={{ marginLeft: '4px', color: 'rgb(130, 130, 130)' }} />
                </Typography>
            </Typography>
        </Box>
    );
}
