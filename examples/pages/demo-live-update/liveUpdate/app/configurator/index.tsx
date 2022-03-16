import React, { useEffect, useState } from 'react';

import { useAppActions, useAppState } from '../../hooks';
import buildDataSource from '../grid/dataSource';

import FieldWithLabel from '../../components/FieldWithLabel';

const closeIcon = (
  <svg height="24px" viewBox="0 0 24 24" width="24px">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

const recordsDataSource = [
  { id: 1000, label: '1000' },
  { id: 5000, label: '5000' },
  { id: 10000, label: '10000' },
];

const recordsToUpdateDataSource = [
  { id: 100, label: '100' },
  { id: 300, label: '300' },
  { id: 500, label: '500' },
  { id: 1000, label: '1000' },
];

const intervalDataSource = [
  { id: 500, label: '500ms' },
  { id: 1000, label: '1000ms' },
  { id: 2000, label: '2000ms' },
  { id: 3000, label: '3000ms' },
  { id: 5000, label: '5000ms' },
];

const statuses = Object.freeze({
  STAND_BY: 'stand-by',
  START: 'start',
  UPDATING: 'updating',
  STOP: 'stop',
});

let isUpdating = false;

const Configurator = (props: any) => {
  const [status, setStatus] = useState(statuses.STAND_BY);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    loadDataSource,
    setRecords,
    setTimer,
    setUpdateRecords,
    setLoad,
  } = useAppActions();
  const { cols, times, records, interval, data, updateRecords } = useAppState();

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 0);
  }, []);

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
    const data = buildDataSource(records, cols, times);
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
      props.gridRef.current.setItemsAt(items, {
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

  let liveUpdateButtonLabel = 'Start live update';
  if (status === statuses.UPDATING) liveUpdateButtonLabel = 'Stop live update';

  const disabledCombo = status !== statuses.STAND_BY;

  return (
    <div className="configurator">
      <div className="configurator-title">Configurator</div>

      <button
        className="configurator-close-button"
        onClick={() => props.setVisible(false)}
      >
        {closeIcon}
      </button>

      <FieldWithLabel
        type="select"
        label="Record count"
        onSelectChange={onRecordsChange}
        selectData={recordsDataSource}
        selectValue={records}
        disabled={disabledCombo}
      ></FieldWithLabel>

      <FieldWithLabel
        type="select"
        label="Records to update"
        onSelectChange={onRecordsToUpdateChange}
        selectData={recordsToUpdateDataSource}
        selectValue={updateRecords}
        disabled={disabledCombo}
      ></FieldWithLabel>

      <FieldWithLabel
        type="select"
        label="Update interval"
        onSelectChange={onIntervalChange}
        selectData={intervalDataSource}
        selectValue={interval}
        disabled={disabledCombo}
      ></FieldWithLabel>

      <FieldWithLabel
        type="button"
        onClick={onLoadDataChange}
        disabled={status === statuses.UPDATING}
      >
        {data.length === 0
          ? 'Load data'
          : reload
          ? 'Reload data'
          : 'Clear data'}
      </FieldWithLabel>

      <FieldWithLabel
        type="button"
        onClick={onLiveUpdateChange}
        disabled={data.length === 0 || reload}
        loading={loading}
      >
        {!loading && liveUpdateButtonLabel}
      </FieldWithLabel>
    </div>
  );
};

export default Configurator;
