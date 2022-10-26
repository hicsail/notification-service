
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import theme from './theme';
import createEmotionCache from './createEmotionCache';

export function sample() {
    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

    // Render the component to a string.
    const html = ReactDOMServer.renderToString(
        <CacheProvider value={cache} >
            <ThemeProvider theme={theme} >
                <CssBaseline />
                < App />
            </ThemeProvider>
        </CacheProvider>
    );

    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(html);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    return (
        <html>
            <head>
                <title>My page</title>
                ${emotionCss}
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </head>
            <body>
                <div id="root">${html}</div>
            </body>
        </html>
    )
}