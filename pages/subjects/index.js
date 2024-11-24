import React, { useState } from 'react';
import AdminPageLayout from '../../components/layouts/adminPageLayout';
import CustomTable from '../../components/customTable';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Subjects() {
    const breadcrumbs = [{
        label: "Subjects",
        icon: <MenuBookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }]

    const tHead = [{
        label: "ID",
        name: "id"
    }, {
        label: "Name",
        name: "name"
    }, {
        label: "Grade",
        name: "grade"
    }, {
        label: "Category",
        name: "category"
    }, {
        label: "Tag",
        name: "tag"
    }, {
        label: "Description",
        name: "description"
    }, {
        label: "Sylabus",
        name: "silabus"
    }];

    const tBody = [
        {
            cellName: "id"
        },{
            cellName: "name"
        },{
            cellName: "grade"
        },{
            cellName: "category"
        },{
            cellName: "tag"
        },{
            cellName: "description"
        },{
            cellName: "silabus"
        }
    ]

    return (
        <AdminPageLayout breadcrumbs={breadcrumbs} title="Subject" pluralTitle="Subjects">
            <CustomTable searchLabel='subjects' apiName='subjects' tHead={tHead} tBody={tBody} />
        </AdminPageLayout>
    );
}

export default Subjects;