import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const SolveForm = () => {
  let actualUser = JSON.parse(localStorage.getItem('actualUser'));
  let questions = JSON.parse(localStorage.getItem('questions'));
  let studentsAnswer = JSON.parse(localStorage.getItem('studentsAnswer'))

  const navigate = useNavigate();

  useEffect(() => {
    if (actualUser === null) {
        navigate('/')
    } else if (actualUser.role === 'admin'){
        navigate('/adminHome')
    }
  })

  const [msgForm, setMsgForm] = useState(false)

  const closeModalForm = () => {
    navigate('/studentHome')
  }


  const submit = (e) => {
    e.preventDefault()
    let select = document.querySelectorAll('select')
    let respuestas = []
    for (let i = 0; i < select.length; i++) {
      respuestas.push(parseInt(document.getElementById(select[i].id).value));
    }
    let actualUserID = actualUser.id
    for (let index = 0; index < studentsAnswer.length; index++) {
      const element = studentsAnswer[index];
      if (element.id === actualUserID){
        studentsAnswer[index].answers = respuestas
        studentsAnswer[index].formOk = true
        break
      }
    }
    localStorage.setItem('studentsAnswer', JSON.stringify(studentsAnswer))
    setMsgForm(true)
  }

  return (
    <div>
      <nav id = 'navHome'>
        <ul>
          <div>
              <img alt = 'logo UNAL' src='https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png'></img>
          </div>
          <li><a href="/studentHome">Principal</a></li>
          <hr/>
          <li><a className = 'activo' href="/solveForm">Formulario</a></li>
          <hr/>
          <li><a  onClick={() => {localStorage.removeItem('actualUser')}} href = '/'>Salir</a></li>
          <hr/>
        </ul>
      </nav>

      <div id ='menuAdmin'>
        <div id = 'barraSuperior'> 
            <p>Evaluación - Universidad Nacional de Colombia</p>
            <p>Estudiante</p>
            <img alt = 'perfil' id = 'perfil' src ='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'/>
        </div>

        <div id = 'contenidoStudent'>
          <div className="contenidoSuperior">
            <button className='crear' onClick={() => navigate('/studentHome')}> Volver</button>
            <h3>Resolver Formulario</h3>
          </div>
          <div>
            <form onSubmit={(e, values) => {submit(e, values)}}>
              {
              questions.map((question, index) => {
                return (
                  <div key={question.id}>
                    <h4 className = 'pregunta'><b>Pregunta {index+1}: </b>{question.question}</h4>
                    <select className = 'opciones' id = {question.id}>
                      <option value={question.options[0].id}>A. {question.options[0].option}</option>
                      <option value={question.options[1].id}>B. {question.options[1].option}</option>
                      <option value={question.options[2].id}>C. {question.options[2].option}</option>
                      <option value={question.options[3].id}>D. {question.options[3].option}</option>
                    </select>
                  </div>
                )
              })}
              <button className = 'botonEditarCrear botonForm' type='submit'>Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <Modal open ={msgForm}
            onOk= {closeModalForm}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
            title = 'Formulario enviado'
            >
            Respuestas almacenadas con exito
        </Modal>
    </div>
  )
}

export default SolveForm
