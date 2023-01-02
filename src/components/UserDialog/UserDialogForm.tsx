import { FunctionComponent } from 'react';
import { ControlType, InputValuesType } from '../../hooks/useGenericForm';
import { TextField, Grid } from '@mui/material';

type UserDialogFormProps = {
    controls: ControlType[],
    inputsValues: InputValuesType,
    onFormChange: any
}

export const UserDialogForm: FunctionComponent<UserDialogFormProps> = ({ controls, inputsValues, onFormChange }) => {
    return (
        <Grid container spacing={2}>
            {
                controls.map(({ key, label, inputType, disabled }) => (
                    <Grid item key={key} xs={12}>
                        <TextField
                            disabled={disabled}
                            margin="normal"
                            fullWidth
                            id={key}
                            label={label}
                            value={inputsValues[key]}
                            type={inputType}
                            onChange={(event) => onFormChange(key, event.target.value)}
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}