/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createRef, MouseEvent, ReactNode, RefObject } from 'react';

import Region from '@inovua/reactdatagrid-community/packages/region';

import InovuaDataGridColumnLayout from '@inovua/reactdatagrid-community/Layout/ColumnLayout';

import DragRow from './plugins/row-reorder/DragRow';
import DragRowArrow from './plugins/row-reorder/DragRowArrow';
import ScrollingRegion from './plugins/row-reorder/ScrollingRegion';

import {
  TypeConstrainRegion,
  TypeConfig,
  RangeResultType,
  TypeComputedProps,
} from '@inovua/reactdatagrid-community/types';

import getRangesForRows from './plugins/row-reorder/utils/getRangesForRows';
import setupRowDrag from './plugins/row-reorder/utils/setupRowDrag';
import getDropRowIndex from './plugins/row-reorder/utils/getDropRowIndex';
import moveYAfterX from './plugins/row-reorder/utils/moveYAfterX';
import dropIndexValidation from './plugins/row-reorder/utils/dropIndexValidation';
import LockedRows from './plugins/locked-rows/LockedRows';
import getRangesForGroups from './plugins/row-reorder/utils/getRangesForGroups';
import dropGroupIndexValidation from './plugins/row-reorder/utils/dropGroupIndexValidation';
import getDropGroup from './plugins/row-reorder/utils/getDropGroup';

let DRAG_INFO: any = null;
let scrolling: boolean = false;
const SCROLL_MARGIN: number = 40;
const DRAG_ROW_MAX_HEIGHT = 100;
const raf = global.requestAnimationFrame;

export default class InovuaDataGridEnterpriseColumnLayout extends InovuaDataGridColumnLayout {
  private dropIndex: number | undefined;
  private dragBoxInitialHeight: number = 0;
  private dropRowHeight: number = 0;
  private validDropPositions: { [key: number]: boolean }[] = [];
  private scrollTopRegionRef: RefObject<any>;
  private scrollBottomRegionRef: RefObject<any>;
  private dragRowArrow: any;
  private refDragRow: any;
  private refDragRowArrow: any;
  private dragRow: any;
  private content: any;
  declare lastComputedProps?: TypeComputedProps;
  gridScrollInterval: any;

  constructor(props: any) {
    super(props);

    this.refDragRow = (row: any) => {
      this.dragRow = row;
    };

    this.refDragRowArrow = (dragRow: any) => {
      this.dragRowArrow = dragRow;
    };

    this.scrollTopRegionRef = createRef();
    this.scrollBottomRegionRef = createRef();
  }

  renderLockedEndRows = (computedProps: TypeComputedProps): any => {
    return this.renderLockedRows(
      computedProps.computedLockedEndRows,
      'end',
      computedProps
    );
  };
  renderLockedStartRows = (computedProps: TypeComputedProps): any => {
    return this.renderLockedRows(
      computedProps.computedLockedStartRows,
      'start',
      computedProps
    );
  };

  renderLockedRows = (
    rows: any[],
    position: 'start' | 'end',
    computedProps: TypeComputedProps
  ): any => {
    if (!rows || !rows.length) {
      return null;
    }

    return (
      <LockedRows
        key={position}
        rows={rows}
        computedProps={computedProps}
        position={position}
      />
    );
  };

  renderDragRowArrow = () => {
    const props: TypeComputedProps = this.lastComputedProps!;
    const { rowReorderArrowStyle } = props;

    return (
      <DragRowArrow
        ref={this.refDragRowArrow}
        rowHeight={this.dropRowHeight}
        rowReorderArrowStyle={rowReorderArrowStyle}
      />
    );
  };

  renderReorderRowProxy = (props?: TypeComputedProps): ReactNode => {
    return (
      <DragRow
        ref={this.refDragRow}
        renderRowReorderProxy={props && props.renderRowReorderProxy}
      />
    );
  };

  renderScrollingTopRegion = (): ReactNode => {
    return (
      <ScrollingRegion
        ref={this.scrollTopRegionRef}
        dir={-1}
        onMouseEnter={(event: any) =>
          this.onScrollingRegionMouseEnter(event, -1)
        }
        onMouseLeave={this.onScrollingRegionMouseLeave}
      />
    );
  };

  renderScrollingBottomRegion = (): ReactNode => {
    return (
      <ScrollingRegion
        ref={this.scrollBottomRegionRef}
        dir={1}
        onMouseEnter={(event: any) =>
          this.onScrollingRegionMouseEnter(event, 1)
        }
        onMouseLeave={this.onScrollingRegionMouseLeave}
      />
    );
  };

  onScrollingRegionMouseEnter = (event: any, dir?: -1 | 1) => {
    event.preventDefault();
    if (DRAG_INFO && DRAG_INFO.dragging) {
      scrolling = true;

      const props: TypeComputedProps = this.lastComputedProps!;
      const { rowReorderScrollByAmount, rowReorderAutoScrollSpeed } = props;

      if (scrolling && dir) {
        global.clearInterval(this.gridScrollInterval);
        this.gridScrollInterval = global.setInterval(
          () => this.startScrolling(rowReorderScrollByAmount, dir),
          rowReorderAutoScrollSpeed
        );
      }
    }
  };

  startScrolling = (rowReorderScrollByAmount: number, dir: -1 | 1): any => {
    const initialScrollTop = this.getScrollTop();
    const newScrollTop = initialScrollTop + dir * rowReorderScrollByAmount;

    raf(() => {
      this.setScrollPosition(newScrollTop);
    });
  };

  setScrollPosition = (scrollTop: number) => {
    const scrollTopMax = this.getScrollTopMax();
    this.setReorderArrowVisible(false);

    if (scrollTop < 0) {
      scrollTop = 0;
    }

    if (scrollTop > scrollTopMax) {
      scrollTop = scrollTopMax;
    }

    this.setScrollTop(scrollTop);
  };

  onScrollingRegionMouseLeave = () => {
    scrolling = false;
    this.setReorderArrowVisible(true);
    global.clearInterval(this.gridScrollInterval);
  };

  getDragRowInstance = (dragIndex: number) => {
    const visibleRows = this.getContentRows();

    const dragRow = visibleRows.filter((row: any) => {
      if (!row) {
        return;
      }
      return row.props.rowIndex === dragIndex;
    })[0];

    return dragRow;
  };

  onDragRowMouseDownHandle = (
    ev: MouseEvent | any,
    index: number,
    cellNode: any
  ) => {
    const dragIndex: number = index;
    const props: TypeComputedProps = this.lastComputedProps!;
    if (!this.onRowReorderValidation(ev, props, dragIndex)) {
      return;
    }

    const { computedFocused, computedSetFocused, setActiveIndex } = props;

    const { contentRegion, headerHeight, cellRegion } = this.initDrag({
      cellNode,
    });

    this.dragRowArrow.setOffset(headerHeight);

    if (!computedFocused) {
      computedSetFocused(true);
    }
    setActiveIndex(index);

    this.setupDrag(
      ev,
      { dragIndex, contentRegion, headerHeight, cellRegion },
      props
    );
  };

  setupDrag = (
    event: MouseEvent,
    {
      dragIndex,
      contentRegion,
      headerHeight,
      cellRegion,
    }: {
      dragIndex: number;
      contentRegion: TypeConstrainRegion;
      headerHeight: number;
      cellRegion: TypeConstrainRegion;
    },
    props: any
  ) => {
    const {
      dragBoxInitialRegion,
      dragRowHeight,
    } = this.getDragBoxInitialRegion({
      dragIndex,
    });

    const {
      dragProxy,
      dragProxyPosition,
      dragBoxOffsets,
      leftBoxOffset,
    } = this.getDragProxy(props, {
      dragIndex,
      contentRegion,
      cellRegion,
      dragBoxInitialRegion,
    });

    this.setScrollRegionVisibility();

    dragProxy.setHeight(dragRowHeight);
    dragProxy.setTop(dragProxyPosition.top);
    dragProxy.setLeft(dragProxyPosition.left);

    const initialScrollTop = this.getScrollTop();
    const { ranges, selectedGroup } = this.getRanges(props, {
      initialScrollTop,
      contentRegion,
      dragBoxInitialRegion,
    });

    DRAG_INFO = {
      dragging: true,
      dragIndex,
      ranges,
      selectedGroup,
      contentRegion,
      headerHeight,
      dragBoxInitialRegion,
      dragBoxRegion: dragBoxInitialRegion.clone(),
      dragProxy,
      dragBoxOffsets,
      initialScrollTop,
      leftBoxOffset,
      scrollTopMax: this.getScrollTopMax(),
    };

    this.setReorderArrowAt(dragIndex, ranges);

    setupRowDrag(event, dragBoxInitialRegion, {
      onDrag: (event: MouseEvent, config: TypeConfig) =>
        this.onRowDrag(event, config, props),
      onDrop: (event: MouseEvent, config: TypeConfig) =>
        this.onRowDrop(event, config, props),
    });
  };

  onRowDrag = (_event: MouseEvent, config: TypeConfig, props: any) => {
    if (!DRAG_INFO) {
      return;
    }

    const {
      dragIndex,
      dragBoxInitialRegion,
      dragProxy,
      dragBoxOffsets,
    }: any = DRAG_INFO;

    const {
      initialDiffTop,
      initialDiffLeft,
      dragProxyAjust,
      scrollDiff,
      scrollTop,
      diffTop,
      diffLeft,
    } = this.adjustScrollOnDrag(props, config);

    const { dragProxyTop, dragProxyLeft } = this.ajustDragProxy({
      diffTop,
      diffLeft,
      initialDiffTop,
      initialDiffLeft,
      dragProxyAjust,
    });

    dragProxy.setTop(dragProxyTop);
    dragProxy.setLeft(dragProxyLeft);
    dragProxy.setVisible(true);

    let dropIndex: number = -1;
    let dir = initialDiffTop > 0 ? 1 : -1;

    const { rowHeightManager, computedGroupBy } = props;
    const { index: newDropIndex } = getDropRowIndex({
      rowHeightManager,
      dragBoxInitialRegion,
      dragBoxOffsets,
      initialDiffTop,
      scrollTop,
      dragIndex,
      dir,
    });

    if (newDropIndex !== -1) {
      dropIndex = newDropIndex;
    }

    if (this.dropIndex !== dropIndex) {
      this.getValidDropPositions(props, dragIndex, dropIndex);
      this.dragRowArrow.setValid(this.validDropPositions[dropIndex]);
    }
    this.dropIndex = dropIndex;

    if (computedGroupBy && computedGroupBy.length > 0) {
      this.getDropGroup();
    }

    const rowHeight = rowHeightManager.getRowHeight(this.dropIndex);
    this.dragRowArrow.setHeight(rowHeight);

    if (dragIndex !== this.dropIndex) {
      const compareRanges = this.compareRanges({ scrollDiff });
      this.setReorderArrowAt(this.dropIndex, compareRanges);
    } else {
      this.setReorderArrowVisible(false);
    }
  };

  onRowDrop = (_event: MouseEvent, _config: TypeConfig, props: any) => {
    const { dropIndex } = this;
    const { onRowReorder, setActiveIndex, computedGroupBy } = props;

    if (dropIndex === undefined) {
      this.cancelDrop();
      this.clearDropInfo();
      return;
    }

    let { dragIndex } = DRAG_INFO;

    if (dropIndex === dragIndex) {
      this.clearDropInfo();
      return;
    }

    if (!this.validDropPositions[dropIndex]) {
      this.clearDropInfo();
      return;
    }

    if (computedGroupBy && computedGroupBy.length > 0) {
      this.updateGroups(props, dragIndex, dropIndex);
      return;
    }

    this.clearDropInfo();
    setActiveIndex(dropIndex);

    if (onRowReorder && typeof onRowReorder === 'function') {
      this.onRowReorder(props, { dragIndex, dropIndex });
      return;
    }

    this.updateDataSource(props, { dropIndex, dragIndex });
  };

  updateDataSource = (
    props: any,
    { dropIndex, dragIndex }: { dropIndex: number; dragIndex: number }
  ) => {
    const { data, setOriginalData } = props;
    if (this.validDropPositions[dropIndex]) {
      const newDataSource = moveYAfterX(data, dragIndex, dropIndex);

      setOriginalData(newDataSource);
    }
  };

  updateGroups = (props: any, dragIndex: number, dropIndex: number) => {
    const { data, silentSetData, setItemOnReorderingGroups } = props;
    const { dropGroup, selectedGroup } = DRAG_INFO;

    if (!selectedGroup.localeCompare(dropGroup)) {
      const newDataSource = moveYAfterX(data, dragIndex, dropIndex);
      silentSetData(newDataSource);
      this.clearDropInfo();
      return;
    }

    if (dropGroup) {
      const item = this.computeItem(props);
      setItemOnReorderingGroups(dragIndex, item, {
        replace: false,
      });

      const newDataSource = moveYAfterX(data, dragIndex, dropIndex);
      silentSetData(newDataSource);

      this.clearDropInfo();
      return;
    }

    this.clearDropInfo();
    return;
  };

  computeItem = (props: any) => {
    const { computedGroupBy: groupBy } = props;
    const { dropKeyPath } = DRAG_INFO;

    if (!dropKeyPath) {
      return {};
    }

    let item: any = {};
    for (let i = 0; i < groupBy.length; i++) {
      item[groupBy[i]] = dropKeyPath[i];
    }

    return item;
  };

  initDrag = ({ cellNode }: { cellNode: any }) => {
    const contentNode = this.content.getDOMNode();
    const headerNode = this.headerLayout
      ? (this.headerLayout as any).headerDomNode.current
      : null;

    const contentRegion = Region.from(contentNode);
    const headerRegion = Region.from(headerNode);
    const headerHeight: number = headerRegion.getHeight();

    const node = cellNode && cellNode.current;
    const cellRegion = Region.from(node);

    return {
      contentRegion,
      headerHeight,
      cellRegion,
    };
  };

  getDropGroup = () => {
    const { ranges, dragBoxRegion } = DRAG_INFO;

    const { dropGroup, keyPath: dropKeyPath } = getDropGroup({
      ranges,
      dragBoxRegion,
    });
    DRAG_INFO = Object.assign({}, DRAG_INFO, {
      dropGroup,
      dropKeyPath,
    });
  };

  onRowReorder = (
    props: any,
    { dragIndex, dropIndex }: { dragIndex: number; dropIndex: number }
  ) => {
    const { data, onRowReorder } = props;

    const rowData = data[dragIndex];
    onRowReorder({
      data: rowData,
      dragRowIndex: dragIndex,
      insertRowIndex: dropIndex,
    });
  };

  getDragProxy = (
    props: any,
    {
      dragIndex,
      contentRegion,
      cellRegion,
      dragBoxInitialRegion,
    }: {
      dragIndex: number;
      contentRegion: TypeConstrainRegion;
      cellRegion: TypeConstrainRegion;
      dragBoxInitialRegion: TypeConstrainRegion;
    }
  ) => {
    const dragProxy = this.dragRow ? this.dragRow : undefined;

    dragProxy.setDragIndex(dragIndex);
    dragProxy.setProps(props);

    const dragBoxOffsets = {
      top: contentRegion.top,
      left: contentRegion.left,
    };

    const leftBoxOffset = cellRegion.left - dragBoxOffsets.left;
    this.dragRowArrow.setLeft(leftBoxOffset);

    const dragProxyPosition = {
      top: dragBoxInitialRegion.top - dragBoxOffsets.top,
      left: dragBoxInitialRegion.left - dragBoxOffsets.left,
    };

    return { dragProxy, dragProxyPosition, dragBoxOffsets, leftBoxOffset };
  };

  getDragBoxInitialRegion = ({ dragIndex }: { dragIndex: number }) => {
    const dragBox = this.getDragRowInstance(dragIndex);
    const dragBoxNode = dragBox.domRef ? dragBox.domRef.current : null;

    let dragBoxInitialRegion: any;
    if (dragBox) {
      dragBoxInitialRegion = Region.from(dragBoxNode);
    }

    this.dragBoxInitialHeight =
      dragBoxInitialRegion && dragBoxInitialRegion.getHeight();

    if (
      DRAG_ROW_MAX_HEIGHT &&
      dragBoxInitialRegion &&
      dragBoxInitialRegion.getHeight() > DRAG_ROW_MAX_HEIGHT
    ) {
      dragBoxInitialRegion.setHeight(DRAG_ROW_MAX_HEIGHT);
      dragBoxInitialRegion.shift({
        top: this.dragBoxInitialHeight / 2 - DRAG_ROW_MAX_HEIGHT / 2,
      });
    }

    const dragRowHeight = dragBoxInitialRegion.getHeight();

    return { dragBoxInitialRegion, dragRowHeight };
  };

  setScrollRegionVisibility = () => {
    if (this.scrollTopRegionRef.current) {
      this.scrollTopRegionRef.current.setVisible(true);

      const height =
        this.headerLayout && (this.headerLayout as any).headerNode.offsetHeight;
      this.scrollTopRegionRef.current.setHeight(height);
    }

    if (this.scrollBottomRegionRef.current) {
      this.scrollBottomRegionRef.current.setVisible(true);
    }
  };

  getRanges = (
    props: any,
    {
      initialScrollTop,
      contentRegion,
      dragBoxInitialRegion,
    }: {
      initialScrollTop: number;
      contentRegion: TypeConstrainRegion;
      dragBoxInitialRegion: TypeConstrainRegion;
    }
  ) => {
    const { count, rowHeightManager, data, computedGroupBy } = props;

    let ranges: RangeResultType[] = [];
    let selectedGroup: any;
    if (computedGroupBy && computedGroupBy.length > 0) {
      ranges = getRangesForGroups({
        data,
        initialOffset: contentRegion.top,
        rowHeightManager,
        initialScrollTop,
      });

      const { dropGroup } = getDropGroup({
        ranges,
        dragBoxRegion: dragBoxInitialRegion,
      });
      selectedGroup = dropGroup;
    } else {
      ranges = getRangesForRows({
        count,
        initialOffset: contentRegion.top,
        rowHeightManager,
        initialScrollTop,
      });
    }

    return { ranges, selectedGroup };
  };

  compareRanges = ({ scrollDiff }: { scrollDiff: number }) => {
    const { ranges } = DRAG_INFO;

    const mapRange = (r: RangeResultType) => {
      if (!r) {
        return null;
      }

      if (r && r.group) {
        return null;
      } else {
        return {
          ...r,
          top: r.top - scrollDiff,
          bottom: r.bottom - scrollDiff,
        };
      }
    };

    return ranges.map(mapRange);
  };

  ajustDragProxy = ({
    diffTop,
    diffLeft,
    initialDiffTop,
    initialDiffLeft,
    dragProxyAjust,
  }: {
    diffTop: number;
    diffLeft: number;
    initialDiffTop: number;
    initialDiffLeft: number;
    dragProxyAjust: number;
  }) => {
    const {
      dragBoxRegion,
      dragBoxInitialRegion,
      dragBoxOffsets,
      headerHeight,
      leftBoxOffset,
    } = DRAG_INFO;

    dragBoxRegion.set({
      top: dragBoxInitialRegion.top,
      bottom: dragBoxInitialRegion.bottom,
      left: dragBoxInitialRegion.left,
      right: dragBoxInitialRegion.right,
    });

    dragBoxRegion.shift({
      top: diffTop,
      left: diffLeft,
    });

    const dragProxyTop =
      dragBoxInitialRegion.top -
      dragBoxOffsets.top +
      initialDiffTop -
      dragProxyAjust +
      headerHeight;

    const dragProxyLeft =
      dragBoxInitialRegion.left -
      dragBoxOffsets.left +
      initialDiffLeft +
      leftBoxOffset;

    return { dragProxyTop, dragProxyLeft };
  };

  getValidDropPositions = (
    props: any,
    dragIndex: number,
    dropIndex: number
  ) => {
    const {
      computedGroupBy,
      data,
      count,
      isRowReorderValid,
      allowRowReoderBetweenGroups,
    } = props;
    const { selectedGroup } = DRAG_INFO;

    let validDropPositions;

    if (computedGroupBy && computedGroupBy.length > 0) {
      validDropPositions = dropGroupIndexValidation({
        data,
        dragIndex,
        dropIndex,
        isRowReorderValid,
        selectedGroup,
        allowRowReoderBetweenGroups,
      });
    } else {
      validDropPositions = dropIndexValidation({
        count,
        dragIndex,
        dropIndex,
        isRowReorderValid,
      });
    }

    this.validDropPositions = validDropPositions;

    return validDropPositions;
  };

  clearDropInfo = () => {
    global.clearInterval(this.gridScrollInterval);
    this.dragBoxInitialHeight = 0;
    this.setReorderArrowVisible(false);

    if (!DRAG_INFO) {
      return;
    }
    const { dragProxy } = DRAG_INFO;
    this.dropIndex = -1;
    dragProxy.setVisible(false);
    DRAG_INFO = null;

    if (this.scrollTopRegionRef.current) {
      this.scrollTopRegionRef.current.setVisible(false);
    }

    if (this.scrollBottomRegionRef.current) {
      this.scrollBottomRegionRef.current.setVisible(false);
    }
  };

  cancelDrop = () => {
    if (DRAG_INFO) {
      DRAG_INFO.dragProxy.setVisible(false);
    }

    this.setReorderArrowVisible(false);
    DRAG_INFO = null;
  };

  adjustScrollOnDrag = (props: any, config: TypeConfig) => {
    const { rowReorderScrollByAmount } = props;
    const {
      contentRegion,
      scrollTopMax,
      dragBoxInitialRegion,
      initialScrollTop,
    }: any = DRAG_INFO;

    let diffTop = config.diff.top;
    let diffLeft = config.diff.left;

    const minScrollTop = Math.max(contentRegion.top, 0);
    const maxScrollTop = contentRegion.bottom;

    const scrollTop = this.getScrollTop();
    const scrollDiff = scrollTop - initialScrollTop;
    const initialDiffTop = diffTop;
    const initialDiffLeft = diffLeft;

    diffTop += scrollDiff;

    let scrollAjust = 0;
    let dragProxyAjust = 0;

    if (
      dragBoxInitialRegion.top + initialDiffTop <
        minScrollTop + SCROLL_MARGIN &&
      initialDiffTop < 0
    ) {
      scrollAjust = -rowReorderScrollByAmount;
    } else if (
      dragBoxInitialRegion.top + initialDiffTop >
        maxScrollTop - SCROLL_MARGIN &&
      initialDiffTop > 0
    ) {
      scrollAjust = rowReorderScrollByAmount;
    }

    if (scrollAjust) {
      if (scrollTop + scrollAjust < 0) {
        scrollAjust = -scrollTop;
      }
      if (scrollTop + scrollAjust > scrollTopMax) {
        scrollAjust = scrollTopMax - scrollTop;
      }
      if (scrollAjust) {
        if (!props.rowReorderAutoScroll) {
          this.setScrollTop(scrollTop + scrollAjust);
        }
        dragProxyAjust = scrollAjust;
      }
    }

    return {
      initialDiffTop,
      initialDiffLeft,
      dragProxyAjust,
      scrollDiff,
      scrollTop,
      diffTop,
      diffLeft,
    };
  };

  setReorderArrowAt = (
    index: number,
    ranges: RangeResultType[],
    visible?: boolean
  ): void => {
    visible = visible !== undefined ? visible : index !== DRAG_INFO.dragIndex;

    if (!scrolling) {
      this.setReorderArrowVisible(visible);
    }

    let box = ranges[index];

    if (!box) {
      return;
    }

    if (box.group) {
      return;
    }

    const { contentRegion } = DRAG_INFO;

    let boxPos: number;
    let dragRowArrowHeight: number = this.dragRowArrow.props
      .rowReorderArrowStyle
      ? this.dragRowArrow.props.rowReorderArrowStyle.height
      : 3;

    if (!Number.isInteger(dragRowArrowHeight)) {
      dragRowArrowHeight = 3;
    }

    if (index === 0) {
      boxPos = box.top;
    } else if (index === ranges.length - 1) {
      const lastBox = ranges[ranges.length - 1];
      boxPos = lastBox.bottom - Math.floor(dragRowArrowHeight);
    } else {
      boxPos = box.bottom - Math.floor(dragRowArrowHeight / 2);
    }

    const arrowPosition: number = boxPos - contentRegion.top;

    return this.setReorderArrowPosition(arrowPosition);
  };

  setReorderArrowPosition = (top: number) => {
    this.dragRowArrow.setTop(top);
  };

  setReorderArrowVisible = (visible: boolean) => {
    this.dragRowArrow.setVisible(visible);
  };

  onRowReorderValidation = (
    ev: MouseEvent | any,
    props: any,
    dragIndex: number
  ): boolean => {
    if (
      (ev.isDefaultPrevented && ev.isDefaultPrevented()) ||
      ev.defaultPrevented
    ) {
      return false;
    }

    const {
      onRowReorder,
      rowReorderColumn,
      computedPagination,
      computedSortInfo,
      computedFiltered,
      dataSource,
      data,
      computedPivot,
    } = props;

    if (
      !onRowReorder &&
      (typeof onRowReorder !== 'function' || typeof onRowReorder !== 'boolean')
    ) {
      if (!rowReorderColumn) {
        return false;
      }
    }

    if (
      (ev.nativeEvent
        ? ev.nativeEvent.which === 3
        : ev.which === 3) /* right click */ ||
      ev.metaKey ||
      ev.ctrlKey
    ) {
      return false;
    }

    if (
      computedPagination ||
      computedSortInfo ||
      computedFiltered ||
      typeof dataSource === 'function' ||
      (computedPivot && computedPivot.length > 0)
    ) {
      if (typeof onRowReorder !== 'function') {
        return false;
      }
    }

    let dragRow;
    dragRow = data[dragIndex];
    if (!dragRow) {
      ev?.stopPropagation();
      return false;
    }

    return true;
  };
}
