import React, { useState } from 'react';

import Grid from './grid';
import Configurator from './configurator';

const App = () => {
  const [gridRef, setGridRef] = useState(null);

  return (
    <div className="app">
      <div className="app-content">
        <Grid setGridRef={setGridRef} />
        <Configurator gridRef={gridRef} />
      </div>
    </div>
  );
};

export default App;
