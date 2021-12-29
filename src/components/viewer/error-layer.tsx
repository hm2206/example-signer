
interface IPropsError {
  width: number 
  height: number
}

export const ErrorLayer = ({ width, height }: IPropsError) => {
  return (
    <div className="error__layer"
      style={{ 
        width,
        height
      }}
    >
      El archivo no es compatible
    </div>
  )
}