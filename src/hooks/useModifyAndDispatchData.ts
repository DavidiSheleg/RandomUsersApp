import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setUsers } from "../app/slices/usersSlice";

export const useModifyAndDispatchData = () => {

    const [modificationIsLoading, setModificationIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const modifyData = async (data: any[]) => {

        const newData = data.map((user: any) => {

            const id: string = user?.id?.value || 'No ID';
            const name: string = `${user?.name?.title} ${user?.name?.first} ${user?.name?.last}`;
            const image: string = user?.picture?.medium;
            const email: string = user?.email;
            const location: string = `${user?.location.city}, ${user?.location.state}, ${user?.location.country} `;


            return {
                id,
                name,
                image,
                email,
                location
            }
        });

        dispatch(setUsers(newData));
        setModificationIsLoading(false);
    };


    return { modifyData, modificationIsLoading };
};