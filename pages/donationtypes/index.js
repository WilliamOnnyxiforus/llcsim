import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CustomTable from '../../components/customTable';

function DonationTypes() {
    const breadcrumbs = [{
        label: "Donation Types",
        icon: <AccountBalanceWalletIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }]

    const tHead = [{
        label: "ID",
        name: "id"
    }, {
        label: "Name",
        name: "name"
    }];

    const tBody = [
        {
            cellName: "id"
        },{
            cellName: "name"
        }
    ]

    return (
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Donation Type" pluralTitle="Donation Types">
            <CustomTable searchLabel='donation types' apiName='donationtypes' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default DonationTypes;