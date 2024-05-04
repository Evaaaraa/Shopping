import React, { useEffect,useState } from 'react'
import './Home.scss'
import axios from 'axios'
import Loading from '../components/Loading.jsx'
import { Link } from 'react-router-dom'

const Home=({search})=>{
  console.log(search);
  const[data,setData]=useState([])
  const[filter,setFilter]=useState([])
  const[categories,setCategories]=useState([])
  async function getProduct(){
    const res=await axios.get('https://dummyjson.com/products/')
    setData([...res.data.products])
    const resCat = await axios.get('https://dummyjson.com/products/categories')
    setCategories([...resCat.data])
  }

  useEffect (()=>{
    getProduct()
  },[])

  if(data.length==0) return (<Loading/>)
  return (
    <>
      <div className='container'>
        <div className="container-fluid d-flex" style={{overflow :"auto"}}>
        <button onClick={()=>{setFilter("")}} className='btn btn-outline-secondary m-3 p-3'>All</button>
          {
            categories.map((dt,index)=>(
              <button key={index} className='btn btn-outline-secondary m-3 p-3' onClick={()=>{setFilter(dt)}}>{dt}</button>
            ))
          }
        </div>
        <div className="row p-3">
          {
            data.filter(i=>i.title.toLowerCase().includes(search.toLowerCase()))
            .filter((dt)=>(dt.category.includes(filter)))
            .map((dt,index)=>(
              <div className="col-lg-3 my-5 p-3 cl" key={index}>
                <Link to={`/details/${dt.id}`} style={{textDecoration :"none"}}>
                  <div className="card shadow-lg border border-0 crd" style={{width :"18rem",height :"23rem"}}>
                    <div className="image" style={{width :"100%",height:"200px"}}>
                      <img src={dt.thumbnail} style={{width: "100%",height: "100%"}} className="card-img-top" alt="..."/>
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{dt.title}</h5>
                      <p className="card-text">Rating : {dt.rating}</p>
                      <p className="card-text">$ {dt.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}


export default Home