import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { Field, Form, Formik } from 'formik';

const CreateQuestion = () => {
  const navigate = useNavigate();

  const createQuestion = (values) =>{
    let array = [false, false, false, false]
    array[values.correct -1] = true
    
    const result = {
      'question': values.question,
      'options': [
        {
          'option': values.option1,
          'iscorrect': array[0]
        },
        {
          'option': values.option2,
          'iscorrect': array[1]
        },
        {
          'option': values.option3,
          'iscorrect': array[2]
        },
        {
          'option': values.option4,
          'iscorrect': array[3]
        }
      ]
    }
    console.log(result)
  } 

  let valuesInitial = {
    'question': '',
    'option1': '',
    'option2': '',
    'option3': '',
    'option4': '',
    'correct': '1'
  }

  const form = useRef()

  return (
    <div>
      <nav id = 'navHome'>
        <ul>
          <div>
              <img alt = 'escudoUnal' src='https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png'></img>
          </div>
          <hr/>
          <li><a href="/adminHome">Principal</a></li>
          <hr/>
          <li><a href="/listUsers">Usuarios</a></li>
          <hr/>
          <li><a className='activo' href="/listQuestions">Preguntas</a></li>
          <hr/>
          <li><a href="#news">Información</a></li>
          <hr/>
            </ul>
        </nav>
      <div id ='menuAdmin'>
        <div id = 'barraSuperior'> 
          <p>Sistema de administracion académico - Universidad Nacional de Colombia</p>
          <p>Admin</p>
          <img id = 'perfil' alt = 'perfil' src ='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'/>
        </div>
        <div id = 'contenidoAdmin'>
          <div className='contenidoSuperior'>
            <button className='crear' onClick={() => navigate('/listQuestions')}>Volver</button>
            <h3>Crear Pregunta</h3>
          </div>
          <div className= 'contenedorEdit'>
            <Card title = 'Información de la pregunta y opciones de respuesta' actions={[
              <div>
                  <button className='botonEditarCrear' onClick = {() => {form.current.submitForm()}} type = "submit">Guardar</button>
              </div>
            ]}>
              <Formik innerRef = {form} initialValues = {valuesInitial}
                  onSubmit = {(values) => createQuestion(values)} title = 'Información actual del usuario'>
                <Form>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <label>Pregunta </label>
                          <Field id = 'question' className = 'input ' name = "question"/>  
                        </td>
                        <td>
                          <label>Respuesta Correcta</label>
                          <Field id = 'options' className = 'input' name="correct" component="select">
                            <option value="1">Opcion 1</option>
                            <option value="2">Opcion 2</option>
                            <option value="3">Opcion 3</option>
                            <option value="4">Opcion 4</option>
                          </Field>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Opcion 1 </label>
                          <Field className = 'input ' name = "option1" />                 
                        </td>
                        <td>
                          <label>Opcion 2 </label>
                          <Field className = 'input ' name = "option2"/>                 
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Opcion 3 </label>
                          <Field className = 'input ' name = "option3" />                 
                        </td>
                        <td>
                          <label>Opcion 4 </label>
                          <Field className = 'input ' name = "option4"/>                 
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

export default CreateQuestion
