/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MutableRefObject, useState } from 'react';
import { CellProps } from '../Layout/ColumnLayout/Cell/CellProps';
import { TypeComputedProps, TypeDataGridProps } from '../types';

const useColumnHover = (
  _props: TypeDataGridProps,
  _computedProps: TypeComputedProps,
  computedPropsRef: MutableRefObject<TypeComputedProps>
) => {
  const [columnIndexHovered, setColumnIndexHovered] = useState<number>(-1);

  const onColumnMouseEnter = (cellProps: CellProps) => {
    const { current: computedProps } = computedPropsRef;
    if (!computedProps) {
      return;
    }

    if (computedProps.enableColumnHover) {
      const columnIndex = cellProps.columnIndex;
      if (columnIndex != null) {
        setColumnIndexHovered(columnIndex);
      }
    }
  };

  const onColumnMouseLeave = () => {
    const { current: computedProps } = computedPropsRef;
    if (!computedProps) {
      return;
    }

    if (computedProps.enableColumnHover) {
      setColumnIndexHovered(-1);
    }
  };

  return {
    columnIndexHovered,
    onColumnMouseEnter,
    onColumnMouseLeave,
  };
};

export default useColumnHover;
