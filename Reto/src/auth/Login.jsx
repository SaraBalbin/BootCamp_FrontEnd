import React, { useRef, useState } from 'react'
import { object, string } from 'yup';
import { Field, Formik } from 'formik'
import { Card, Form, Modal } from 'antd'

const Login = () => {

    const form = useRef()
    const [login, setLogin] = useState(false)
    const [visible, setVisible] = useState(true)
    
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
    }
    
    const signIn = (values) =>{
        console.log(values)
        console.log(JSON.stringify(values) === JSON.stringify({
            email: 'sbalbin@unal.edu.co',
            password: '1234'
        }))
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
                <Modal open = {visible} onCancel = {onClose} >
                    Esto es un modal de Antd
                </Modal>
            </div>
        </div>
    )
}

export default Login
