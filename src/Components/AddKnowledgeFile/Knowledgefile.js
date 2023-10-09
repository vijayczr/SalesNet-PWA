import React from 'react'
import "../AddKnowledgeFile/Knowledgefile.css"

export default function Knowledgefile() {
    const DocSearchReser = () => {
        window.location.reload();
      }  
    
  return (
        <button class="FunctionButton" style={{ backgroundColor: "#05870c" }} onClick={DocSearchReser}>ADD</button>
  )
}
