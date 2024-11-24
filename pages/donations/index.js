import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import CustomTable from '../../components/customTable';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function Donations() {
    const breadcrumbs = [{
        label: "Donations",
        icon: <AccountBalanceWalletIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }]

    const tHead = [{
        label: "ID",
        name: "id"
    }, {
        label: "User Name",
        name: "userName"
    }, {
        label: "Donation Type",
        name: "donationTypesName"
    }, {
        label: "Remarks",
        name: "remarks"
    }];

    const tBody = [
        {
            cellName: "id"
        }, {
            cellName: "userName"
        }, {
            cellName: "donationTypesName"
        }, {
            cellName: "remarks"
        }
    ]

    return (
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Donation" pluralTitle="Donations">
            <CustomTable searchLabel='donations' apiName='donations' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default Donations;