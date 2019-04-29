import React from 'react';
import {render} from 'react-dom';

import App from 'components/App';
import themeMusic from 'theme.mp3';

import 'index.scss';

let themeAudio = new Audio(themeMusic);
themeAudio.loop = true;
themeAudio.play().catch((err) => console.error(err));

render(
    <App/>,
    document.getElementById('root')
);
