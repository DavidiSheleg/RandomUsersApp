import { FunctionComponent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector  } from '../app/hooks';
import { removeUser } from '../app/slices/usersSlice';
import { closeDeleteDialog } from '../app/slices/deleteDialogSlice';

export const DeleteDialog: FunctionComponent = () => {

    const { isOpen, id } = useAppSelector((state) => state.deleteDialog);
    const dispatch = useAppDispatch();

    const closeDialog = () => {
        dispatch(closeDeleteDialog());
    }

    const handleDeleteUser = () => {
        dispatch(removeUser(id));
        closeDialog();
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={closeDialog}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <Typography variant='h6'>Are you sure you want to delete this user?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button color={'error'} onClick={handleDeleteUser}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}