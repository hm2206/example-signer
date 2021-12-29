## React Pdf Signer

Es una librería open source para el posicionamiento del widget
de una firma digital en un archivo PDF

## Instalar

```
  npm install react-pdf-signer
```

## Example

[React Pdf Example](https://react-pdf-example.vercel.app/)

## Importación del ViewerLayer y sus estilos

```js
import "react-pdf-signer/src/assets/css/index.css";
import { ViewerLayer } from "react-pdf-signer";
```

### Props

## | Nombre | Tipo | Parámetros

## | certInfo | TCertInfo | null

## | onClose | void | null

## | onSigner| void | data: IEventSigner

## | file | File | null

### Interfaces

```js
interface IEventSigner {
  isVisibled: boolean
  certId: number
  page: number
  reason: string
  location: string
  positionX: number
  positionY: number
}

interface TCertInfo {
  id: number
  serialNumber: string
  displayTitle: string
}

```

### Ejemplo

```tsx
import React, { useState } from "react";
import { ViewerLayer } from "react-pdf-signer";

interface IHandleFile {
  files: FileList;
}

function App() {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFile = ({ files }: IHandleFile) => {
    if (!files.length) return;
    setFile(files[0]);
  };

  return (
    <div className="App">
      <input type="file" onChange={(e: any) => handleFile(e.target)} />

      {file?.name ? (
        <ViewerLayer
          certInfo={{
            id: 1,
            serialNumber: "000000005",
            displayTitle: "Hans Medina",
          }}
          file={file}
          onSigner={(data: any) => console.log(data)}
          onClose={() => setFile(undefined)}
        />
      ) : null}
    </div>
  );
}

export default App;
```
