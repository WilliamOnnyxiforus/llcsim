import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import CustomTable from '../../components/customTable';
import GroupsIcon from '@mui/icons-material/Groups';

function Roles() {
    const breadcrumbs = [{
        label: "Roles",
        icon: <GroupsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }]

    const tHead = [{
        label: "ID",
        name: "id"
    }, {
        label: "Name",
        name: "name"
    }, {
        label: "Description",
        name: "description"
    }, {
        label: "Requirements",
        name: "requirements"
    }];

    const tBody = [
        {
            cellName: "id"
        }, {
            cellName: "name"
        }, {
            cellName: "description"
        }, {
            cellName: "requirements"
        }
    ]

    return (
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Role" pluralTitle="Roles">
            <CustomTable searchLabel='roles' apiName='roles' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default Roles;