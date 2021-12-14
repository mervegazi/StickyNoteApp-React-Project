import { useState,useContext} from "react";
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
    const {boxPosition, setBoxVisible, setMode, notes, setNotes}=useContext(MainContext) //maincontexteki datadan boxpositionu çektik
    const [color, setColor]= useState(types[0].color) //not renklerini statete tutuyoruz.
    const [note, setNote]=useState('') //notun girilip girilmediğini tutuyor ilk başta boş geliyor sonra textarea ya notlar girdikçe nu notları state te tutuyoruz.
//not girildikçe ekle butonu aktif oluyor bunun kontrolünü de buton özelliklerinde ve css olarak verdik.


    const changeColor = (e) => { //seçime göre not noktasının renk değiştirilmesi yapıldı.
        setColor(e.target.value)
    }

    const addNote=()=> {    //notu ekle butonuna bastığımızda çalışacak method
        const currentNote={
                note, 
                number:notes.length + 1,
                color,
                position:{
                  x:boxPosition.x,
                  y:boxPosition.y,
                }   
        }
        setNotes([...notes, currentNote]) //notların tamamı + benim notumu stateye kaydettik.
        setBoxVisible(false)
        setMode(true) //tekrar yeni bir şey ekleyebilelim bir not yazıp kaydettikten sonra not yazma modundan çıkmaması için trueladık.

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
        <textarea onChange={(e) =>setNote(e.target.value)} cols="30" rows="5" />
        <button onClick={addNote} disabled={!note}>Ekle</button>
     </div>
    )
    
}
export default NoteBox