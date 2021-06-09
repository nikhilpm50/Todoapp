import React, { useEffect } from 'react'
import {useState} from 'react'


import './App.css'

function Todo() {
  let audio = new Audio("/Ding.mp3")
  const start = () =>{
    audio.play()
  }
    const [toDos,setToDos]= useState([])
    const [toDo,setToDo]= useState('');
    

    const saveData = (toDo) =>{
      localStorage.setItem("toDos",JSON.stringify(toDo));
    }

    useEffect(()=>{
      if(localStorage.getItem("toDos")){
        setToDos(JSON.parse(localStorage.getItem('toDos')));
      }
    }, []);
   
    const onAddTodo = () => {
      if (toDo.trim()) {
        let newTodos = [...toDos,{todo: toDo.trim(),id: Date.now()}]
        setToDos(toDo);
        setToDo('');
        saveData(toDo);
      }
    }
   const deleteTodo = (id) => {
     let toDo= toDos.filter((todo)=> todo.id !== id);
     setToDos(toDos);
     saveData(toDos)
   }
    
     
    return (
        <div>
          <header className='header1'>
            <h1 className='nav_logo'>ToDos<i className="fas fa-check"></i></h1>
          </header>
       <div className="app">

      <div className="subHeading">
        <br />
        <h3> + Add Tasks </h3>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>setToDos([...toDos,{id:Date.now(), text: toDo,status:false}])} className="fas fa-plus"></i>
      </div>
        <div className="todos">
        { toDos.map((obj)=>{

          return ( 
             <div className="todo">

             <div className="left">
               <input  onChange={(e)=>{
                   console.log(e.target.checked)
                   console.log(obj)
                   setToDos(toDos.filter(obj2=>{
                       if(obj2.id===obj.id){
                           obj2.status=e.target.checked 
                       }
                       return obj2
                   }))
               }} value={obj.status} type="checkbox" name="" id="" onClick={start} /> 
               <p>{obj.text}</p>
             </div>

        
            
             <div className="right" >
             {toDos.map((data,key)=>{
              return(
               <i onClick={() => setToDos(toDos.filter((data,index) => index !== key))} className="fas fa-trash"></i>
                )})}

                  
              
               </div>
               
           
           </div>
          )
        }) }
        <div className='completed'>
          
        {toDos.map((obj)=>{
        
            if(obj.status){
              
                return(
                 
                <h4><del> {obj.text}</del> </h4>)
            }
            return null
        })}
          </div>  
    
      </div>
      </div>
        </div>
    );
}

export default Todo
