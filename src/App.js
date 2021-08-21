import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});

  const handleSubmit = e => {
    e.preventDefault();
    if(!name){
      showAlert(true, 'danger', 'Please fill in the field')
    }else if(name && isEditing){
      setList(list.map((item) => {
        if(item.id === editId) {
          return {...item, title: name}
        }
        return item
      }))
      setIsEditing(false)
      setEditId(null)
      setName('')
      showAlert(true, 'success', 'Note successfully edited')
    }else {
      showAlert(true, "success", 'Note added successfully')
      const newItem = {id: new Date().getTime().toString(), title: name };
      setList([...list, newItem])
      setName('')
    }
  }   
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, type, msg})
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Clear all notes')
    setList([]);
  }

  const removeItem = ( id ) => {
    showAlert(true, 'danger', 'Note deleted successfully')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>} 
        <h3> Note List </h3>
        <div className='form-control'>
          <input 
            type='text' 
            className='grocery' 
            placeholder='Place for a note' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
      <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button onClick={clearList} className='clear-btn'>clear all</button>
      </div>
      )}
    </section>
  )
}

export default App
