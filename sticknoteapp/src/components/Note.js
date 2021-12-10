import { useState } from "react";
import Draggable from 'react-draggable'; //sürükle bırak hareketi için paket yükledik ve bu paket default position istiyor.
import MainContext from "../MainContext";

function Note(note) {

const [visible, setVisible]= useState(false)
const [clickable, setClickable]= useState(true)
const {setMode} = useContext(MainContext)

const showNote=() =>{
  if(clickable){
     setVisible(!visible)
    }
}

    return(
        <Draggable defaultPosition={{x:note.position.x, y:note.position.y}}>
        <div onMouseEnter={() => setMode(false)} onMouseLeave={()=>setMode(true)} className="note-container" 
        style={{'--color':note.color,  position:'absolute', top:0, left:0}}>
           <span onClick={showNote} className="note-box-number">{note.number}</span>
            <div className="note" style={{display: visible ? 'flex' : 'none'}}>
                {note.note}
            </div>
        </div>
        </Draggable>
    )
    
}
export default Note