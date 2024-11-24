import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import { Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CustomTable from '../../components/customTable';

function Users() {
    const breadcrumbs = [{
        label: "Users",
        icon: <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }]

    const tHead = [{
        label: "ID",
        name: "id"
    }, {
        label: "Name",
        name: "name"
    }, {
        label: "Email",
        name: "email"
    }, {
        label: "Place of Birth",
        name: "placeOfBirth"
    }, {
        label: "Date of Birth (YYYY-MM-DD)",
        name: "dateOfBirth"
    }, {
        label: "Address",
        name: "address"
    }, {
        label: "Phone",
        name: "phone"
    }];

    const tBody = [
        {
            cellName: "id"
        },{
            cellName: "name"
        },{
            cellName: "email"
        },{
            cellName: "placeOfBirth"
        },{
            cellName: "dateOfBirth",
            type: "date"
        },{
            cellName: "address"
        },{
            cellName: "phone"
        }
    ]

    return (
        <AdminPageLayout breadcrumbs={breadcrumbs} title="User" pluralTitle="Users">
            <CustomTable searchLabel='users' apiName='users' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default Users;