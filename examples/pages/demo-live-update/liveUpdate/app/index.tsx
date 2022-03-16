import React, { useState } from 'react';

import Grid from './grid';
import Configurator from './configurator';

const menuIcon = (
  <svg height="24px" viewBox="0 0 24 24" width="24px">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const App = () => {
  const [gridRef, setGridRef] = useState(null);
  const [visible, setVisible] = useState(true);

  return (
    <div className="app">
      <div className="app-content">
        <Grid setGridRef={setGridRef} />
        {visible ? (
          <Configurator gridRef={gridRef} setVisible={setVisible} />
        ) : (
          <button
            className="app-content-menu-button"
            onClick={() => setVisible(true)}
          >
            {menuIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
