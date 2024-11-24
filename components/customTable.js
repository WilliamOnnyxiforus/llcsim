import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Grid2,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    TablePagination,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';

//ICONS
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

export default function CustomTable({ searchLabel, apiName, tHead, tBody }) {
    const router = useRouter();

    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.toLocaleString('en-GB', { day: '2-digit' });
        const month = date.toLocaleString('en-GB', { month: '2-digit' });
        const year = date.toLocaleString('en-GB', { year: 'numeric' });
        return `${year}-${month}-${day}`;
    };

    const fetchData = async () => {
        const seachText = searchQuery != '' ? `&search=${searchQuery}` : '';
        try {
            const response = await fetch(
                `/api/${apiName}?page=${page + 1}&perPage=${rowsPerPage}${seachText}&sortBy=${orderBy}&order=${order}`
            );
            const data = await response.json();
            setTableData(data.data);
            setTotal(data.meta.total);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage, searchQuery, orderBy, order]);

    // Sorting function
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this data?");
        if (!isConfirmed) return; // Exit if data cancels

        try {
            const deletedData = await fetch(`/api/${apiName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'id': id }),
            })

            const deletedDataMessage = await deletedData.json();

            if (deletedData.status === 500) {
                setSnackbarSeverity('error');
            } else {
                setSnackbarSeverity('success');
            }
            setSnackbarMessage(deletedDataMessage);
            setOpenSnackbar(true)
            await delay(3000);
            fetchData();
        } catch (error) {
            console.error('Failed to delete data:', error);
        }
    }

    const handleEdit = async (id) => {
        router.replace(`/${apiName}/form/${id}`);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <Paper>
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
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 8 }}>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <TextField
                        label={`Search ${searchLabel}`}
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ margin: '20px 0', float: 'right' }}
                    />
                </Grid2>
            </Grid2>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {tHead.map((tHeadCell) => (
                                <TableCell key={`${tHeadCell.name}Cell`}>
                                    <TableSortLabel
                                        active={orderBy === tHeadCell.name}
                                        direction={orderBy === tHeadCell.name ? order : 'asc'}
                                        onClick={() => handleRequestSort(tHeadCell.name)}
                                    >
                                        {tHeadCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.length > 0 ? (
                            tableData.map((tCellData) => (
                                <TableRow key={tCellData.id}>
                                    {tBody.map((tBodyCell) => {
                                        if(tBodyCell.type === 'date'){
                                            return (<TableCell key={`${tCellData.id}Cell`}>{formatDate(tCellData[tBodyCell.cellName])}</TableCell>)
                                        }else{
                                            return (<TableCell key={`${tCellData.id}Cell`}>{tCellData[tBodyCell.cellName]}</TableCell>)
                                        }
                                        
                                    })}
                                    <TableCell>
                                        <Grid2 container spacing={2}>
                                            <Grid2 size={{ xs: 12, md: 12 }}>
                                                <Button
                                                    variant='contained'
                                                    onClick={() => { handleEdit(tCellData.id) }}
                                                    style={{ marginRight: '1vw' }}
                                                ><Edit /></Button>
                                                <Button
                                                    variant='contained'
                                                    color="error"
                                                    onClick={() => { handleDelete(tCellData.id) }}
                                                ><DeleteIcon /></Button>
                                            </Grid2>
                                        </Grid2>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No data found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                rowsPerPageOptions={[1, 3, 5, 10, 25]}
                count={total}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0); // Reset to first page
                }}
            />
        </Paper>
    );
}