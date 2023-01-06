//editing using contentEditable attribute and with search feature

import React from "react"
import Header from "./components/header"
import Footer from "./components/footer";
import './App.css';
import {nanoid} from "nanoid"


export default function App() {
  const[listItem,setListItem]=React.useState([])
  const[todo,setTodo]=React.useState("")
  const[search,setSearch]=React.useState("")

  React.useEffect(()=>{
    const toDoData=JSON.stringify(listItem)
    localStorage.setItem("ToDos",toDoData)
  },[listItem])
  
  React.useEffect(()=>{
      const data=localStorage.getItem("ToDos")
      const parsedData=JSON.parse(data)
      if(parsedData)
      {
        setListItem(parsedData)
      }
  },[])
  
    function handleSubmit(e)
    {
      e.preventDefault()

      const newItem={
        id:nanoid(),
        text:todo,
        checked:false,
        isEditable:false
      }
      setListItem(prevItem=>[...prevItem,newItem])
      setTodo("")
    }

    function handleDelete(Id)
    {
      setListItem(prevItemList=>prevItemList.filter(item=>item.id!==Id))
    }

    function checkComplete(Id)
    {
      setListItem(prevItem=>prevItem.map(item=>{
        if(item.id===Id)
        return {...item,checked:!item.checked}
        return item
      }))
    }
    
    function updateEdit(Id)
    {
      setListItem(prevItem=>prevItem.map(item=>{
        if(item.id===Id)
        return {...item,isEditable:!item.isEditable}
        return item
      }))
    }

    function saveEdit(Id)
    {
      setListItem(prevItem=>prevItem.map(item=>{
        if(item.id===Id)
        return {...item,isEditable:!item.isEditable}
        return item
      }))
    }

  return (
    <div className="App">
      <Header/>
      <form onSubmit={handleSubmit}>
        <div className="new-toDo">

        <input 
        type="text" 
        placeholder="Add new Todos"
        onChange={(e)=>setTodo(e.target.value)} 
        value={todo} 
        />

        <button 
        type="submit" 
        className="add-btn">Add</button>

        </div>
      </form>
      <form className="search-form" onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="search"></label> 
                    <input type="text"
                     placeholder="search ToDOs "
                     role="searchbox"
                     value={search}
                     onChange={(e)=>setSearch(e.target.value)}
                     />
                  </form>

      {
        //.filter is used for searching purpose
        listItem.filter(item=>((item.text).toLowerCase()).includes(search.toLocaleLowerCase())).map(item=>{
         return (
                <div className="listItems" key={item.id}>
                  <input type="checkbox" 
                  className="checkbox"
                   onChange={()=>checkComplete(item.id)}
                   checked={item.checked}
                   />
                  
                  <div className="item-text"
                       style={(item.checked)?{textDecoration:"line-through"}:null}
                       onDoubleClick={()=>checkComplete(item.id)}
                       contentEditable={item.isEditable}
                    >
                    {item.text}
                  </div>              
                  <div className="item-buttons">
                    <button className="delete-btn" onClick={()=>handleDelete(item.id)}>delete</button>
                    {
                    item.isEditable?
                    (<button className="edit-btn" onClick={()=>saveEdit(item.id)} >save</button>)
                    :
                    ( <button className="edit-btn" onClick={()=>updateEdit(item.id)}>edit</button>)
                    } 
                  </div>
                </div>
            )
      })}
      <Footer length={listItem.length}/>
    </div>
  );
}





















// //editing using contentEditable without search feature

// import React from "react"
// import Header from "./components/header"
// import './App.css';
// import {nanoid} from "nanoid"

// export default function App() {
//   const[listItem,setListItem]=React.useState([])
//   const[todo,setTodo]=React.useState("")

//   React.useEffect(()=>{
//     const toDoData=JSON.stringify(listItem)
//     localStorage.setItem("ToDos",toDoData)
//   },[listItem])
  
//   React.useEffect(()=>{
//       const data=localStorage.getItem("ToDos")
//       const parsedData=JSON.parse(data)
//       if(parsedData)
//       {
//         setListItem(parsedData)
//       }
//   },[])

//     function handleSubmit(e)
//     {
//       e.preventDefault()

//       const newItem={
//         id:nanoid(),
//         text:todo,
//         checked:false,
//         isEditable:false
//       }
//       setListItem(prevItem=>[...prevItem,newItem])
//       setTodo("")
//     }

//     function handleDelete(Id)
//     {
//       setListItem(prevItemList=>prevItemList.filter(item=>item.id!==Id))
//     }

//     function checkComplete(Id)
//     {
//       setListItem(prevItem=>prevItem.map(item=>{
//         if(item.id===Id)
//         return {...item,checked:!item.checked}
//         return item
//       }))
//     }
    
//     function updateEdit(Id)
//     {
//       setListItem(prevItem=>prevItem.map(item=>{
//         if(item.id===Id)
//         return {...item,isEditable:!item.isEditable}
//         return item
//       }))
//     }

//     function saveEdit(Id)
//     {
//       setListItem(prevItem=>prevItem.map(item=>{
//         if(item.id===Id)
//         return {...item,isEditable:!item.isEditable}
//         return item
//       }))
//     }

//   return (
//     <div className="App">
//       <Header/>
//       <form onSubmit={handleSubmit}>
//         <div className="new-toDo">

//         <input 
//         type="text" 
//         placeholder="Add new Todos"
//         onChange={(e)=>setTodo(e.target.value)} 
//         value={todo} 
//         />

//         <button 
//         type="submit" 
//         className="add-btn">Add</button>

//         </div>
//       </form>

//       {
//         listItem.map(item=>{
//          return (
//                 <div className="listItems" key={item.id}>
//                   <input type="checkbox" 
//                   className="checkbox"
//                    onChange={()=>checkComplete(item.id)}
//                    checked={item.checked}
//                    />
                  
//                   <div className="item-text"
//                        style={(item.checked)?{textDecoration:"line-through"}:null}
//                        onDoubleClick={()=>checkComplete(item.id)}
//                        contentEditable={item.isEditable}
//                     >
//                     {item.text}
//                   </div>
                  
                   
                    
//                   <div className="item-buttons">
//                     <button className="delete-btn" onClick={()=>handleDelete(item.id)}>delete</button>
//                     {
//                     item.isEditable?
//                     (<button className="edit-btn" onClick={()=>saveEdit(item.id)} >save</button>)
//                     :
//                     ( <button className="edit-btn" onClick={()=>updateEdit(item.id)}>edit</button>)
//                     } 
//                   </div>
//                 </div>
//             )
//       })}
//     </div>
//   );
// }






//Editing method 2(making the list item input everytime edit button is clicked)




// import React from "react"
// import Header from "./components/header"
// import './App.css';
// import {nanoid} from "nanoid"

// export default function App() {
//   const[listItem,setListItem]=React.useState([])
//   const[todo,setTodo]=React.useState("")
//   const[todoEditing,setTodoEditing]=React.useState(null)
//   const[editingText,setEditingText]=React.useState("")
  
//     function handleSubmit(e)
//     {
//       e.preventDefault()

//       const newItem={
//         id:nanoid(),
//         text:todo,
//         checked:false
//       }
//       setListItem(prevItem=>[...prevItem,newItem])
//       setTodo("")
//     }

//     function handleDelete(Id)
//     {
//       setListItem(prevItemList=>prevItemList.filter(item=>item.id!==Id))
//     }

//     function checkComplete(Id)
//     {
//       setListItem(prevItem=>prevItem.map(item=>{
//         if(item.id===Id)
//         return {...item,checked:!item.checked}
//         return item
//       }))
//     }
    
//     function updateEdit(Id)
//     {
//       setListItem(prevItem=>prevItem.map(item=>{
//         if(item.id===Id)
//         return {...item,text:editingText}
//         return item
//       }))
//       setTodoEditing(null)
//       setEditingText("")

//     }

//   return (
//     <div className="App">
//       <Header/>
//       <form onSubmit={handleSubmit}>
//         <div className="new-toDo">

//         <input 
//         type="text" 
//         placeholder="Add new Todos"
//         onChange={(e)=>setTodo(e.target.value)} 
//         value={todo} 
//         />

//         <button 
//         type="submit" 
//         className="add-btn">Add</button>

//         </div>
//       </form>

//       {
//         listItem.map(item=>{
//          return (
//                 <div className="listItems" key={item.id}>
//                   <input type="checkbox" 
//                   className="checkbox"
//                    onChange={()=>checkComplete(item.id)}
//                    checked={item.checked}
//                    />
//                    {
//                    todoEditing===item.id?(<input type="text" 
//                     onChange={(e)=>setEditingText(e.target.value)} 
//                     value={editingText}/>)
//                     :
//                     (<div className="item-text"
//                     style={(item.checked)?{textDecoration:"line-through"}:null}
//                     onDoubleClick={()=>checkComplete(item.id)}
//                     >
//                     {item.text}
//                   </div>
//                   )}
                   
                    
//                   <div className="item-buttons">
//                     <button className="delete-btn" onClick={()=>handleDelete(item.id)}>delete</button>
//                     {
//                     todoEditing===null?
//                     (<button className="edit-btn" onClick={()=>setTodoEditing(item.id)} >edit</button>)
//                     :
//                     ( <button className="edit-btn" onClick={()=>updateEdit(item.id)}>save</button>)
//                     } 
//                   </div>
//                 </div>
//             )
//       })}
//     </div>
//   );
// }
