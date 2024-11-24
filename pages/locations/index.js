import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomTable from '../../components/customTable';

function Locations() {
    const breadcrumbs = [{
        label: "Locations",
        icon: <LocationOnIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }]

    const tHead = [{
        label: "ID",
        name: "id"
    }, {
        label: "Address",
        name: "address"
    }, {
        label: "City",
        name: "city"
    }, {
        label: "Remarks",
        name: "remarks"
    }];

    const tBody = [
        {
            cellName: "id"
        },{
            cellName: "address"
        },{
            cellName: "city"
        },{
            cellName: "remarks"
        }
    ]

    return (
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Location" pluralTitle="Locations">
            <CustomTable searchLabel='locations' apiName='locations' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default Locations;