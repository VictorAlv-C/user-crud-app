import React from 'react';

const UserList = ({users, deleteUser, selectUser, confirmDelete, setConfirmDelete}) => {
   
    return (
        <section className='users-list'>
                {
                    users?.map(user => ( 
                        <article key={user.id} className='container-info'>
                            <div className="info-user">
                                <p className='name'><strong>{`${user.first_name} ${user.last_name}`}</strong></p>
                                <p>{user.email}</p>
                                <p><i className="fas fa-birthday-cake"></i>{user.birthday}</p>
                            </div>
                            <div className="actions">
                             <i className="fas fa-trash delete" onClick={() => setConfirmDelete(user.id)}  ></i>
                             <i className="fas fa-edit edit" onClick={() => selectUser(user)}></i>
                            </div>
                        </article>
                    ))
                }

                <div className={`confirm-delete ${confirmDelete > 0 && 'show-confirm'}`}>
                     <div className='content-confirm'>
                        <p >¿Estas seguro?</p>
                        <div className='confirm'>
                            <a className='yes' onClick={() => deleteUser(confirmDelete)} >Si</a> 
                            <a className='nou' onClick={() => setConfirmDelete(-1)}>Cancel</a>
                        </div>
                     </div>
                </div>
        </section>
    );
};

export default UserList;