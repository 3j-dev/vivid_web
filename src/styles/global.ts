import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { Typography } from './style';

const GlobalStyle = createGlobalStyle`
    ${reset}
    html,
    body,
    span,
    div,
    a,
    input,
    textarea,
    button {
        font-family: 'NotoSansKR', sans-serif;
    }
    a{
        text-decoration: none;
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
    body{
        -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
        svg{
            cursor: pointer;
        }
        ul, ol { 
            display: block;
            list-style: disc outside none;
            margin: 1em 0;
            padding: 0 0 0 40px;
        }
        ol { 
            list-style-type: decimal;
        }
        li { 
            display: list-item;
        }
        ul ul, ol ul {
            list-style-type: circle;
            margin-left: 15px; 
        }
        ol ol, ul ol { 
            list-style-type: lower-latin;
            margin-left: 15px; 
        }
        em {
            font-style: italic;
        }

        h1{
            ${Typography.Heading1};
        }
        h2{
            ${Typography.Heading2};
        }
        h3{
            ${Typography.Heading3};
        }
        h4{
            ${Typography.Heading4};
        }
        h5{
            ${Typography.Heading5};
        }
        h6{
            ${Typography.Heading6};
        }

        .fr-box{
            h1{
                font-size: 2em;
            }
            h2{
                font-size: 1.5em;
            }
            h3{
                font-size: 1.17em;
            }
        }
        .fr-box, .fr-wrapper, .fr-second-toolbar, .fr-toolbar {
            border: 0 !important;
        }
        .fr-newline{
            display: none !important;
        }
        .fr-toolbar {

        }
        .fr-view .fr-wrapper{
            overflow-y: scroll;
        }
    }
`;

export default GlobalStyle;
