import { Card, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { questions } from './data'
import { useNavigate } from 'react-router-dom';

const ListQuestions = () => {
  const navigate = useNavigate();

  // Delete
  const [deleted, setDeleted] = useState(false)
  const [closeDelete, setCloseDelete] = useState(false)

  const closeModalDelete = () =>{
    setCloseDelete(true)
    setDeleted(false)
  }

  const deleteQuestion = (id) =>{
      console.log(id)
      setDeleted(true)
  }

    // Edit
    const [edit, setEdit] = useState(false)
    const [closeEdit, setCloseEdit] = useState(false)

    const closeModalEdit = () =>{
      setCloseEdit(true)
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
                      <Table rowKey="id" dataSource={questions.questions} columns = {columns} />
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
                La pregunta seleccionada ha sido eliminada
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
