import React from 'react';
import SendBird from 'sendbird';
import * as Constants from './src/utils/Constants';
import Navigator from './src/common/Navigator';
import { GeneralProvider } from './src/common/GeneralContext'

/* Send Bird Definition */
const sendbird = new SendBird({appId: Constants.APP_ID});

const generalContext = {
  sendbird
}

export default function App() {

  return (
    <GeneralProvider value={generalContext}>
          <Navigator/>
    </GeneralProvider>
  );
}