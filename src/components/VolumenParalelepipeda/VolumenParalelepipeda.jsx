import React from 'react'
import './VolumenParalelepipeda.css'

function VolumenParalelepipeda() {
  return (
    <>
        <VektoriUnos></VektoriUnos>
        <button>Unesi</button>
    </>
    
  )
}

function VektoriUnos() {
    return (
        <>
            <div className='Vektori-za-unos'>
                <div><h1 className='znak'>(</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>)</h1></div>
            </div>
            <div className='Vektori-za-unos'>
                <div className='znak'><h1>(</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>)</h1></div>
            </div>
            <div className='Vektori-za-unos'>
                <div><h1 className='znak'>(</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="" id="" /></div>
                <div><h1 className='znak'>)</h1></div>
            </div>
        </>
    )
}

export default VolumenParalelepipeda