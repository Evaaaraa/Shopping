import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Details = ({setcnt,cnt}) => {
  const navigator = useNavigate()
  const [data,setData] = useState({})
  const [pic,setPic] = useState("")
  const {id} = useParams()
  async function getDetails() {
    const res = await axios.get(`https://dummyjson.com/products/${id}`)
    setData(res.data)
    console.log(res.data)
    setPic(res.data.thumbnail)
  }
  useEffect(()=>{
    getDetails()
  },[])

  const AddToCart = ()=>{
    const key = data.id
    //console.log(key)
    localStorage.setItem(key,JSON.stringify(data))
    setcnt(cnt+=1)
    navigator('/cart')
  }
  //console.log(data.images)
  return (
    <>
      <div className='container'>
        <div className="row m-3">


          <div className="col-lg-6">
            
            <div className="container m-2">

              <div className="row">
                <div className="col-lg-12">
                  <div style={{height :"400px",objectFit :"cover"}}>
                    <img src={pic} style={{width :"100%",height :"100%"}} alt="please wait a sec" />
                  </div>
                </div>
              </div>

              <div className="row my-3 d-flex justify-content-between">
                {
                  data.images?.map((img,index)=>(
                    <div className='col-lg-2 col-md-2 col-sm-2' key={index} style={{overflow: "auto"}}>
                      <img src={img} alt="" style={{width: "100%",height :"100%"}} key={index} onMouseMove={()=>{setPic(img)}}/>
                    </div>
                  ))
                }
              </div>

              <div className="row">
                <button className='btn btn-warning m-2' onClick={AddToCart} >Add to Cart</button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3>{data.title}</h3>
            <div>
              <button className="btn btn-success p-1">{data.rating} &#9733;</button>
              <p className='text-secondary'>Stock : {data.stock}</p>
            </div>
            <div className="d-flex align-contents-center my-3">
              <h1>$ {Math.round(data.price-(data.price*data.discountPercentage/100))}</h1>
              <small className='text-decoration-line-through text-secondary ms-2'>$ {data.price} </small>
            </div>
            <div className="d-flex my-3 align-items-center">
              <p className='text-success'>{data.discountPercentage}% off</p>
            </div>
            <div className="">
              <h4>Details</h4>
              {data.description}
            </div>
          </div>

        </div>
      </div>
    </>
)
}

export default Details
