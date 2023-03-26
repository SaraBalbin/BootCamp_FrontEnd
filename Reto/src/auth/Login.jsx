import React, { useEffect, useRef, useState } from 'react'
import { object, string } from 'yup';
import { Field, Formik } from 'formik'
import { Card, Form, Modal } from 'antd'
import { useNavigate } from 'react-router';

const Login = () => {

    let actualUser = JSON.parse(localStorage.getItem('actualUser'))
    const navigate = useNavigate();

    const redirect = (user) => {
        if (user.role === 'admin'){
            navigate('/adminHome')
        }
        else {
            navigate('/studentHome')
        }
    }

    useEffect(() => {
        const admin = {
            id: '1',
            email: 'admin@admin.com',
            password: 'admin',
            role: 'admin'
        }
        localStorage.setItem('admin', JSON.stringify(admin));

        if (actualUser === null) {
        } else{
            redirect(actualUser)
        }
    })

    const form = useRef()
    const [visible, setVisible] = useState(false)
    const [login, setLogin] = useState(false)
    
    let userSchema = object({
        email: string().email().required(),
        password: string().required(),
    });
    
    let valuesInitial = {
        email: '',
        password: ''
    }

    const onClose = () =>{
        setVisible(false)
        if (login) {
            actualUser = JSON.parse(localStorage.getItem('actualUser'));
            redirect(actualUser);
        }
        setLogin(false)
    }

    
    const signIn = (values) =>{
        console.log(JSON.stringify(values))

        // Busqueda de admin
        const admin = JSON.parse(localStorage.getItem('admin'));
        if (admin.email === values.email && admin.password === values.password){
            localStorage.setItem('actualUser', JSON.stringify(admin));
            setLogin(true)
        } 
        // Busqueda en estudiantes
        else if (JSON.parse(localStorage.getItem('students')) !== null) {
            const students = JSON.parse(localStorage.getItem('students'));
            
            for (let student of students){
                if (student.email === values.email && student.password === values.password){
                    localStorage.setItem('actualUser', JSON.stringify(student));
                    setLogin(true)
                    break
                }
            }
        }
        setVisible(true)
    }

    return (
        <div id='contenedor'>
            <div id ='contenedorImg'>
                <img alt = 'escudoUnal' src='https://cienciashumanasyeconomicas.medellin.unal.edu.co/images/FOTOS_ART%C3%8DCULOS/FOTO_14.jpg'></img>
            </div>

            <div id = 'contenedorLogin'>
                <Card actions={[
                    <div>
                        <button id = 'botonLogin' onClick = {() => {form.current.submitForm()}} type = "submit">Iniciar Sesion</button>
                    </div>
                ]}>
                    <h3>Bootcamp <br/>Universidad Nacional de Colombia</h3>
                    <hr></hr>
                    
                    <Formik validationSchema={userSchema} innerRef = {form} initialValues = {valuesInitial} onSubmit={(values) => signIn(values)}>
                        <Form>
                            
                            <div className='grid-row'>
                                <label>Correo electrónico</label>
                                <Field className = 'input' name='email' required={true} label='email'/>
                            </div>
                            <div className='grid-row'>
                                <label>Contraseña</label>
                                <Field className = 'input' type = 'password' name = "password" required={true}/>
                            </div>
                        </Form>
                    </Formik>
                </Card>
                <Modal open = {visible} 
                    cancelButtonProps={{ style: { display: 'none' } }} 
                    onOk = {onClose}>
                    {login === true? 'Ingreso exitoso, será redirigido a la página principal' : 'Contraseña o email inválidos'}
                </Modal>
            </div>
        </div>
    )
}

export default Login
