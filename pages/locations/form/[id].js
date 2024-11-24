import React, { useState, useEffect } from 'react';
import FormPageLayout from '../../../components/layouts/formPageLayout';
import { TextField, Button, Snackbar, Alert, Grid2 } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useRouter } from 'next/router';

function LocationsForm() {
    const router = useRouter();
    const { id } = router.query; // Access the dynamic route parameter

    const formName = id === 'new' ? 'New location form' : 'Edit location form'

    const breadcrumbs = [{
        label: "Locations",
        href: "/locations",
        icon: <LocationOnIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }, {
        label: formName
    }]

    //Forms related

    const [formData, setFormData] = useState({
        id: id,
        address: '',
        city: '',
        remarks: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const fetchData = async () => {
        try {
            const response = await fetch(
                `/api/locations?idLocation=${id}`
            );
            const data = await response.json();
            setFormData({
                id: id,
                address: data[0].address,
                city: data[0].city,
                remarks: data[0].remarks
            })
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

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

        const createRes = await fetch(`/api/locations`, {
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
        router.replace('/locations');
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleCancel = () => {
        router.replace('/locations');
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
                    label="Address"
                    name='address'
                    margin='normal'
                    value={formData.address}
                    onChange={handleChange}
                    required
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    fullWidth
                    label="City"
                    name='city'
                    margin='normal'
                    value={formData.city}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    fullWidth
                    label="Remarks"
                    name='remarks'
                    margin='normal'
                    value={formData.remarks}
                    onChange={handleChange}
                    multiline
                    rows={4}
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

export default LocationsForm;