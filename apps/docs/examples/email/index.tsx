import React from 'react'
import Provider from './provider'
import EmailView from './view'

function Email(): React.JSX.Element {
  return (
    <Provider>
      <EmailView />
    </Provider>
  )
}

export default Email
