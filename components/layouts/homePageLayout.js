import React, { useState, useMemo } from 'react';
import { Grid2, Typography } from '@mui/material';

import MasterPageLayout from './masterPageLayout';

function HomePageLayout({ children, ...props }) {

    return (
        <MasterPageLayout>
            <Grid2 container spacing={2}>
                <Grid2 container size={{ xs: 12, md: 12 }} sx={{ py: 1 }}>
                    <Typography variant='h4'>Homepage</Typography>
                </Grid2>
            </Grid2>
            {children}
        </MasterPageLayout>
    );
}

export default HomePageLayout;