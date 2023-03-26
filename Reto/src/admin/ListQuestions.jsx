import { Card, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { questions } from './data'
import { useNavigate } from 'react-router-dom';

const ListQuestions = () => {

  let actualUser = JSON.parse(localStorage.getItem('actualUser'));
  const navigate = useNavigate();
  let questions = ''

  const getQuestions = () => {
    if (localStorage.getItem('questions') === null){
        localStorage.setItem('questions', JSON.stringify([{
          "question": "¿Los números son estudiados por?",
          "id": 1,
          "options": [{
              "id": 1,
              "option": "La biología",
          }, {
              "id": 2,
              "option": "Las Matemáticas",
          }, {
              "id": 3,
              "option": "La sociología",
          }, {
              "id": 4,
              "option": "La medicina",
          }]
      }, {
          "question": "¿Qué ciencia o disciplina estudia la estructura y funcionamiento del cuerpo humano?",
          "id": 2,
          "options": [{
              "id": 5,
              "option": "Cardiología",
          }, {
              "id": 6,
              "option": "Zoología",
          }, {
              "id": 7,
              "option": "Anatomía",
          }, {
              "id": 8,
              "option": "Fisiología humana",
          }]
      }]))
    }
    questions = JSON.parse(localStorage.getItem('questions'))
  }

  useEffect(() => {
    if (actualUser === null) {
        navigate('/')
    } else if (actualUser.role === 'estudiante'){
        navigate('/studentHome')
    }
    getQuestions()
})


  // Eliminar Preguntas
  const [deleted, setDeleted] = useState(false)

  const closeModalDelete = () =>{
    setDeleted(false)
  }

  const deleteQuestion = (id) =>{
    const result = questions.filter(question => question.id !== id);
    localStorage.setItem('questions', JSON.stringify(result))
    setDeleted(true)

  }

    // Editar Pregunta
    const [edit, setEdit] = useState(false)

    const closeModalEdit = () =>{
      setEdit(false)
    }
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [idQuestion, setIdQuestion] = useState('')

    const editQuestion = (id) =>{
      setIdQuestion(id)
      for (let elemento of questions.questions){
        if (elemento.id === id){
          setCurrentQuestion(elemento)
          break
        }
      }
      setEdit(true)
    }

    const submit = (e) => {
      console.log(idQuestion)
      e.preventDefault()
      let obj = ''
      if (currentQuestion instanceof Object){
        obj = {"question": currentQuestion.question}
      }
      else {
        obj = {"question": currentQuestion}
      }
      console.log(obj)
      closeModalEdit()
    }

  const columns = [
    {
        title: 'ID pregunta',
        dataIndex: 'id'
    },
    {
        title: 'Pregunta',
        dataIndex: 'question'
    },
    {
        title: 'Acciones',
        dataIndex: 'id',
        render:(id)=>{
          return (
            <div>
              <button className = 'botonListar editarVer' onClick={() => {editQuestion(id)}}>Editar</button>
              <button className = 'botonListar editarVer' onClick={() => navigate(`/listOptions/${id}`, {state:{id:id}})}>Ver Opciones</button>
              <button className = 'botonListar borrar' onClick={() => {deleteQuestion(id)}}> X </button>
            </div>
          )
        }
    },
  ]
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
                  <h3>Administracion de Preguntas</h3>
                  <button onClick={() => navigate('/createQuestion')} >Crear Pregunta</button>
              </div>
              <div>
                  <Card className='tablaQuestions'>
                      <Table rowKey="id" dataSource={JSON.parse(localStorage.getItem('questions'))} columns = {columns} 
                      pagination={{ pageSize: 5, showSizeChanger: true }} />
                  </Card>
              </div>

          </div>
        </div>
        <Modal open ={deleted}
                onOk= {closeModalDelete}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
                title = 'Borrado de pregunta'
                    >
                La pregunta seleccionada ha sido eliminada exitosamente
        </Modal>

        <Modal open ={edit}
                onCancel = {closeModalEdit}
                onOk = {submit}
                okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
                title = 'Editar Pregunta'
                okText = 'Guardar'
                cancelText = 'Cancelar'
                    >
          <form className = 'editarPregOpc' >
            <div>
              <label>ID de la pregunta</label>
              <input required className = 'idRead' value={idQuestion} readOnly></input>
            </div>
            <div>
              <label>Contenido de la pregunta</label>
              <textarea required className = 'inputEditar' value={currentQuestion.question} onChange={e => setCurrentQuestion(e.target.value)} />
            </div>
          </form>
        </Modal>
      </div>
  )
}

export default ListQuestions
