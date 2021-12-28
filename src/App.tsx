import { useState } from 'react'
import { ViewerLayer } from './components/viewer/viewer-layer'
import './assets/css/global.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ViewerLayer
        url='https://sis.unia.edu.pe/api_tramite/api/file/?disk=tmp&path=/tramite/YOCXMI4IPS/desarrolloSoftware.pdf'
      />
    </div>
  )
}

export default App
