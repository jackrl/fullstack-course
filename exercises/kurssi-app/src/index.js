import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.nimi}</h1>
  )
}

const Osa = (props) => {
  return (
    <p>{props.osa} {props.maara}</p>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osat[0]} maara={props.maarat[0]} />
      <Osa osa={props.osat[1]} maara={props.maarat[1]} />
      <Osa osa={props.osat[2]} maara={props.maarat[2]} />
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <p>yhteensä {props.yhteismaara} tehtävää</p>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko nimi={kurssi} />
      <Sisalto osat={[osa1, osa2, osa3]} maarat={[tehtavia1, tehtavia2, tehtavia3]} />
      <Yhteensa yhteismaara={tehtavia1 + tehtavia2 + tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)