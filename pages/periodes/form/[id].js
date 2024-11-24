import React, { useState, useEffect } from 'react';
import FormPageLayout from '../../../components/layouts/formPageLayout';
import { TextField, Button, Snackbar, Alert, Grid2 } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import { useRouter } from 'next/router';

function PeriodesForm() {
    const router = useRouter();
    const { id } = router.query; // Access the dynamic route parameter
    const apiLocation = 'periodes';
    const apiID = 'idPeriode';

    const formName = id === 'new' ? 'New periode form' : 'Edit periode form'

    const breadcrumbs = [{
        label: "periodes",
        href: `/${apiLocation}`,
        icon: <UpdateIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }, {
        label: formName
    }]

    //Forms related

    const [formData, setFormData] = useState({
        id: id,
        name: '',
        startDate: '',
        endDate: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.toLocaleString('en-GB', { day: '2-digit' });
        const month = date.toLocaleString('en-GB', { month: '2-digit' });
        const year = date.toLocaleString('en-GB', { year: 'numeric' });
        return `${year}-${month}-${day}`;
    };

    const fetchData = async () => {
        try {
            const response = await fetch(
                `/api/${apiLocation}?${apiID}=${id}`
            );
            const data = await response.json();
            setFormData({
                id: id,
                name: data[0].name,
                startDate: formatDate(data[0].startDate),
                endDate: formatDate(data[0].endDate)
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

        const createRes = await fetch(`/api/${apiLocation}`, {
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
        router.replace(`/${apiLocation}`);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleCancel = () => {
        router.replace(`/${apiLocation}`);
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
                <TextField
                    fullWidth
                    label="Start Date"
                    name='startDate'
                    margin='normal'
                    value={formData.startDate}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                    type='date'
                />
                <TextField
                    fullWidth
                    label="End Date"
                    name='endDate'
                    margin='normal'
                    value={formData.endDate}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                    type='date'
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

export default PeriodesForm;