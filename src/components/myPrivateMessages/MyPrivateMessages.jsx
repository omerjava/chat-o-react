import React, { useState } from 'react'
import './MyPrivateMessages.css'

function MyPrivateMessages(props) {
    const [showPrivateMessages, setShowPrivateMessages] = useState(false);


  return (
    <div className='private-messages' onClick={props.fetchPrivateMessages}>
      <div className="pm-header" onClick={() => setShowPrivateMessages(!showPrivateMessages)}>My Private Messages</div>
      <div className={showPrivateMessages ? "pm-body" : "no-pm-body"}>
        {props.myMessages}
      </div>
      <div>{props.errorHappenedInMyMessages}</div>

    </div>
  )
}

export default MyPrivateMessages