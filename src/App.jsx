import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'

function App() {

  const [token, setToken] = useState("")
  const [purchaseState, setPurchaseState] = useState(null)

  useEffect(()=>{
    // localStorage.clear()
    const savedToken = localStorage.getItem("token")
    console.log(savedToken)
    if(savedToken){
      console.log("saved token found")
      setToken(savedToken)
    }
    // if there is a saved token,
    // set the token state
    
  },[])

  async function makePurchase(){
    if(token.length>0){
      const response = await fetch("http://localhost:8080/api/customers/buySomething",
      {
        method:"POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const result = await response.json()
      console.log(result)
      setPurchaseState(result.message)
    }

  }
  function logout(){
    // 
    localStorage.removeItem("token")
    setToken("")
  }


  return (
    <>
      <button onClick={logout}>Log Out</button>
      {token? <p>you are logged in!</p>: <p>please log in</p>}
      <Login setToken={setToken}/>
      {purchaseState? <p>purchase state = {purchaseState}</p>: null}
      <button onClick = {makePurchase}>purchase</button>
    </>
  )
}

export default App
