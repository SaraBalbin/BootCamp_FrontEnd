import React, { useEffect, useRef, useState } from 'react'
import { object, string } from 'yup';
import { Card, Modal } from 'antd';
import { Field, Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';


const FormUser = ({type}) => {
  
  let actualUser = JSON.parse(localStorage.getItem('actualUser'));
  const navigate = useNavigate();
  let students = JSON.parse(localStorage.getItem('students'));

  useEffect(() => {
    if (actualUser === null) {
        navigate('/')
    } else if (actualUser.role !== 'admin'){
        navigate('/studentHome')
    }
  })
    
  let userSchema = object({
      firstName: string().required(),
      secondName: string(),
      surname: string().required(),
      secondSurName: string().required(),
      typeDocument: string().required(),
      documentNumber: string().required(),
      email: string().email().required(),
      phone: string().required(),
      password: string().required(),
  });

  let user = ''
  const location = useLocation();

  if (type === 'editar'){
    const idUser = location.state.id;
    for (let elemento of students){
        if (elemento.id === idUser){
            user = elemento
            break
        }
    }
  }

  let valuesInitial = {
    'id': user !== '' ? user.id: 'ID generado automaticamente',
    'firstName': user !== '' ? user.firstName : '',
    'secondName':  user !== '' ? user.secondName : '',
    'surname':  user !== '' ? user.surname : '',
    'secondSurName':  user !== '' ? user.secondSurName : '',
    'typeDocument': '1',
    'documentNumber':  user !== '' ? user.documentNumber : '',
    'email':  user !== '' ? user.email : '',
    'phone':  user !== '' ? user.phone : '',
    'password':  user !== '' ? user.password : '',

  }
  const form = useRef()

  // Crear usuario
  const [msgCreate, setMsgCreate] = useState(false)

  const createUser = (values) =>{

    let listUsers = JSON.parse(localStorage.getItem('students'))
    let newID = 0
    if (listUsers.length !== 0){
      newID = listUsers[listUsers.length - 1].id + 1
    }
    values.id = newID
    listUsers.push(values)
    localStorage.setItem('students', JSON.stringify(listUsers))

    // Actualizar lista Soluciones
    let listUsersSolutions = JSON.parse(localStorage.getItem('studentsAnswer'))
    let newUserSolution = {
      'id': newID,
      'answers': [],
      'formOk': false
    }
    listUsersSolutions.push(newUserSolution)
    localStorage.setItem('studentsAnswer', JSON.stringify(newUserSolution))
    setMsgCreate(true)
  }

  const closeModalCreate = () => {
    navigate('/listUsers')
  }

  // Editar Usuario
  const [msgEdit, setMsgEdit] = useState(false)

  const closeModalEdit = () => {
    navigate('/listUsers')
  }

  const editUser = (values) =>{
    let listUsers = JSON.parse(localStorage.getItem('students'))
    const idEdit = values.id

    for (let index = 0; index < listUsers.length; index++) {
        const student = listUsers[index];
        if (student.id === idEdit){
            listUsers[index] = values
        }
    }
    localStorage.setItem('students', JSON.stringify(listUsers))
    setMsgEdit(true)
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
                <li><a  onClick={() => {localStorage.removeItem('actualUser')}} href = '/'>Salir</a></li>
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
                                        <Field className = 'input'  disabled = {true} name = "id"/>                 
                                    </td>
                                    <td>
                                        <label>Primer nombre </label>
                                        <Field className = 'input' name = "firstName"/>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                        <label>Segundo nombre </label>
                                        <Field className = 'input' name = "secondName"/>               
                                    </td>
                                    <td>
                                        <label>Primer apellido </label>
                                        <Field className = 'input' name = "surname"/>
                                    </td>
                                  </tr>
                                  <tr>
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
                                        <Field className = 'input' name = "documentNumber"/>                                             
                                    </td>
                                    <td>
                                        <label> Correo electrónico </label>
                                        <Field className = 'input' type = 'email' name = "email"/>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                        <label> Número de teléfono </label>
                                        <Field className = 'input' name = "phone"/>
                                    </td>
                                    <td>
                                        <label>Contraseña asignada</label>
                                        <Field className = 'input' name = "password"/>                                             
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
        <Modal open ={msgCreate}
            onOk= {closeModalCreate}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
            title = 'Creacion exitosa'
            >
            Estudiante creado correctamente
        </Modal>
        <Modal open ={msgEdit}
            onOk= {closeModalEdit}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
            title = 'Edición exitosa'
            >
            Estudiante actualizado correctamente
        </Modal>
    </div>
  )
}

export default FormUser
