import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Cart = ({setcnt,cnt}) => {
    const [cart,setCart]=useState([])
    let [count,setCount]=useState(0)
    const navigator = useNavigate()
    useEffect(()=>{
        const data=[];
        const keys=Object.keys(localStorage);
        for(let i=0;i<keys.length;i++)
        {
            data.push(JSON.parse(localStorage.getItem(keys[i])))
        }
        setCart(data)
    },[count])

    const removeProduct=(key)=>{
        localStorage.removeItem(key)
        setCount(count+=1)
        setcnt(cnt-=1)
    }

    const buy=()=>{
        setcnt(0)
        localStorage.clear()
        navigator('/')
    }
    return (
    <>
        <div className='container'>
            <div className="row">
                {
                    cart.map((ct,index)=>(
                        <>
                            <div className="col-lg-12 d-flex border justify-content-between align-items-center my-3" key={index}>
                                <div className="start1">
                                    <div className="col-lg-4 d-flex">
                                        <img src={ct.thumbnail} style={{height :"200px"}}/>
                                        <h2>{ct.title}</h2>
                                        <h3>$ {ct.price}</h3>
                                    </div>
                                </div>
                                <button className='btn btn-danger' onClick={()=>{removeProduct(ct.id)}}>Remove</button>
                            </div>
                            {
                                cart.length!=0?<button className='btn btn-success' onClick={buy} style={{width :"100px"}}>BUY</button>:<Link to={'/'}>Home</Link>
                            }
                        </>
                    ))
                }
            </div>
            
        </div>
    </>            
  )
}

export default Cart
