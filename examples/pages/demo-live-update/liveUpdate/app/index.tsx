import React, { useState, useEffect } from 'react';

import Grid from './grid';
import Configurator from './configurator';
import { useAppActions, useAppState } from '../hooks';
import buildDataSource from './grid/dataSource';

const menuIcon = (
  <svg height="24px" viewBox="0 0 24 24" width="24px">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const statuses = Object.freeze({
  STAND_BY: 'stand-by',
  START: 'start',
  UPDATING: 'updating',
  STOP: 'stop',
});

let isUpdating = false;

const App = () => {
  const [gridRef, setGridRef] = useState(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(statuses.STAND_BY);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    loadDataSource,
    setRecords,
    setColumns,
    setTimer,
    setUpdateRecords,
    setLoad,
  } = useAppActions();
  const {
    cols,
    records,
    columnsCount,
    columnsArray,
    interval,
    data,
    updateRecords,
  } = useAppState();

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 0);
  }, [columnsArray]);

  const onLoadChange = () => {
    setLoad();
  };

  const onLoadDataChange = () => {
    setReload(false);
    if (data.length === 0) {
      loadData();
    } else if (reload) {
      loadData();
    } else {
      clearData();
    }
  };

  const loadData = () => {
    const data = buildDataSource(records, columnsArray);
    onLoadChange();
    loadDataSource(data);
  };

  const clearData = () => {
    onLoadChange();
    loadDataSource([]);
  };

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const updateData = () => {
    if (!isUpdating) {
      return;
    }

    setStatus(statuses.UPDATING);

    const startIndex = 0;
    const endIndex = updateRecords;
    const slicedData = data.slice(startIndex, endIndex);

    const items = slicedData.map((item: any, index: number) => {
      const row = {
        id: index,
      };

      cols.split('').map((letter: string) => {
        const randomNumber = getRandomInt(endIndex);
        let color = '#9ba7b4';
        if (randomNumber > (2 / 3) * endIndex) color = '#8bb58d';
        if (randomNumber < endIndex / 3) color = '#e6a0a0';

        const property = `${letter}`;
        const value = (
          <span>
            {letter.toUpperCase() + ' ' + (index + 1) + ' - '}
            <span style={{ color }}>{randomNumber}</span>
          </span>
        );

        row[property] = value;
      });

      return row;
    });

    requestAnimationFrame(() => {
      gridRef.current.setItemsAt(items, {
        replace: false,
      });

      prepareLiveUpdate();
    });
  };

  const onLiveUpdateChange = () => {
    if (status === statuses.STAND_BY) {
      startLiveUpdate();
    }

    if (status === statuses.UPDATING) {
      stopLiveUpdate();
    }
  };

  const prepareLiveUpdate = () => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        updateData();
      });
    }, interval);
  };

  const startLiveUpdate = () => {
    setStatus(statuses.START);
    isUpdating = true;
    if (data.length < updateRecords) {
      throw 'The number of records to update must be less than the total number of records';
    }

    setLoading(true);

    prepareLiveUpdate();

    setTimeout(() => {
      setLoading(false);
    }, interval);
  };

  const stopLiveUpdate = () => {
    isUpdating = false;

    setStatus(statuses.STOP);
    setLoading(true);

    setTimeout(() => {
      setStatus(statuses.STAND_BY);
      setLoading(false);
    }, 1000);
  };

  const onRecordsChange = (value: number) => {
    setReload(true);
    setRecords(value);
  };

  const onIntervalChange = (value: number) => {
    setTimer(value);
  };

  const onRecordsToUpdateChange = (value: number) => {
    setReload(true);
    setUpdateRecords(value);
  };

  const onColumnsChange = (value: number) => {
    setColumns(value);
  };

  return (
    <div className="app">
      <div className="app-content">
        <Grid setGridRef={setGridRef} />
        {visible ? (
          <Configurator
            gridRef={gridRef}
            setVisible={setVisible}
            statuses={statuses}
            onRecordsChange={onRecordsChange}
            records={records}
            onColumnsChange={onColumnsChange}
            columnsCount={columnsCount}
            onRecordsToUpdateChange={onRecordsToUpdateChange}
            updateRecords={updateRecords}
            onIntervalChange={onIntervalChange}
            interval={interval}
            onLoadDataChange={onLoadDataChange}
            onLiveUpdateChange={onLiveUpdateChange}
            data={data}
            reload={reload}
            loading={loading}
            status={status}
          />
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
