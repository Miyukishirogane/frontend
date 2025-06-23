import { Box, Typography } from '@mui/material';
import { useId } from 'react';
import { readErrorTransaction } from 'src/utils';

export default function ErrorExeTransaction({ error }: { error: any }) {
    const id = useId();
    return (
        <Box>
            {readErrorTransaction(error).map((mess, index) => {

                if (mess.type === "metaMess") {

                    const regex = /([^:\n]+):\s*([^\n]+)/g;

                    let match;
                    const results = [];

                    while ((match = regex.exec(mess.text)) !== null) {
                        const key = match[1].trim();
                        const value = match[2].trim();
                        results.push({ [key]: value });
                    }

                    const textResult = results.map(obj => {
                        for (const key in obj) {
                            if (key !== 'data') {
                                return `${key}: ${obj[key]}`;
                            }
                        }
                    }).join('\n');
                    return (
                        <Typography
                            key={id + index}
                            mt={index > 0 ? 1 : 0}
                            variant={'body2'}
                            sx={{ color: '' }}
                            component={'pre'}
                            maxWidth='max-content'
                        >
                            {textResult}
                        </Typography>
                    )
                } else {
                    return (
                        <Typography
                            key={id + index}
                            mt={index > 0 ? 1 : 0}
                            variant={mess.type == 'shortMess' ? 'h6' : 'body2'}
                            sx={{ color: mess.type == 'shortMess' ? 'text.primary' : '' }}
                            component={'pre'}
                            maxWidth='400px'
                        >
                            {mess.text}
                        </Typography>
                    );
                }
            })}
        </Box>
    );
}
