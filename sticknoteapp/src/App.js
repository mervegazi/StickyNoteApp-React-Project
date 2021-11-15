import { useRef, useState, useEffect } from 'react';
import './App.css';
import MainContext from './MainContext';
import Note from './components/Note';
import LeaveCommentText from './components/LeaveCommentText';
import NoteBox from './components/NoteBox';
function App() {

  const screen=useRef(null)
  const [mode, setMode]= useState(false)
  const [notes, setNotes,]=useState([{

    id:"1", 
    note: "bu bir test nottur xd", 
    color: "green",
    position:{
      x:350,
      y:300
    }

  }])
  const [position, setPosition]= useState({
    x: 0,
    y: 0
  })
  const [boxVisible,setBoxVisible] = useState(false)
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0

  })


  useEffect(()=>{
    screen.current.focus()
  })

  const handleKeyUp=(e) => { //not yazma modunun açık olup olmadığını kontrolü
    if(e.key==='c'){
      setMode(!mode)
      
    }
  }
  const handleMauseMove= (e) => { //faremin konumunu state atadım 
    
    if(mode) {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
  }
  }

  const handleClick=(e) => {
    setBoxPosition({
      x: position.x,
      y: position.y
    })
    setBoxVisible(true);
  }

const data={
  position,
  boxPosition
}

  return (
    <MainContext.Provider value={data}> {/*her yerden erişebilmek için provider içine aldım context olarak ulaşacağız. */}
    <div ref={screen} tabIndex={0} onClick={handleClick} onMouseMove={handleMauseMove} onKeyUp={handleKeyUp} className={`screen${mode && 'editable'}`}>
     
    <img style={{Width:'600px', height:'800px' }} src="https://peltiertech.com/images/2016-11/BlankPowerPoint.png"/>
     
     {mode &&<LeaveCommentText/>}

      {mode && (<div>Yorum modu aktif!</div>)}
  
      {notes && notes.map(note => <Note {...note}/>)}
      
      {boxVisible && <NoteBox/>}

    </div>
    </MainContext.Provider>
  );
}

export default App;
