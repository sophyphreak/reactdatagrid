/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, forwardRef, useImperativeHandle } from 'react';

type TypeScrollRegionProps = {
  dir?: -1 | 1;
  onMouseEnter: (event: any) => void;
  onMouseLeave: () => void;
  DEFAULT_CLASS_NAME?: string;
};

const ScrollingRegion = forwardRef((props: TypeScrollRegionProps, ref: any) => {
  const scrollRegionRef: any = useRef();

  const setVisible = (visible: boolean) => {
    if (scrollRegionRef.current) {
      if (visible) {
        scrollRegionRef.current.style.display = 'block';
      } else {
        scrollRegionRef.current.style.display = 'none';
      }
    }
  };

  const setHeight = (height: number) => {
    if (scrollRegionRef.current) {
      scrollRegionRef.current.style.height = `${height}px`;
    }
  };

  useImperativeHandle(ref, () => ({
    setVisible: setVisible,
    setHeight: setHeight,
  }));

  const className = props.DEFAULT_CLASS_NAME;

  return (
    <div
      ref={scrollRegionRef}
      style={{
        [props.dir === -1 ? 'top' : 'bottom']: 0,
      }}
      className={className}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    ></div>
  );
});

ScrollingRegion.defaultProps = {
  DEFAULT_CLASS_NAME: 'InovuaReactDataGrid__row-drag-scrolling-region',
};

export default ScrollingRegion;
