import { useEffect } from "react"
import Announcement from "./Announcement/Announcement"
import ContentLeft from "./ContentLeft"
import ContentRight from "./ContentRight"
import { Grid, Box, Typography } from "@mui/material"
import useAccount from 'src/hooks/useAccount';
import { useLocation, useNavigate } from "react-router-dom"
import { IconSpinLoading } from "src/assets/icon"
import { useChainId } from "wagmi"
import { usePendleFunction, usePendleData } from "src/jotai/pendle/pendle"

export default function DetailPool() {

    // router
    const navigate = useNavigate();
    const location = useLocation();

    // state 
    const { address } = useAccount();
    const chainIdSelected = useChainId();
    const { loading, error } = usePendleData()
    const { AddDetailPendle } = usePendleFunction();
    
    useEffect(() => {
        if (location.state?.item?.marketAddress) {
          AddDetailPendle(location.state?.item)
        } else {
          navigate('/pool');
        }
      }, [])

    // call token
    useEffect(() => {
        (async () => {
          if (address && location.state?.chainId !== chainIdSelected) {
            navigate('/pool');
          }
        })();
      }, [address, chainIdSelected])

    return (
        <>
            <div style={{ paddingBottom: '100px' }}>
                <Announcement />
                <br />
                {error ? (
                    <Box>
                        <Typography>{error.message || 'Error!!'}</Typography>
                    </Box>
                ) : (
                    <>
                        {
                            loading ? (
                                <Box>
                                    <IconSpinLoading sx={{ fontSize: '100px' }} />
                                </Box>
                            ) : (
                                <>
                                    <Grid container spacing={{ md: 7, sm: 3, xs: 2 }}>
                                        <Grid item xs={12} sm={5}>
                                            <Box sx={{
                                                boxShadow: '0px 3px 8px 0px rgba(0, 0, 0, 0.12)',
                                                borderRadius: '20px'
                                            }}>
                                                <ContentLeft />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={7}>
                                            <Box>
                                                <ContentRight />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                    </>
                )}
            </div>
        </>
    )
}
