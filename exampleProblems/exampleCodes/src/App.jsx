// Non destructured props

// const Hello = (props) => {

//   const bornYear = () => {
//     const yearNow = new Date().getFullYear()
//     return yearNow - props.age
//   }

//   return (
//     <div>
//       <p>
//         Hello {props.name}, you are {props.age} years old
//       </p>

//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// Destructuring props

// const Hello = (props) => {

//   const name = props.name
//   const age = props.age


//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>

//       <p>Hello {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }


// const Hello = (props) => {

//   const { name, age } = props
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }


// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// export default App

// const App = (props) => {
//   const {counter} = props
//   return (
//     <div>{counter}</div>
//   )
// }

// export default App


// useState Hook 

// import { useState } from 'react'

// const Display = ({counter}) =>  <div>{counter}</div> 

// const Button = ({onClick, text}) =>  <button onClick = {onClick}> {text} </button> 

// const App = () => {

//   const [ counter, setCounter ] = useState(0)
//   console.log('rendering, with counter value', counter);

//   const increaseByOne = () => {
//     console.log('increasing, value before',counter);
//     setCounter(counter + 1)
//   };
//   const resetToZero = () => {
//     console.log('zero, value before',counter);
//     setCounter(0);
//   }
//   const minus = () => {
//     console.log('decreasing, value before',counter);
//     setCounter(counter - 1);
//   }

//   return (
//     <div>
//     <Display counter={counter}/>
//     <Button onClick = {increaseByOne} text='Plus'></Button>
//     <Button onClick = {resetToZero} text='Zero'></Button>
//     <Button onClick = {minus} text='Minus'></Button>
//     </div>
    
//   )
// }

// export default App

// { Using object as a state }

// import {useState} from 'react'

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })

//   const handleLeftClick = () => {
//   setClicks({ 
//     ...clicks, 
//     left: clicks.left + 1 
//   })
// }

// const handleRightClick = () => {
//   setClicks({ 
//     ...clicks, 
//     right: clicks.right + 1 
//   })
// }

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }

// export default App

import {useState} from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0);


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    let updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    let updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      {left}
      <Button onClick = {handleLeftClick} text = 'left'></Button>
      <Button onClick = {handleRightClick} text = 'right'></Button>
      {right}
      <History allClicks={allClicks} />
      <p>Total: {total}</p>
    </div>
  )
}

export default App