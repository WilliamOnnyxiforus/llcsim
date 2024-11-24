import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CustomTable from '../../components/customTable';

function ClassTypes() {
    const breadcrumbs = [{
        label: "Class Types",
        icon: <AssignmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
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
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Class Type" pluralTitle="Class Types">
            <CustomTable searchLabel='class types' apiName='classtypes' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default ClassTypes;