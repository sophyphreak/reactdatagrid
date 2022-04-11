import React from 'react';

import ComboBox from '@inovua/react-ui-toolkit/ComboBox';
import { useAppState } from '../../hooks';

const Select = (props: any) => {
  const { theme } = useAppState();

  return (
    <ComboBox
      theme={theme}
      collapseOnSelect
      changeValueOnNavigation
      {...props}
    />
  );
};

export default Select;
