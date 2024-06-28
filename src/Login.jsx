import { useState } from "react"

export default function Login({setToken}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    async function handleLogin(event){
        event.preventDefault()
        // fecth request
        // send login info
        // to our api's login route

        try{
            const response = await fetch("http://localhost:8080/api/customers/login",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username,password})
            })

            const result = await response.json()
            console.log(result)
            localStorage.setItem("token",result.token)
            setToken(result.token)


        }catch(err){
            console.error("failed to log in")
        }

    }
    return(
        <>
            <p>login</p>

            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input value={username} onChange={(event)=>setUsername(event.target.value)}></input>
                <br/>
                <label>Password:</label>
                <input value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                <button type="submit">LOGIN</button>
            </form>
        
        </>


    )
}