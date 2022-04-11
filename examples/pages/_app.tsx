import React, { useState, useEffect } from 'react';

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '../../community-edition/style/base.scss';
import '../../community-edition/style/theme/default-light/index.scss';
import '../../community-edition/style/theme/default-dark/index.scss';

import '../../community-edition/style/theme/amber-light/index.scss';
import '../../community-edition/style/theme/amber-dark/index.scss';

import '../../community-edition/style/theme/blue-light/index.scss';
import '../../community-edition/style/theme/blue-dark/index.scss';

import '../../community-edition/style/theme/green-light/index.scss';
import '../../community-edition/style/theme/green-dark/index.scss';

import '../../community-edition/style/theme/pink-light/index.scss';
import '../../community-edition/style/theme/pink-dark/index.scss';

import '../pages/prop-checkboxColumn/prop-checkboxColumns.scss';

import './index.scss';
// import './demo/components/avatar/index.scss';
// import './demo/components/avatarLetters/index.scss';
// import './demo/components/combo/index.scss';
// import './demo/components/label/index.scss';
// import './demo/components/numberInput/index.scss';
// import './demo/components/promiseImg/index.scss';
// import './demo/components/radio/index.scss';
// import './demo/components/section/index.scss';
// import './demo/components/separator/index.scss';
// import './demo/components/switch/index.scss';

import ReactDataGridEnterprise from '../../enterprise-edition';
import ReactDataGridCommunity from '../../community-edition';
import CheckBox from '../../community-edition/packages/CheckBox';
import Button from '../../community-edition/packages/Button';
import ComboBox from '../../community-edition/packages/ComboBox';
import Menu from '../../community-edition/packages/Menu';

ReactDataGridEnterprise.defaultProps.theme = 'default-dark';
(ReactDataGridEnterprise.defaultProps as any).licenseKey =
  process.env.NEXT_PUBLIC_LICENSE_KEY;
ReactDataGridCommunity.defaultProps.theme = 'default-dark';
(CheckBox as any).defaultProps.theme = 'default-dark';
(Button as any).defaultProps.theme = 'default-dark';
(ComboBox as any).defaultProps.theme = 'default-dark';
(Menu as any).defaultProps.theme = 'default-dark';


function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, [])

  if (!showChild) {
    return;
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <>
        <Component {...pageProps} />
  
        <style global jsx>
          {`
            body {
              background: #2e3439;
              color: #fafafa;
              margin: 20px;
              height: calc(100% - 40px);
              width: calc(100% - 40px);
            }
  
            #__next {
              height: 100%;
            }
            html {
              height: 100vh;
            }
          `}
        </style>
    </>
    )
  }

}

export default MyApp
