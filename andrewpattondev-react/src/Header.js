import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import './Header.css';

function App() {
    return (
        <nav>
            <a href="https://andrewpatton.dev" className="home">
                <img src="./favicon.png"/>
            </a>
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/Downloads/Resume.pdf">CV [PDF]</a></li>
            </ul>
        </nav>
    );
}

export default App;