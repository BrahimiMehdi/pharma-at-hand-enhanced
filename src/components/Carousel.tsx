import React from 'react'

type Props = {
    cards:any[];
    size: 2 | 3 | 4;
}

function Carousel({cards,size}: Props) {
    const totalPages = Math.ceil(cards.length/size);
    const width = `calc(100vw*${totalPages})`
    
    
  return (
    <div style={{width:width}} className='flex h-full'>
        {cards.map((card,index)=>(
            <div key={index} className='h-72 w-full bg-black bg-opacity-80 rounded-md'>

            </div>
        ))}
    </div>
  )
}

export default Carousel