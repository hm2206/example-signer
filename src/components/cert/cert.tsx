import '../../assets/css/cert.css';

export const Cert = () => {
  return (
    <div className='cert__content'>
      <div className="cert__image">
        <img src="https://firmadigital.unia.edu.pe/file?path=certificate/person_1/image/C6XH4WDRZF.jpg&disk=tmp"
          alt="cert"
        />
      </div>
      <div className="cert__info">
        <b>00fca689</b>
        <div className='info__title'>
          Universidad Nacional Intercultural de la Amazonia
        </div>
        <div>{"<Fecha de Firma>"}</div>
        <div> Yo soy el firmante</div>
      </div>
    </div>
  )
}