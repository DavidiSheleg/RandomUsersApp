import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { openDeleteDialog } from '../app/slices/deleteDialogSlice';
import { openUserDialog } from '../app/slices/userDialogSlice';
import { UserType } from '../app/slices/usersSlice';

type UserProps = {
    user: UserType
}

export const User: FunctionComponent<UserProps> = ({ user }) => {

    const dispatch = useDispatch();
    const { id, email, name, image, location } = user;

    const openUpdateUserDialog = () => {
        dispatch(openUserDialog(user));
    }

    const handleOpenDeleteDialog = () => {
        dispatch(openDeleteDialog(id));
    }
    
    return (
        <>
            <Card sx={{ width: '100%', height: 450 }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={image}
                    title={name}
                />
                <CardContent sx={{ height: 170 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        ID: {id}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                        {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {location}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={openUpdateUserDialog}>Edit</Button>
                    <Button size="small" color='error' onClick={handleOpenDeleteDialog}>Delete</Button>
                </CardActions>
            </Card>
        </>
    );
}