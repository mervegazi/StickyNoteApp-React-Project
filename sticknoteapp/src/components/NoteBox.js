import { useContext, useState } from "react";
import MainContext from '../MainContext';

function NoteBox() {
    const {boxPosition}= useContext(MainContext)

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

    return(
     <div className="note-box" style={{position:'absolute', top: boxPosition.y, left: boxPosition.x}}>
        <select>
            <option value={type.name}>{type.text} ></option>
        </select>
     </div>
    )
    
}
export default NoteBox