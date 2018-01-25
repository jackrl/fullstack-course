import React from 'react'

const Otsikko = ({ kurssi }) => <h1>{kurssi.nimi}</h1>

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

const Sisalto = ({ kurssi }) => <div>{kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}</div>

const Yhteensa = ({ kurssi }) => <p>yhteensä {kurssi.osat.reduce((acc, osa) => acc += osa.tehtavia, 0)} tehtävää</p>

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

export default Kurssi