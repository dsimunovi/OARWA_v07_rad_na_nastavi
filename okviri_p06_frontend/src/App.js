import React, {useState, useEffect} from 'react'
import Poruka from './components/Poruka'
import porukeAkcije from './services/poruke'

const App = (props) => {
  const [ poruke, postaviPoruke] = useState([])
  const [ unosPoruke, postaviUnos] = useState('unesi poruku...')
  const [ ispisSve, postaviIspis] = useState(true)

  const porukeZaIspis = ispisSve
  ? poruke
  : poruke.filter(poruka => poruka.vazno === true)

  const promjenaVaznostiPoruke = (id) => {
    const poruka = poruke.find(p => p.id === id)
    const modPoruka = {
      ...poruka,
      vazno: !poruka.vazno
    }
  
    porukeAkcije.osvjezi(id, modPoruka)
      .then(response => {
        console.log(response)
        postaviPoruke(poruke.map(p => p.id !== id ? p : response.data))
      })
  }

  const brisiPoruku = (id) => {
    porukeAkcije.brisi(id)
      .then(response => {
        console.log(response);
        postaviPoruke(poruke.filter(p => p.id !== id))
      })
  }

  useEffect( () => {
    porukeAkcije.dohvatiSve()
    .then(res => postaviPoruke(res.data))
  }, [])

  const novaPoruka = (e) => {
    e.preventDefault()
    console.log('Klik', e.target)
    const noviObjekt = {
      sadrzaj: unosPoruke,
      vazno: Math.random() > 0.5      
    }
    porukeAkcije.stvori(noviObjekt)
    .then(res => {
      postaviPoruke(poruke.concat(res.data))
      postaviUnos('')
    })
  }

  const promjenaUnosa = (e) => {
    console.log(e.target.value);
    postaviUnos(e.target.value)
  }
  return (
    <div>
      <h1>Poruke</h1>
      <div>
        <button onClick={() => postaviIspis(!ispisSve)}>
          Prikaži { ispisSve ? "važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map(p =>
          <Poruka key={p.id} poruka={p} promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)}
          brisiPoruku={() => brisiPoruku(p.id)} />
        )}        
      </ul>
      <form onSubmit={novaPoruka}>
        <input value={unosPoruke} onChange={promjenaUnosa} />
        <button type='submit'>Spremi</button>
      </form>
    </div>
  )
}

export default App