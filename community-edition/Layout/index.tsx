/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Component,
  LegacyRef,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import PaginationToolbar from '../packages/PaginationToolbar';

import shouldComponentUpdate from '../packages/shouldComponentUpdate';

import { TypeComputedProps, RowProps, TypePaginationProps } from '../types';
import ColumnLayout from './ColumnLayout';
import FakeFlex from '../FakeFlex';
import join from '../packages/join';
import { Consumer } from '../context';

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

type LayoutProps = {
  renderInPortal: (el: ReactElement) => ReactPortal | null;
  Footer?: any;
  useNativeFlex?: boolean;
  constrainTo?: any;
  onRowMouseEnter?: (event: MouseEvent, rowProps: RowProps) => void;
  onRowMouseLeave?: (event: MouseEvent, rowProps: RowProps) => void;
};

class InovuaDataGridLayout extends Component<LayoutProps> {
  static defaultProps: any;
  static propTypes: any;

  ref: LegacyRef<HTMLDivElement>;
  domNode: HTMLDivElement | null = null;
  refColumnLayout: LegacyRef<any>;
  columnLayout: any;
  dragHeader: any;

  constructor(props: LayoutProps) {
    super(props);

    this.ref = (domNode: HTMLDivElement) => {
      this.domNode = domNode;
    };

    this.refColumnLayout = layout => {
      this.columnLayout = layout;
    };
  }

  shouldComponentUpdate(nextProps: LayoutProps, nextState: any): any {
    return shouldComponentUpdate(this, nextProps, nextState);
  }

  getDOMNode = () => {
    return this.domNode;
  };

  render() {
    const Footer = this.props.Footer;
    return (
      <Consumer>
        {(computedProps: TypeComputedProps | null): ReactNode => {
          const ColumnLayoutCmp =
            (computedProps && computedProps.ColumnLayout) || ColumnLayout; // can be injected from enterprise edition
          return (
            <div className={'InovuaReactDataGrid__body'} ref={this.ref}>
              <FakeFlex
                flexIndex={0}
                getNode={this.getDOMNode}
                useNativeFlex={computedProps!.useNativeFlex}
              >
                <ColumnLayoutCmp
                  key="collayout"
                  ref={this.refColumnLayout}
                  rtl={computedProps!.rtl}
                  coverHandleRef={computedProps!.coverHandleRef}
                />
                {this.renderPaginationToolbar(computedProps!)}
                {computedProps!.computedFooterRows && Footer ? (
                  <Footer
                    key="footer"
                    rows={computedProps!.computedFooterRows}
                  />
                ) : null}
              </FakeFlex>
            </div>
          );
        }}
      </Consumer>
    );
  }

  renderPaginationToolbar(computedProps: TypeComputedProps) {
    const {
      pagination,
      paginationProps,
      i18n,
      theme,
      pageSizes,
    } = computedProps;
    if (!pagination) {
      return null;
    }

    if (!paginationProps || paginationProps.livePagination) {
      return null;
    }

    let result;
    if (computedProps.renderPaginationToolbar) {
      result = computedProps.renderPaginationToolbar(paginationProps);
    }

    const paginationToolbarProps: TypePaginationProps = {
      perPageText: i18n('perPageText'),
      pageText: i18n('pageText'),
      ofText: i18n('ofText'),
      showingText: i18n('showingText'),
      rtl: computedProps.rtl,
      ...paginationProps,
      pageSizes,
      onClick: stopPropagation,
      theme,
      className: join(
        paginationProps.className,
        this.props.useNativeFlex ? 'InovuaReactDataGrid-modifier--relative' : ''
      ),
    };

    paginationToolbarProps.bordered = false;
    delete paginationToolbarProps.livePagination;

    if (result === undefined) {
      result = (
        <PaginationToolbar
          key="paginationtoolbar"
          {...paginationToolbarProps}
          constrainTo={this.props.constrainTo}
          renderPageList={this.renderPageList}
        />
      );
    }

    return result;
  }

  renderPageList = (list: any) => {
    if (!createPortal) {
      return list;
    }

    return this.props.renderInPortal(list);
  };

  onRowMouseEnter = (event: MouseEvent, rowProps: RowProps) => {
    this.props.onRowMouseEnter && this.props.onRowMouseEnter(event, rowProps);
  };

  onRowMouseLeave = (event: MouseEvent, rowProps: RowProps) => {
    this.props.onRowMouseLeave && this.props.onRowMouseLeave(event, rowProps);
  };

  getVirtualList = () => {
    return this.columnLayout && this.columnLayout.getVirtualList();
  };

  getRenderRange = () => {
    return this.columnLayout.getRenderRange();
  };

  isRowFullyVisible = (index: number) => {
    return this.columnLayout.isRowFullyVisible(index);
  };

  getScrollLeft = () => {
    return this.columnLayout ? this.columnLayout.scrollLeft || 0 : 0;
  };

  getColumnLayout = () => {
    return this.columnLayout;
  };

  setScrollLeft = (scrollLeft: number) => {
    if (this.columnLayout) {
      this.columnLayout.setScrollLeft(scrollLeft);
      if (this.dragHeader) {
        this.dragHeader.setScrollLeft(scrollLeft);
      }
    }
  };

  getScrollTop = () => {
    return this.columnLayout ? this.columnLayout.scrollTop || 0 : 0;
  };
}

InovuaDataGridLayout.defaultProps = {
  defaultScrollTop: 0,
  onRowMouseEnter: () => {},
  onRowMouseLeave: () => {},
  rowPlaceholderDelay: 300,
};

InovuaDataGridLayout.propTypes = {
  i18n: PropTypes.func,
  shouldComponentUpdate: PropTypes.func,
  constrainTo: PropTypes.any,
  Footer: PropTypes.any,
  loading: PropTypes.bool,
  onScroll: PropTypes.func,
  onRowMouseEnter: PropTypes.func,
  onRowMouseLeave: PropTypes.func,
};

export default InovuaDataGridLayout;
