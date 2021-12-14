import { useRef, useState, useEffect } from 'react';
import './App.css';
import MainContext from './MainContext';
import Note from './components/Note';
import LeaveCommentText from './components/LeaveCommentText';
import NoteBox from './components/NoteBox';
function App() {

  const screen=useRef(null) //dom işlemi yaptığımız için useref kullanarak bir değişken oluşturduk odaklanmasını da useEffect ile yaptık.
  const [mode, setMode]= useState(false) //yorum modunun açık kapalı bilgisini statete tutuyoruz.
  const [notes, setNotes]=useState(localStorage.notes && JSON.parse(localStorage.notes) || [] ) //notları json ile tuttuk sayfayı yenilediğimizde kaybolmayacaklar.
  const [position, setPosition]= useState({
    x: 0,
    y: 0
  })
  const [boxVisible,setBoxVisible] = useState(false) //yorum kutusu açılması için oluşturulan state
  const [boxPosition, setBoxPosition] = useState({ //notun kalacağı noktayı ayarlamak için pozisyonu bir statete tutuyoruz.
    x: 0,
    y: 0

  })


  useEffect(()=>{ //ilk açılışta c ye basıldığının kontrolünü sağlayan divin içine odaklansın ve kontrol etsin.
    screen.current.focus()
  })

  useEffect(()=>{
   localStorage.setItem('notes', JSON.stringify(notes)) 
  },[notes])

  const handleKeyUp=(e) => { //not yazma modunun açık olup olmadığını kontrolü
    if(e.key==='c'){
      setMode(!mode)
      setBoxVisible(false) 
      
    }
    if(e.key==='Escape'){
      setBoxVisible(false)
    }
  }
  const handleMauseMove= (e) => { //faremin konumunu state atadım 
    if(mode){   
    setPosition({
      x: [e.pageX, e.clientX],
      y: [e.pageY, e.clientY],
    })
  }
}
  const handleClick=(e) => { //tıklanan yere not işareti eklemek için pozisyonları aldık.
    
    if(mode){
    setBoxPosition({
      x: position.x[0],
      y: position.y[0],
    })
    setBoxVisible(true); //tıklayınca yorum kutusu açılsın
  }
}

const data={
  position,
  boxPosition,
  setMode,
  setNotes,
  setBoxVisible, 
  notes,
}

  return (
    <MainContext.Provider value={data}> {/*her yerden erişebilmek için provider içine aldım context olarak ulaşacağız. */}
    <div ref={screen} tabIndex={0} onClick={handleClick} onMouseMove={handleMauseMove} onKeyUp={handleKeyUp} className={`screen${mode && 'editable'}`}>
     
    <img style={{Width:'600px', height:'800px', opacity:'.7'}} src="https://peltiertech.com/images/2016-11/BlankPowerPoint.png"/>
     
     {mode &&<LeaveCommentText/>}
  
      {notes && notes.map((note, key) => <Note key={key} {...note}/>)}
      
      {boxVisible && <NoteBox/>}

    </div>
    </MainContext.Provider>
  );
}

export default App;
