import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import CustomTable from '../../components/customTable';
import UpdateIcon from '@mui/icons-material/Update';

function Periodes() {
    const breadcrumbs = [{
        label: "Periodes",
        icon: <UpdateIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }]

    const tHead = [{
        label: "ID",
        name: "id"
    }, {
        label: "Name",
        name: "name"
    }, {
        label: "Start Date (YYYY-MM-DD)",
        name: "startDate"
    }, {
        label: "End Date (YYYY-MM-DD)",
        name: "endDate"
    }];

    const tBody = [
        {
            cellName: "id"
        }, {
            cellName: "name"
        }, {
            cellName: "startDate",
            type: "date"
        }, {
            cellName: "endDate",
            type: "date"
        }
    ]

    return (
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Periode" pluralTitle="Periodes">
            <CustomTable searchLabel='periodes' apiName='periodes' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default Periodes;