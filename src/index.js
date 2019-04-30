import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'

import App from 'components/App';
import store from 'core/store';

import themeMusic from 'theme.mp3';
import 'index.scss';

let themeAudio = new Audio(themeMusic);
themeAudio.loop = true;
themeAudio.play().catch((err) => console.error(err));

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
