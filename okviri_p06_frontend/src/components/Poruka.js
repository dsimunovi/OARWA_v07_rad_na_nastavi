import React from 'react'
import './Poruka.css'

const Poruka = ({poruka, promjenaVaznosti, brisiPoruku}) => {
  const oznaka = poruka.vazno
  ? 'označi kao nevažno' : 'označi kao važno'
  
  return (
    <li>
      <span className={poruka.vazno ? 'vazno' : 'nevazno'}>{poruka.sadrzaj}</span>
      <button onClick={promjenaVaznosti}>{oznaka}</button>
      <button onClick={brisiPoruku}><span role="img" aria-label="delete">❌</span></button>
    </li>
  )
}

export default Poruka