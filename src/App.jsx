import { useState, useEffect } from 'react'
import './App.css'
// import localData from './Data/Data'
// const contentful = require('contentful')
import {createClient} from 'contentful'

function App() {
  const [data, setData] = useState([])

  // make  veriables for space and accessToken and store their values

  

 
//to create the connection with backend
const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: 'master', // defaults to 'master' if not set
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
})



// const getAll = ()=> { 
//   client.getEntries()
//   .then((response) => setData(response.items))
//   .catch(console.error)
//   } 
// now we are using try and catch for above code 25 to 29
// the try catch mathod is useful for pagination 
const getUser = async (type="user", limit=10, skip=0) => {
  try{
    const entry = await client.getEntries({  //client is line 17 is creating connection 
      content_type: type,
      limit,
      skip
    })
    setData(entry?.items)
  } catch (err) {
    console.log(err.message)
  }
}
  
// sure to make the connection once and then return

useEffect(() => { 
  getUser()  //we can also enter the values here of line 32 (user, 10, 0)

  return () => {}
}, [])


// client.getSpace()
// .then((space) => console.log(space))
// .catch(console.error)


  //to fetch the data from external API

  // fetch('https://jsonplaceholder.typicode.com/users').then
  // (res=>res.json())
  // .then(data=>setData(data))
  // .catch(err=>console.log(err))
  

  return (
    <>
    { 
      data.map(e=>(
        <div key={e?.fields.userId}> {e?.fields.userName} </div>
      ))


      // localData.map(e=>(
      //  <div key={e,id}>
      //    {e.name}
      //  </div>
      //))
    }
    </>
  )
}

export default App
