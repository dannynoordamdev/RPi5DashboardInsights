import './App.css'

function App() {

  const fetchApi = () =>{
    // Write this function to fetch our test API of our asp.net core server.
    alert("API!");
  }

  return (
    <>
      <h1>RPi5 Dashboard</h1>
      <p>Work in progress..</p>
      <p>In the meantime, test this button:</p>
      <button onClick={fetchApi}>Trigger API</button>
    </>
  )
}

export default App
