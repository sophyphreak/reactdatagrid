import React from 'react';

import InovuaButton from '@inovua/react-ui-toolkit/Button';
import { useAppState } from '../../hooks';

const Button = (props: any) => {
  const { theme } = useAppState();

  return <InovuaButton theme={theme} {...props}></InovuaButton>;
};

export default Button;
