import { Grid } from '@mui/material';
import { FunctionComponent } from 'react';
import { UserType } from '../app/slices/usersSlice';
import { User } from './User';

type UserProps = {
    data: UserType[],
    searchValue: string
}

export const Users: FunctionComponent<UserProps> = ({ data, searchValue }) => {

    let users: UserType[] = data;

    if(searchValue.trim().length > 0) {
        const copy = [...users];
        users = [];
        copy.forEach((item) => {
            var pattern = new RegExp('^' + searchValue, 'i');
            if(pattern.test(item.email) ||  pattern.test(item.name) || pattern.test(String(item.id)) || pattern.test(item.location)) {
                users.push(item);
            }
        })
    }

    return (
        <>
            {
                users.map((user: UserType, index) => (
                    <Grid item xs={12} lg={3} key={user.id !== "No ID" ? user.id : index}>
                        <User user={user} />
                    </Grid>
                ))
            }
        </>
    );
}