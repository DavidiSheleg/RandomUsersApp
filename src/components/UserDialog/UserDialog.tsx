import { FunctionComponent, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { UserDialogForm } from './UserDialogForm';
import { useGenericForm } from '../../hooks/useGenericForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeUserDialog } from '../../app/slices/userDialogSlice';
import { addUser, updateUser } from '../../app/slices/usersSlice';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';

export const UserDialog: FunctionComponent = () => {

    const { data: users } = useAppSelector((state) => state.users);
    const { isOpen, user } = useAppSelector((state) => state.userDialog);
    const isCreateForm = user ? false : true;

    const controls = [
        {
            key: 'id',
            label: 'ID Name',
            inputType: 'text' as const,
            defaultValue: isCreateForm ? '' : user?.id,
            disabled: isCreateForm ? false : true
        },
        {
            key: 'name',
            label: 'User Name',
            inputType: 'text' as const,
            defaultValue: isCreateForm ? '' : user?.name
        },
        {
            key: 'email',
            label: 'User Email',
            inputType: 'text' as const,
            defaultValue: isCreateForm ? '' : user?.email
        },
        {
            key: 'location',
            label: 'User Location',
            inputType: 'text' as const,
            defaultValue: isCreateForm ? '' : user?.location
        },
        {
            key: 'image',
            label: 'User Image URL',
            inputType: 'text' as const,
            defaultValue: isCreateForm ? '' : user?.image,
            disabled: isCreateForm ? false : true,
        },
    ];

    const { inputsValues, onFormChange, clearForm, setDefaultValues } = useGenericForm(controls);
    const dispatch = useAppDispatch();
    const [formErrors, setFormErrors] = useState<string>('');


    useEffect(() => {
        setDefaultValues();
    }, [user]);


    const closeDialog = () => {
        clearForm();
        setFormErrors('');
        dispatch(closeUserDialog());
    }


    const handleSubmit = () => {
        setFormErrors('');
        const { id, name, email, location, image } = inputsValues;

        if (isEmpty(String(id))) {
            setFormErrors('ID is requerid');
            return;
        }

        if (isEmpty(String(name))) {
            setFormErrors('Name is requerid');
            return;
        }

        if (!isLength(String(name), { min: 3 })) {
            setFormErrors('Name need to be with at least 3 characters');
            return;
        }


        if (isEmpty(String(email))) {
            setFormErrors('Email is requerid');
            return;
        }


        if (!isEmail(String(email))) {
            setFormErrors('Email is not vaild');
            return;
        }


        if (isCreateForm) {
            if (users.find(item => item.email === email)) {
                setFormErrors('Email is exist');
                return;
            }
            dispatch(addUser({ id, name, email, location, image }));
            closeDialog();
        }
        else {
            dispatch(updateUser({ id, name, email, location, image }));
            closeDialog();
        }
    };


    return (
        <div>
            <Dialog open={isOpen} onClose={closeDialog}>
                <DialogTitle>{isCreateForm ? 'Create' : 'Update'} User</DialogTitle>
                <DialogContent>
                    <UserDialogForm
                        controls={controls}
                        inputsValues={inputsValues}
                        onFormChange={onFormChange}
                    />
                    <Box sx={{ color: 'red', height: 20, mt: 2 }}>{formErrors !== "" && formErrors}</Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}