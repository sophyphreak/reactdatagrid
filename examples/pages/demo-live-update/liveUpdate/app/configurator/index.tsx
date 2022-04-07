import React from 'react';

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

const columnsDataSource = [
  { id: 10, label: '10' },
  { id: 20, label: '20' },
  { id: 30, label: '30' },
  { id: 50, label: '50' },
  { id: 100, label: '100' },
  { id: 150, label: '150' },
  { id: 200, label: '200' },
  { id: 300, label: '300' },
  { id: 500, label: '500' },
];

const Configurator = (props: any) => {
  let liveUpdateButtonLabel = 'Start live update';
  if (props.status === props.statuses.UPDATING)
    liveUpdateButtonLabel = 'Stop live update';

  const disabledCombo = props.status !== props.statuses.STAND_BY;

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
        onSelectChange={props.onRecordsChange}
        selectData={recordsDataSource}
        selectValue={props.records}
        disabled={disabledCombo}
      ></FieldWithLabel>

      <FieldWithLabel
        type="select"
        label="Columns count"
        onSelectChange={props.onColumnsChange}
        selectData={columnsDataSource}
        selectValue={props.columnsCount}
        disabled={disabledCombo}
      ></FieldWithLabel>

      <FieldWithLabel
        type="select"
        label="Records to update"
        onSelectChange={props.onRecordsToUpdateChange}
        selectData={recordsToUpdateDataSource}
        selectValue={props.updateRecords}
        disabled={disabledCombo}
      ></FieldWithLabel>

      <FieldWithLabel
        type="select"
        label="Update interval"
        onSelectChange={props.onIntervalChange}
        selectData={intervalDataSource}
        selectValue={props.interval}
        disabled={disabledCombo}
      ></FieldWithLabel>

      <FieldWithLabel
        type="button"
        onClick={props.onLoadDataChange}
        disabled={props.status === props.statuses.UPDATING}
      >
        {props.data.length === 0
          ? 'Load data'
          : props.reload
          ? 'Reload data'
          : 'Clear data'}
      </FieldWithLabel>

      <FieldWithLabel
        type="button"
        onClick={props.onLiveUpdateChange}
        disabled={props.data.length === 0 || props.reload}
        loading={props.loading}
      >
        {!props.loading && liveUpdateButtonLabel}
      </FieldWithLabel>
    </div>
  );
};

export default Configurator;
