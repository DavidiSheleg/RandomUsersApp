import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useAppSelector } from '../app/hooks';
import { useAxios } from '../hooks/useAxios';
import { useModifyAndDispatchData } from '../hooks/useModifyAndDispatchData';
import { Users } from '../components/Users';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { openUserDialog } from '../app/slices/userDialogSlice';

export const MainPage = () => {

    const dispatch = useDispatch();
    const { data } = useAppSelector((state) => state.users);
    const { data: usersData, error, axiosReq } = useAxios('?results=10', 'GET');
    const { modifyData, modificationIsLoading } = useModifyAndDispatchData();
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const openAddUserDialog = () => {
        dispatch(openUserDialog(null));
    }

    useEffect(() => {
        axiosReq();
    }, []);

    useEffect(() => {
        if (usersData) {
            modifyData(usersData.results);
        }
    }, [usersData]);


    if (modificationIsLoading)
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>

    if (error)
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h4'>Users List: Something went wrong</Typography>
        </Box>



    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{ mb: 4, mt: 4 }}>
                <Grid item xs={12} lg={12} sx={{ mb: 4}}>
                    <Typography variant='h4'>Random Users App</Typography>
                </Grid>
                <Grid item xs={8} lg={2.5}>
                    <TextField
                        size="small"
                        id="search-textfield"
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={4} lg={2} justifyContent={'flex-end'}>
                    <Button variant='contained' onClick={openAddUserDialog}>Add User</Button>
                </Grid>
            </Grid>

            <Grid container spacing={5}>
                <Users data={data} searchValue={searchValue} />
            </Grid>

        </Container>
    );
}