import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';

import GlobalStyle from './styles/global';
import App from './App';

ReactModal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
//froala rerendering 문제로 인해 React.strict mode 해제
