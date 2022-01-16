import './App.css';
import axios from 'axios';
import useFechtUsers from './hooks/useFechtUsers';
import UserList from './components/UserList';
import UsersForm from './components/UsersForm';
import { useState } from 'react';
import Header from './components/Header';

function App() {
  
  const[users, getUsers] = useFechtUsers();
  const[userSelected, setUserSelected] = useState(null);
  const[navigation, setNavigation] = useState(true)
  const[confirmDelete, setConfirmDelete] = useState(-1)
  
  const emails = users?.map(userE =>userE?.email )
 
  const selectUser = user => {
    setUserSelected(user);
    setNavigation(true);
  }

  const deselectUser = () => setUserSelected(null);

const deleteUser = (id )=> { 
      axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(() => getUsers());
    setConfirmDelete(-1);
 }

  return (
    <div className="App">
      <Header setNavigation={setNavigation} navigation={navigation}/>
      <h2>{navigation ? 'Nuevo Contacto' : 'Contactos'}</h2>
      <div className="container">
        {
          navigation ? (
            
          <UsersForm 
            getUsers={getUsers}
            userSelected={userSelected}
            deselectUser={deselectUser}
            emails={emails}
         />
          ) : (
            <UserList 
              users={users}
              deleteUser={deleteUser}
              selectUser={selectUser}
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
           />
          )
        }
        
       

      </div>
    </div>
  );
}

export default App;
