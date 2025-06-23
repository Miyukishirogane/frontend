import { useEffect } from "react";
import Announcement from "../EarlySeed/Announcement/Announcement"
import { Box, Grid, Typography } from '@mui/material';
import AccordionPublicSale from "./Accordion/AccordionPublicSale";
import { useUserPublicSale } from "src/jotai/userSale/userPublicSale";
import { IconSpinLoading } from "src/assets/icon";
import { useUserPublicSaleFunction } from "src/jotai/userSale/userPublicSale";
import DetailsPublicSale from "../EarlySeed/DetailsEarlySeed/DetailsEarlySeed";
import { useUserPublicSaleDetail } from "src/jotai/userSale/detailPublicSale";
import { useUserPublicSaleDetailFunction } from "src/jotai/userSale/detailPublicSale";

export default function PublicSale() {
    return (
        <>
            <Announcement />

            <br />

            <Wapper />
        </>
    );
}

function Wapper() {

    // jotai data
    const { loadingPage, error } = useUserPublicSale()
    const { getStateAllVaultsPublicSaleData } = useUserPublicSaleFunction()
    const { check } = useUserPublicSaleDetail()
    const { setState } = useUserPublicSaleDetailFunction()

    // useEffect
    useEffect(() => {
        setState({ check: false })
        getStateAllVaultsPublicSaleData();
    }, []);


    return (
        <>
            {loadingPage ? (
                <Box>
                    <IconSpinLoading sx={{ fontSize: '100px' }} />
                </Box>
            ) : (
                <>
                    {error ? (
                        <Box>
                            <Typography>{error.message || 'Error!!'}</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ pb: 10 }}>
                            <Grid container spacing={{ md: 2.5, xs: 4 }}>
                                {check ? (
                                    <DetailsPublicSale />
                                ) : <>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <AccordionPublicSale />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <AccordionPublicSale />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <AccordionPublicSale />
                                    </Grid>
                                </>}
                            </Grid>

                        </Box>
                    )}
                </>
            )}
        </>
    );
}
