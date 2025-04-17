import React from 'react'

const HappenBox = () => {
    return (
        <div className="box_happen">
            <textarea type='text' placeholder='what happen?'/>
            <div className='line_btn'>
                <button>PHOTO</button>
                <button>VIDEO</button>
                <button>LOCATION</button>
                <button>SHEDULE</button>
            </div>
            <div style={{textAlign:"right"}}>
                <button className='btn_share'>SHARE</button>
            </div>
        </div>
    )
}

export default HappenBox