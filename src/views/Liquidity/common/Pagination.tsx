import { Box, Pagination, Typography } from '@mui/material';
import React from 'react';

interface PaginationProps {
    pagination: { page: number; limit: number; total: number };
}

export default function Paginations({ pagination }: PaginationProps) {
    const [newpage, setNewPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setNewPage(value);
    };
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    return (
        <Box>
            <Typography>Page: {newpage}</Typography>
            <Pagination count={totalPages} page={newpage} onChange={handleChange}></Pagination>
        </Box>
    );
}
