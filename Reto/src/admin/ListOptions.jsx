import { Card, Form, Modal, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { questionComplete } from './data'
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

const ListOptions = () => {
  const navigate = useNavigate();

    // Edit
    const form = useRef()
    const [edit, setEdit] = useState(false)
    const [closeEdit, setCloseEdit] = useState(false)
    
    const closeModalEdit = () =>{
      setCloseEdit(true)
      setEdit(false)
    }
    const [currentOption, setCurrentOption] = useState('')
    const [idQuestion, setIdQuestion] = useState('')
  
    const editOption = (id) =>{
      setIdQuestion(id)
      console.log(id)
      console.log(idQuestion)
      for (let elemento of questionComplete.options){
        if (elemento.id === id){
          setCurrentOption(elemento)
          break
        }
      }
      setEdit(true)
    }

    const submit = (e) => {
      console.log(idQuestion)
      e.preventDefault()
      let obj = ''
      if (currentOption instanceof Object){
        obj = {"option": currentOption.option}
      }
      else {
        obj = {"option": currentOption}
      }
      console.log(obj)
      closeModalEdit() 
    }
  
  const columnsOptions = [
    {
        title: 'ID opción',
        dataIndex: 'id'
    },
    {
        title: 'Opcion',
        dataIndex: 'option'
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      render:(id)=>{
          return (
              <div>
                  <button className = 'botonListar editarVer' onClick = {() => {editOption(id)}}> Editar </button>
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
                  <button onClick={() => navigate('/listQuestions')}>Volver</button>
                  <h3>Administracion de Opciones</h3>
                </div>
                <div>
                    <Card className='tablaQuestions'>
                        <Table rowKey="id" dataSource={questionComplete.options} columns = {columnsOptions} />
                    </Card>
                </div>
    
            </div>
        </div>

        <Modal open ={edit}
                onCancel = {closeModalEdit}
                onOk = {submit}
                okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
                title = 'Editar Opción'
                okText = 'Guardar'
                cancelText = 'Cancelar'
                    >
                <form className = 'editarPregOpc' >
                  <div>
                    <label>ID de la opción</label>
                    <input className = 'idRead' value={idQuestion} readOnly></input>
                  </div>
                  <div>
                    <label>Contenido de la opción</label>
                    <textarea className = 'inputEditar' value={currentOption.option} onChange={e => setCurrentOption(e.target.value)} />
                  </div>
                </form>
        </Modal>
      </div>
  )
}

export default ListOptions
