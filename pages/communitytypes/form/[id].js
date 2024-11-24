import React, { useState, useEffect } from 'react';
import FormPageLayout from '../../../components/layouts/formPageLayout';
import { TextField, Button, Snackbar, Alert, Grid2 } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import { useRouter } from 'next/router';

function CommunityTypesForm() {
    const router = useRouter();
    const { id } = router.query; // Access the dynamic route parameter

    const formName = id === 'new' ? 'New community type form' : 'Edit community type form'

    const breadcrumbs = [{
        label: "Community Types",
        href: "/communitytypes",
        icon: <Diversity3Icon sx={{ mr: 0.5 }} fontSize="inherit" />
    }, {
        label: formName
    }]

    //Forms related

    const [formData, setFormData] = useState({
        id: id,
        name: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const fetchData = async () => {
        try{
            const response = await fetch(
                `/api/communitytypes?idCommunityType=${id}`
            );
            const data = await response.json();
            setFormData({
                id: id,
                name: data[0].name
            })
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchData()
    },[id])

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const formMethod = id === 'new' ? 'POST' : 'PUT';

        const createRes = await fetch(`/api/communitytypes`, {
            method: formMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        const createResMessage = await createRes.json();

        if (createRes.status === 500) {
            setSnackbarSeverity('error');
        } else {
            setSnackbarSeverity('success');
        }
        setSnackbarMessage(createResMessage);
        setOpenSnackbar(true)
        await delay(3000);
        router.replace('/communitytypes');
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleCancel = () => {
        router.replace('/communitytypes');
    }

    return (
        <FormPageLayout breadcrumbs={breadcrumbs} name={formName}>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant='filled'
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name='name'
                    margin='normal'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <Grid2
                    container
                    sx={{ marginTop: 2, padding: '10px 0' }}
                    spacing={2}
                >
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
        </FormPageLayout>
    );
}

export default CommunityTypesForm;