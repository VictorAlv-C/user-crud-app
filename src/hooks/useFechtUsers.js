import { useEffect, useState } from 'react';
import {get} from 'axios';

const useFechtUsers = () => {
    
    const[users, setUsers] = useState();
    

    const getUsers = () => {
        get(`https://users-crud1.herokuapp.com/users/`)
        .then(({data}) => setUsers(data))
        .catch(err => console.log(err))
    }

    useEffect(() => { getUsers() }, [ ])

  return [users, getUsers]
};

export default useFechtUsers;