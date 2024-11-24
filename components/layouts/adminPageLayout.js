import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Grid2, Typography, Button } from '@mui/material';
import BreadcrumbsBar from '../breadcrumbsBar';

import MasterPageLayout from './masterPageLayout';

//ICONS
import { Add as AddIcon } from '@mui/icons-material';

function AdminPageLayout({ children, ...props }) {
    const router = useRouter();

    const handleClickNew = () => {
        console.log('NEW')
        router.replace(`/${location.pathname.split('/')[1]}/form/new`)
    };

    return (
        <MasterPageLayout>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 12 }} sx={{ py: 1 }}>
                    {props.breadcrumbs && (<BreadcrumbsBar breadcrumbsList={props.breadcrumbs} />)}
                </Grid2>
                <Grid2 container size={{ xs: 12, md: 12 }} sx={{ py: 1 }}>
                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <Typography variant='h4'>{props.pluralTitle} List</Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ float: "right", px: 2 }}
                            onClick={handleClickNew}
                        >
                            Add {props.title}
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
            {children}
        </MasterPageLayout>
    );
}

export default AdminPageLayout