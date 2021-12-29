import { useState } from 'react'
import { ViewerLayer } from './components/viewer/viewer-layer'
import './assets/css/global.css';
import { IEventSigner } from './interfaces/event-signet';

interface IHandleFile {
  files: FileList
}

function App() {

  const [file, setFile] = useState<File | undefined>();
  const [info, setInfo] = useState<any>({});

  const handleFile = ({ files }: IHandleFile) => {
    if (!files.length) return false;
    const tmpFile: File = files[0];
    setFile(tmpFile);
  } 

  const handleSigne = (data: IEventSigner) => {
    setInfo(data);
    setFile(undefined);
  }

  return (
    <div className="App">
      {
        file?.name ? 
          <ViewerLayer
            onClose={() => setFile(undefined)}
            onSigner={handleSigne}
            file={file}
            certInfo={{ 
              id: 1,
              serialNumber: "20393146857",
              displayTitle: "Universidad Nacional de Ucayali"
            }}
          />
        : null  
      }
      <input type="file"
        onChange={(e: any) => handleFile(e.target)}
      />
      <div>
        {JSON.stringify(info)}
      </div>
    </div>
  )
}

export default App
