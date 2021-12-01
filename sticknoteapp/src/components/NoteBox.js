import { useContext, useState } from "react";
import MainContext from '../MainContext';

function NoteBox() {
  
    const types= [
        {
            name: "comment",
            color: "red",
            text: "Yorum"
        },
        {
            name:"private-comment",
            color:"#999",
            text:"Gizli Yorum"

        },
        {
            name: "note",
            color: "orange",
            text: "Not"
        }
    ]
    const {boxPosition, setMode, notes}= useContext(MainContext) //maincontexteki datadan boxpositionu çektik
    const [color, setColor]= useState(types[0].color)
    const changeColor = (e) => { //seçime göre not noktasının renk değiştirilmesi yapıldı.
        setColor(e.target.value)
    }

    return(
     <div onMouseEnter={() => setMode(false)} onMouseLeave={()=>setMode(true)} className="note-box" 
     style={{'--color':color, position:'absolute', top: boxPosition.y, left: boxPosition.x}}>
         <span className="note-box-number">{notes.length + 1 }</span>
        <select onChange={changeColor}>           
            {types.map(type =>(
                <option value={type.color}>{type.text}</option>
            ))}          
        </select>
        <textarea cols="30" rows="5" />
     </div>
    )
    
}
export default NoteBox