import React from 'react'
import './VolumenParalelepipeda.css'
import Vector from '../../MathLibraries/vector.js'
import { useState} from 'react'



function VolumenParalelepipeda() {
    const [PrviPrvi, PromjeniPrvi] = useState(0)
    
    return (
        <>
            <VektoriUnos PromjeniPrvi={PromjeniPrvi}></VektoriUnos>
            
        </>
        
    )
}

function VektoriUnos(props) {

    return (
        <>
            <div className='Vektori-za-unos'>
                <div><h1 className='znak'>(</h1></div>
                <div><input type="number" name="PrviPrvi" id="PrviPrvi" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="PrviDrugi" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="PrviTreci" id="" /></div>
                <div><h1 className='znak'>)</h1></div>
            </div>
            <div className='Vektori-za-unos'>
                <div className='znak'><h1>(</h1></div>
                <div><input type="number" name="DrugiPrvi" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="DrugiDrugi" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="DrugiTreci" id="" /></div>
                <div><h1 className='znak'>)</h1></div>
            </div>
            <div className='Vektori-za-unos'>
                <div><h1 className='znak'>(</h1></div>
                <div><input type="number" name="TreciPrvi" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="TreciDrugi" id="" /></div>
                <div><h1 className='znak'>,</h1></div>
                <div><input type="number" name="TreciTreci" id="" /></div>
                <div><h1 className='znak'>)</h1></div>
            </div>
            <button onClick={()=>{
                props.PromjeniPrvi(PrviPrvi);
                alert(PrviPrvi.value)
            }}>Unesi</button>
        </>
    )
}

export default VolumenParalelepipeda