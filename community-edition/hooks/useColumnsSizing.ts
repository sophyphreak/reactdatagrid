/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MutableRefObject } from 'react';
import {
  TypeComputedColumn,
  TypeComputedProps,
  TypeDataGridProps,
} from '../types';
import getScrollbarWidth from '../packages/getScrollbarWidth';

const removeItemFromArray = <T>(array: T[], obj: T) => {
  const index: number = array.indexOf(obj);

  if (index >= 0) {
    array.splice(index, 1);
  }
};

const getColumnsWidths = (columns: TypeComputedColumn[]) => {
  return columns.reduce((width: number, column: any) => {
    return width + column.computedWidth;
  }, 0);
};

const useColumnsSizing = (
  _props: TypeDataGridProps,
  _computedProps: TypeComputedProps,
  computedPropsRef: MutableRefObject<TypeComputedProps>
) => {
  const computeColumnSizesToFit = (gridWidth: number) => {
    const { current: computedProps } = computedPropsRef;
    if (!computedProps) {
      return;
    }

    const visibleColumns: TypeComputedColumn[] = computedProps.visibleColumns;

    if (gridWidth <= 0 || !visibleColumns.length) {
      return;
    }

    const columnsToSize: TypeComputedColumn[] = [];
    const columnsNotToSize: TypeComputedColumn[] = [];

    visibleColumns.forEach((column: TypeComputedColumn) => {
      if (column.resizable === false) {
        columnsNotToSize.push(column);
      } else {
        columnsToSize.push(column);
      }
    });

    const columnsToResize = columnsToSize.slice(0);
    let finished: boolean = false;

    const updateColumnsNotToSize = (column: TypeComputedColumn): void => {
      removeItemFromArray(columnsToResize, column);
      columnsNotToSize.push(column);
    };

    const newColumnSizes: { [key: string]: number } = {};

    while (!finished) {
      finished = true;
      const availableSpace: number =
        gridWidth - getColumnsWidths(columnsNotToSize);

      const scale: number = availableSpace / getColumnsWidths(columnsToResize);
      let spaceForLastColumn: number = availableSpace;

      for (let i = columnsToResize.length - 1; i >= 0; i--) {
        const column: TypeComputedColumn = columnsToResize[i];

        const minWidth: number | undefined = column.computedMinWidth;
        const maxWidth: number | undefined = column.computedMaxWidth;
        let newWidth: number = Math.round(column.computedWidth * scale);

        if (minWidth && newWidth < minWidth) {
          newWidth = minWidth;
          updateColumnsNotToSize(column);
          finished = false;
        } else if (maxWidth && newWidth > maxWidth) {
          newWidth = maxWidth;
          updateColumnsNotToSize(column);
          finished = false;
        } else if (i === 0) {
          newWidth = spaceForLastColumn;
        }

        const columnId: string = column.id;
        Object.assign(newColumnSizes, { [columnId]: newWidth });
        spaceForLastColumn -= newWidth;
      }
    }

    if (computedProps.virtualizeColumns) {
      const bodyRef = computedProps.bodyRef.current;
      const columnLayout = bodyRef.columnLayout;
      const headerLayout = columnLayout.headerLayout;
      const header = headerLayout.header;

      setTimeout(() => {
        header.updateColumns();
      }, 10);
    }

    let newReservedViewportWidth: number = computedProps.reservedViewportWidth;
    const columnFlexes = computedProps.columnFlexes;

    (computedProps as any).computeColumnSizes(
      newColumnSizes || {},
      columnFlexes || {},
      newReservedViewportWidth,
      {
        getColumnBy: computedProps.getColumnBy,
        onColumnResize: computedProps.initialProps.onColumnResize,
        onBatchColumnResize: computedProps.initialProps.onBatchColumnResize,
        columnSizes: computedProps.columnSizes,
        setColumnSizes: computedProps.setColumnSizes,
        setColumnFlexes: computedProps.setColumnFlexes,
      }
    );
  };

  const checkForAvaibleWidth = () => {
    const { current: computedProps } = computedPropsRef;
    if (!computedProps) {
      return;
    }

    const scrollbars = computedProps.scrollbars;
    const hasVerticalScrollbar = scrollbars.vertical;
    const scrollbarWidth = hasVerticalScrollbar ? getScrollbarWidth() : 0;
    const computedAvailableWidth = computedProps.availableWidth || 0;

    const availableWidth = computedAvailableWidth - scrollbarWidth;

    if (availableWidth > 0) {
      computeColumnSizesToFit(availableWidth);
    }
  };

  const setColumnSizesToFit = () => {
    const { current: computedProps } = computedPropsRef;
    if (!computedProps) {
      return;
    }

    checkForAvaibleWidth();
  };

  return {
    setColumnSizesToFit,
  };
};

export default useColumnsSizing;
