import React from 'react'
import { useParams } from "react-router-dom";

export default function Catagory() {
    const  {catagoryName} = useParams();
  
  return (
    <div>
      {catagoryName}
    </div>
  )
}
