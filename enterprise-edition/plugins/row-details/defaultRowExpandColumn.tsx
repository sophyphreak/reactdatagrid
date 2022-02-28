/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { id as ROW_EXPAND_COL_ID } from '@inovua/reactdatagrid-community/normalizeColumns/defaultRowExpandColumnId';

type TypeRender = {
  isRowExpandable: (rowInfo?: {
    id: string | number;
    data: object;
    rowIndex: number;
  }) => boolean;
  rowExpanded: number;
  toggleRowExpand: () => void;
  renderRowDetailsExpandIcon?: () => void;
  renderRowDetailsCollapsedIcon?: () => void;
};

const ICON_EXPANDED = (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M19 13H5v-2h14v2z" />
  </svg>
);

const ICON_COLLAPSED = (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const ICON_MORE = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={{ position: 'relative', top: 3 }}
  >
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

const renderExpandIcon = ({ renderRowDetailsExpandIcon }: any) => {
  if (renderRowDetailsExpandIcon) {
    return renderRowDetailsExpandIcon();
  }
  return ICON_EXPANDED;
};

const renderCollapsedIcon = ({
  renderRowDetailsCollapsedIcon,
}: {
  renderRowDetailsCollapsedIcon?: () => void;
}) => {
  if (renderRowDetailsCollapsedIcon) {
    return renderRowDetailsCollapsedIcon();
  }
  return ICON_COLLAPSED;
};

const rowDetailsRowIcons = ({
  isRowExpandable,
  rowExpanded,
  toggleRowExpand,
  renderRowDetailsExpandIcon,
  renderRowDetailsCollapsedIcon,
}: TypeRender) => {
  if (!isRowExpandable || !isRowExpandable()) {
    return;
  }

  const style = {
    cursor: 'pointer',
    position: 'relative',
    top: 1,
  };

  return React.cloneElement(
    rowExpanded
      ? renderExpandIcon({ renderRowDetailsExpandIcon })
      : renderCollapsedIcon({ renderRowDetailsCollapsedIcon }),
    {
      style,
      key: 'toggle_icon',
      onClick: (event: MouseEvent) => {
        event.stopPropagation();
        toggleRowExpand();
      },
    }
  );
};

const rowDetailsHeaderIcons = ({
  renderRowDetailsMoreIcon,
}: {
  renderRowDetailsMoreIcon?: () => void;
}) => {
  if (renderRowDetailsMoreIcon) {
    return renderRowDetailsMoreIcon();
  }
  return ICON_MORE;
};

export default {
  id: ROW_EXPAND_COL_ID,
  rowExpandColumn: true,
  cellSelectable: false,
  headerAlign: 'center',
  textAlign: 'center',
  render: ({
    isRowExpandable,
    rowExpanded,
    toggleRowExpand,
    renderRowDetailsExpandIcon,
    renderRowDetailsCollapsedIcon,
  }: TypeRender) => {
    return rowDetailsRowIcons({
      isRowExpandable,
      rowExpanded,
      toggleRowExpand,
      renderRowDetailsExpandIcon,
      renderRowDetailsCollapsedIcon,
    });
  },
  header: ({
    renderRowDetailsMoreIcon,
  }: {
    renderRowDetailsMoreIcon?: () => void;
  }) => rowDetailsHeaderIcons({ renderRowDetailsMoreIcon }),
  showInContextMenu: false,
  showColumnMenuSortOptions: false,
  showColumnMenuGroupOptions: false,
  showColumnMenuTool: false,
  sortable: false,
  editable: false,
  groupBy: false,
  defaultWidth: 50,
  minWidth: 40,
  isRowDetailsCell: true,
};

export { ROW_EXPAND_COL_ID as rowExpandColumnId };
