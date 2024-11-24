import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CustomTable from '../../components/customTable';

function CommunityTypes() {
    const breadcrumbs = [{
        label: "Community Types",
        icon: <Diversity3Icon sx={{ mr: 0.5 }} fontSize="inherit" />
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
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Community Type" pluralTitle="Community Types">
            <CustomTable searchLabel='community types' apiName='communitytypes' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default CommunityTypes;