import React, { useState, useEffect } from 'react';
import FormPageLayout from '../../../components/layouts/formPageLayout';
import { TextField, Button, Snackbar, Alert, Grid2, Autocomplete } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { useRouter } from 'next/router';

function DonationsForm() {
    const router = useRouter();
    const { id } = router.query; // Access the dynamic route parameter
    const apiLocation = 'donations';
    const apiID = 'idDonation';

    const formName = id === 'new' ? 'New donation form' : 'Edit donation form'

    const breadcrumbs = [{
        label: "donations",
        href: `/${apiLocation}`,
        icon: <AccountBalanceWalletIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    }, {
        label: formName
    }]

    //Forms related

    const [formData, setFormData] = useState({
        id: id,
        userID: '',
        donationTypeID: '',
        remarks: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
    const [userList, setUserList] = useState([]);
    const [donationTypeList, setDonationTypeList] = useState([]);

    const [userName, setUserName] = useState('');
    const [donationType, setDonationType] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(
                `/api/${apiLocation}?${apiID}=${id}`
            );
            const data = await response.json();
            setFormData({
                id: id,
                userID: data[0].userID,
                donationTypeID: data[0].donationTypeID,
                remarks: data[0].remarks
            })

            setUserName({
                id: data[0].userID,
                label: data[0].userName
            })

            setDonationType({
                id: data[0].donationTypeID,
                label: data[0].donationTypesName
            })

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const fetchUsers = async () => {
        try {
            const userResponse = await fetch(
                `/api/users?page=1&perPage=10000&sortBy=id&order=asc`
            );
            const userData = await userResponse.json();
            //setUserList(userData.data);
            const preparedUserData = userData.data.map((item) => ({
                label: item.name,
                id: item.id
            }))
            setUserList(preparedUserData)

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const fetchDonationTypes = async () => {
        try {
            const donationTypeResponse = await fetch(
                `/api/donationtypes?page=1&perPage=10000&sortBy=id&order=asc`
            );
            const donationTypeData = await donationTypeResponse.json();
            const preparedDonationTypeData = donationTypeData.data.map((item) => ({
                label: item.name,
                id: item.id
            }))
            setDonationTypeList(preparedDonationTypeData)

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        fetchUsers()
        fetchDonationTypes()
        fetchData()
    }, [id])

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangeAutoCompleteName = (e, v) => {
        if (v != null) {
            setFormData((prevData) => ({ ...prevData, ["userID"]: v.id }));
            setUserName(userList.find((item) => item.id === v.id))
        }
    };

    const handleChangeAutoCompleteDonationType = (e, v) => {
        if (v != null) {
            setFormData((prevData) => ({ ...prevData, ["donationTypeID"]: v.id }));
            setDonationType(donationTypeList.find((item) => item.id === v.id))
        }
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
                <Autocomplete
                    fullWidth
                    disablePortal
                    margin='normal'
                    value={userName}
                    onChange={handleChangeAutoCompleteName}
                    options={userList}
                    sx={{ marginBottom: "2vh" }}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (<TextField required {...params} name='userID' label="User name" />)}
                />
                <Autocomplete
                    fullWidth
                    disablePortal
                    margin='normal'
                    value={donationType}
                    onChange={handleChangeAutoCompleteDonationType}
                    options={donationTypeList}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (<TextField required {...params} name='donationTypeID' label="Donation type" />)}
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

export default DonationsForm;