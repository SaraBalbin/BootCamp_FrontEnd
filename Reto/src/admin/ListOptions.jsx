import { Card, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ListOptions = () => {
  const navigate = useNavigate();
  let actualUser = JSON.parse(localStorage.getItem('actualUser'));
  let questions = JSON.parse(localStorage.getItem('questions'));
  let options = JSON.parse(localStorage.getItem('actualOptions'));


  const location = useLocation();
  const idActualQuestion = location.state.id;

  useEffect(() => {
    if (actualUser === null) {
        navigate('/')
    } else if (actualUser.role !== 'admin'){
        navigate('/studentHome')
    }
  })

  // Edit
  const [edit, setEdit] = useState(false)
  const [msgEdit, setMsgEdit] = useState(false)
  
  const closeModalEdit = () =>{
    setEdit(false)
  }
  const closeModalMsgEdit = () => {
    setMsgEdit(false)
  }
  const [currentOption, setCurrentOption] = useState('')
  const [idOption, setIdOption] = useState('')

  const editOption = (idOpt) =>{
    setIdOption(idOpt)
    for (let elemento of options){
      if (elemento.id === idOpt){
        setCurrentOption(elemento)
        break
      }
    }
    setEdit(true)
  }
  const submit = (e) => {
    e.preventDefault()
    for (let i = 0; i < questions.length; i++) {
      let quest = questions[i];
      if (quest.id === idActualQuestion){
        for (let j = 0; j < quest.options.length; j++) {
          let option = quest.options[j];
          if (option.id === idOption){
            if (currentOption instanceof Object){
              questions[i].options[j].option = currentOption.option
              if (currentOption.option.trim() === '') return false;
            }
            else {
              if (currentOption.trim() === '') return false;
              questions[i].options[j].option = currentOption
            }
            localStorage.setItem('actualOptions', JSON.stringify(questions[i].options))
            break
          }
          
        }
      }
    }
    localStorage.setItem('questions', JSON.stringify(questions))
    closeModalEdit()
    setMsgEdit(true)
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
                <li><a  onClick={() => {localStorage.removeItem('actualUser')}} href = '/'>Salir</a></li>
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
                        <Table rowKey="id"  dataSource={JSON.parse(localStorage.getItem('actualOptions'))} columns = {columnsOptions} />
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
              <input className = 'idRead' value={idOption} readOnly></input>
            </div>
            <div>
              <label>Contenido de la opción</label>
              <textarea className = 'inputEditar' value={currentOption.option} onChange={e => setCurrentOption(e.target.value)} />
            </div>
          </form>
        </Modal>

        <Modal open ={msgEdit}
            onOk= {closeModalMsgEdit}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
            title = 'Edición exitosa'
            >
            Opción actualizada correctamente
      </Modal>
      </div>
  )
}

export default ListOptions
