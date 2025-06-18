const Hello = (props) => {
  return (
    <div>
      <p>Hi, my name is {props.name} and my age is {props.age}</p>
    </div>
  )
}


const App = () => {
  const name = 'kiran';
  const age = 24;
  return (
    <div>
      <p>Greetings</p>
      <Hello name = {name} age = {age}/>
      <Hello name = 'charan' age = {25} />
    </div>
  )
}

export default App

/*
const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </div>
  )
}

export default App
*/