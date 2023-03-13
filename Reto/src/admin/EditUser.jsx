import React, { useRef } from 'react'
import { useLocation } from 'react-router'
import { users } from './data'
import { useNavigate } from 'react-router-dom';
import { Card, Select } from 'antd';
import { Field, Form, Formik } from 'formik';
import { number, object, string } from 'yup';



const EditUser = () => {
    const location = useLocation();
    const idUser = location.state.id;
    const navigate = useNavigate();
    let user = ''

    for (let elemento of users){
        if (elemento.id === idUser){
            user = elemento
            break
        }
    }
    const form = useRef()
    let valuesInitial = user

    let userSchema = object({
        firstName: string().required(),
        secondName: string().required(),
        surname: string().required(),
        secondSurName: string().required(),
        typeDocument: number().required(),
        documentNumber: string().required(),
        email: string().email().required(),
        phone: string().required(),
    });

    const editUser = (values) =>{
        console.log(values)
    }

    return (
        <div>
            <nav id = 'navHome'>
                <ul>
                    <div>
                        <img alt = 'escudoUnal' src='https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png'></img>
                    </div>
                    <hr/>
                    <li><a href="/adminHome">Principal</a></li><hr/>
                    <li><a href="/listUsers">Usuarios</a></li><hr/>
                    <li><a href="/listQuestions">Preguntas</a></li><hr/>
                    <li><a href="#news">Información</a></li><hr/>
                </ul>
            </nav>
            <div id ='menuAdmin'>
                <div id = 'barraSuperior'> 
                    <p>Sistema de administracion académico - Universidad Nacional de Colombia</p>
                    <p>Admin</p>
                    <img id = 'perfil'  alt = 'perfil' src ='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'/>
                </div>
                <div id = 'contenidoAdmin'>
                    <div className='contenidoSuperior'>
                        <button onClick={() => navigate('/listUsers')}>Volver</button>
                        <h3>Editar usuario (ID: {idUser})</h3>
                    </div>
                    <div className= 'contenedorEdit'>
                    <Card title = 'Información actual del usuario' actions={[
                        <div>
                            <button className='botonEditarCrear'  onClick = {() => {form.current.submitForm()}} type = "submit">Guardar</button>
                        </div>
                    ]}>
                            <Formik validationSchema={userSchema} innerRef = {form} initialValues = {valuesInitial} 
                                onSubmit = {(values) => editUser(values)} title = 'Información actual del usuario'>
                                <Form>
                                    <table>
                                        <tbody>

                                            <tr>
                                                <td>
                                                    <label>ID </label>
                                                    <Field className = 'input' type = 'number' disabled = {true} name = "id"/>                 
                                                </td>
                                                <td>
                                                    <label>Primer nombre </label>
                                                    <Field className = 'input' name = "firstName"/>

                                                </td>
                                                <td>
                                                    <label>Segundo nombre </label>
                                                    <Field className = 'input' name = "secondName"/>               
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Priner apellido </label>
                                                    <Field className = 'input' name = "surname"/>
                                                </td>
                                                <td>
                                                    <label>Segundo apellido</label>
                                                    <Field className = 'input' name = "secondSurName"/>           
                                                </td>
                                                <td>
                                                    <label>Tipo de documento</label>
                                                    <Field  className = 'input' name="typeDocument" component="select">
                                                        <option value="1">Cedula de ciudadanía</option>
                                                        <option value="2">Tarjeta de identidad</option>
                                                        <option value="3">Cedula de extranjería</option>
                                                    </Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Numero de documento </label>
                                                    <Field className = 'input' type = 'number' name = "documentNumber"/>                                             
                                                </td>
                                                <td>
                                                    <label> Correo electrónico </label>
                                                    <Field className = 'input' type = 'email' name = "email"/>
                                                </td>
                                                <td>
                                                    <label> Número de teléfono </label>
                                                    <Field className = 'input' type = 'number' name = "phone"/>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Form>
                            </Formik>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditUser
