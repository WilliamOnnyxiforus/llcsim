import React, { useState, useMemo } from 'react';
import { Grid2, Typography } from '@mui/material';
import BreadcrumbsBar from '../breadcrumbsBar';

import MasterPageLayout from './masterPageLayout';

function FormPageLayout({ children, ...props }) {

    return (
        <MasterPageLayout>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 12 }} sx={{ py: 1 }}>
                    {props.breadcrumbs && (<BreadcrumbsBar breadcrumbsList={props.breadcrumbs} />)}
                </Grid2>
                <Grid2 container size={{ xs: 12, md: 12 }} sx={{ py: 1 }}>
                    <Typography variant='h4'>{props.name}</Typography>
                </Grid2>
            </Grid2>
            {children}
        </MasterPageLayout>
    );
}

export default FormPageLayout