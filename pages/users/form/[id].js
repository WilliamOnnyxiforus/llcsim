import React, { useState, useEffect } from 'react';
import FormPageLayout from '../../../components/layouts/formPageLayout';
import { TextField, Button, Snackbar, Alert, Grid2 } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { useRouter } from 'next/router';

function UsersForm() {
    const router = useRouter();
    const { id } = router.query; // Access the dynamic route parameter

    const formName = id === 'new' ? 'New user form' : 'Edit user form'

    const breadcrumbs = [{
        label: "Users",
        href: "/users",
        icon: <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }, {
        label: formName
    }]

    //Forms related

    const [formData, setFormData] = useState({
        id: id,
        name: '',
        email: '',
        placeOfBirth: '',
        dateOfBirth: '',
        address: '',
        phone: '',
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
        try{
            const response = await fetch(
                `/api/users?idUser=${id}`
            );
            const data = await response.json();
            setFormData({
                id: id,
                name: data[0].name,
                email: data[0].email,
                placeOfBirth: data[0].placeOfBirth,
                dateOfBirth: formatDate(data[0].dateOfBirth),
                address: data[0].address,
                phone: data[0].phone,
            })
        } catch (error) {
            console.error('Failed to fetch user:', error);
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

        const createUserRes = await fetch(`/api/users`, {
            method: formMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        const createUserResMessage = await createUserRes.json();

        if (createUserRes.status === 500) {
            setSnackbarSeverity('error');
        } else {
            setSnackbarSeverity('success');
        }
        setSnackbarMessage(createUserResMessage);
        setOpenSnackbar(true)
        await delay(3000);
        router.replace('/users');
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleCancel = () => {
        router.replace('/users');
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
                    label="Email"
                    name='email'
                    margin='normal'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type='email'
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    fullWidth
                    label="Place of Birth"
                    name='placeOfBirth'
                    margin='normal'
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    fullWidth
                    label="Date of Birth"
                    name='dateOfBirth'
                    margin='normal'
                    value={formData.dateOfBirth}
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
                    label="Phone"
                    name='phone'
                    margin='normal'
                    value={formData.phone}
                    onChange={handleChange}
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />
                <TextField
                    fullWidth
                    label="Address"
                    name='address'
                    margin='normal'
                    value={formData.address}
                    onChange={handleChange}
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

export default UsersForm;