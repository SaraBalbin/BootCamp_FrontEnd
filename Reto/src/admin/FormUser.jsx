import React, { useRef } from 'react'
import { object, string } from 'yup';
import { Card } from 'antd';
import { Field, Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { users } from './data'


const FormUser = ({type}) => {
  const navigate = useNavigate();
    
  let userSchema = object({
      firstName: string().required(),
      secondName: string(),
      surname: string().required(),
      secondSurName: string().required(),
      typeDocument: string().required(),
      documentNumber: string().required(),
      email: string().email().required(),
      phone: string().required(),
  });

  let user = ''
  const location = useLocation();

  if (type === 'editar'){
    const idUser = location.state.id;
    for (let elemento of users.users){
        if (elemento.id === idUser){
            user = elemento
            break
        }
    }
  }

  let valuesInitial = {
    'firstName': user !== '' ? user.firstName : '',
    'secondName':  user !== '' ? user.secondName : '',
    'surname':  user !== '' ? user.surname : '',
    'secondSurName':  user !== '' ? user.secondSurName : '',
    'typeDocument': '1',
    'documentNumber':  user !== '' ? user.documentNumber : '',
    'email':  user !== '' ? user.email : '',
    'phone':  user !== '' ? user.phone : '',

  }
  const form = useRef()

  const createUser = (values) =>{
    console.log(values)
  }
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
                <li><a className='activo' href="/listUsers">Usuarios</a></li><hr/>
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
                        <button className='crear' onClick={() => navigate('/listUsers')}>Volver</button>
                        <h3>{type === 'crear' ? 'Crear usuario' : 'Editar Usuario' }</h3>
                    </div>
                    <div className= 'contenedorEdit'>
                    <Card title = {type === 'crear' ? 'Información del nuevo usuario' : 'Información actual del usuario'} actions={[
                        <div>
                            <button className='botonEditarCrear' onClick = {() => {form.current.submitForm()}} type = "submit">Guardar</button>
                        </div>
                    ]}>
                        <Formik validationSchema={userSchema} innerRef = {form} initialValues = {valuesInitial} 
                            onSubmit = {type === 'crear'? (values) => createUser(values): (values) => editUser(values)} title = 'Información actual del usuario'>
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

export default FormUser
