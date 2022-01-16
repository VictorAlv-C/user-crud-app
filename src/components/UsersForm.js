import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {post, put} from 'axios';

const UsersForm = ({getUsers, userSelected, deselectUser, emails}) => {
    
    const defaultValues = {first_name:"", last_name:"", email:"", password:"",birthday:""}
    const {register, handleSubmit, reset} = useForm();
    const [errorEmail, setErrorEmail] = useState({state:false, mesage:""});
    const [sucess, setSucess] = useState({state:false, mesage:""});

    const showMesageSucess = () => {
        setSucess({state:true, mesage:"Contacto registrado exitosamente"});
        userSelected && setSucess({state:true, mesage:"Contacto actualizado exitosamente"});
        setTimeout(() => {
            setSucess({state:false, mesage:""})
        },2000)
    }

    const showMesageError = () => {
        setErrorEmail({state:true, mesage:"Ingrese un E-mail valido"})
        setTimeout(() => {
            setErrorEmail({state:false, mesage:""});
        },4000)
    }
      
    const submit = user => {
        if(userSelected){
            put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`,user)
            .then(() => {getUsers(); showMesageSucess()})
            .catch(err => showMesageError());
            deselectUser();
        }else if(!emails.includes(user.email))
        {
            post(`https://users-crud1.herokuapp.com/users/`,user)
            .then(() => {getUsers(); showMesageSucess()})
            .catch(err => showMesageError());
            reset(defaultValues);
            setErrorEmail("")
        }else{
            setErrorEmail({state:true, mesage:"Este correo ya existe"})
            setTimeout(() => {
                setErrorEmail({state:false, mesage:""});
            },3000)
        }
    }

    useEffect(() => userSelected ? reset(userSelected) : reset(defaultValues) , [ userSelected ])

    return (
        <div className='container-form-users'>

            <p className={`mesage-ok ${sucess.state && 'show-sucess'}`}>{sucess.mesage}</p>

            <form onSubmit={handleSubmit(submit)} className='form-users'>
                <div className="input-container">
                    <i className="fas fa-user"></i>
                    <input type="text" id='first-name' 
                    {...register("first_name")} placeholder='Nombre(s)' 
                    required autoComplete='off'/>
                    <label htmlFor="first_name">Nombre(s)</label>
                </div>
                <div className="input-container">
                     <i className="far fa-user"></i>
                    <input type="text" id='last-name' 
                    {...register("last_name")} placeholder='Apellido(s)' 
                    required autoComplete='off'/>
                    <label htmlFor="last-name">Apellido(s)</label>
                </div>
                <div className="input-container">
                    <i className="fas fa-envelope"></i>
                    <input type="email" id='email' 
                    {...register("email")} placeholder='E-mail'
                     required autoComplete='off'/>
                     <label htmlFor="email">E-mail</label>
                     <p className={`error-email ${errorEmail.state && 'show-error'}`}>{errorEmail.mesage}</p>
                </div>
                <div className="input-container">
                    <i className="fas fa-key"></i>
                    <input type="password" id='password' 
                    {...register("password")} placeholder='Contraseña' 
                    required autoComplete='off'/>
                    <label htmlFor="password">Contraseña</label>
                </div>
                <div className="input-container">
                     <i className="fas fa-birthday-cake"></i>
                    <input type="date" id='birthday' {...register("birthday")} placeholder='Cumpleaños' required />
                </div>
                <div className="btns">
                    <button className='submit'>{userSelected ? 'Actualizar' : 'Registrar'}</button>
                    {
                            userSelected && <button onClick={() => deselectUser()} type='button'
                            className='submit cancel'>Cancelar</button>
                    }
                </div>
                

            </form>
        </div>
    );
};

export default UsersForm;