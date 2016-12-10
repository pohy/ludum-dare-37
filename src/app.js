(function () {
    'use strict';

    window.addEventListener('load', init);

    const srcPath = 'src/';
    const scripts = [
        'game.js'
    ];

    let updateCallbacks = [];

    function init() {
        window.registerUpdate = registerUpdate;
        appendScripts().then(startGame);
    }

    function startGame() {
        const canvas = createCanvas();
        const size = {
            width: canvas.width,
            height: canvas.height
        };
        const ctx = initContext(canvas);
        const initialState = {
            size,
            ctx
        };
        update(initialState);
    }

    function update(state) {
        const newState = updateCallbacks.reduce((currentState, updateCallback) => {
            currentState.ctx.save();
            const freshState = updateCallback(currentState);
            if (!freshState) {
                throw new Error('Update callback did not return a new state');
            }
            // TODO: reset ctx stateful values to default (fillStyle, etc...)
            currentState.ctx.restore();
            return freshState;
        }, state);

        window.requestAnimationFrame(requestUpdate);

        function requestUpdate() {
            newState.ctx.fillStyle = '#000';
            newState.ctx.fillRect(0, 0, state.size.width, state.size.height);

            update(newState);
        }
    }

    function registerUpdate(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Update callback passed is not a function');
        }
        updateCallbacks.push(callback);
    }

    function initContext(canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('2D context is not supported');
        }
        return ctx;
    }

    function createCanvas() {
        const width = 854;
        const height = 480;
        const canvasEl = document.createElement('canvas');
        canvasEl.setAttribute('width', width);
        canvasEl.setAttribute('height', height);
        canvasEl.style.width = width;
        canvasEl.style.height = height;
        document.getElementById('app').appendChild(canvasEl);
        return canvasEl;
    }

    function appendScripts() {
        let scriptsLoadedCount = 0;

        return new Promise((resolve) => {
            scripts.forEach((scriptPath) =>
                appendScript(scriptPath, resolve)
            )
        });

        function appendScript(scriptPath, resolve) {
            const scriptEl = document.createElement('script');
            scriptEl.setAttribute('src', srcPath + scriptPath);
            scriptEl.setAttribute('type', 'text/javascript');
            scriptEl.addEventListener('load', scriptLoaded(resolve));
            document.body.appendChild(scriptEl);
        }

        function scriptLoaded(resolve) {
            return () => {
                scriptsLoadedCount++;
                if (scriptsLoadedCount >= scripts.length) {
                    resolve();
                }
            };
        }
    }
})();
