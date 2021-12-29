import { useState } from 'react'
import { ViewerLayer } from './components/viewer/viewer-layer'
import './assets/css/global.css';

interface IHandleFile {
  files: FileList
}

function App() {

  const [file, setFile] = useState <File | undefined>();

  const handleFile = ({ files }: IHandleFile) => {
    if (!files.length) return false;
    const tmpFile: File = files[0];
    setFile(tmpFile);
  } 

  return (
    <div className="App">
      {
        file?.name ? 
          <ViewerLayer
            onClose={() => setFile(undefined)}
            file={file}
            certInfo={{ 
              serialNumber: "20393146857",
              displayTitle: "Universidad Nacional de Ucayali"
            }}
          />
        : null  
      }
      <input type="file"
        onChange={(e: any) => handleFile(e.target)}
      />
    </div>
  )
}

export default App
