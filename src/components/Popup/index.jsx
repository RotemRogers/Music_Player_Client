import React from 'react'

function Popup(props) {
    if (!props.show){
        return null
    }
  return (
    <div className="popup">
        <div className="popup-inner">
            <button className="close-button" onClick={props.onClose}>
                close
            </button>
            {props.children}
        </div>
    </div>
  )
}

export default Popup