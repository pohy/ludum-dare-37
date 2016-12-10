(function () {
    'use strict';

    window.registerUpdate(update);

    function update(state) {
        // state.ctx.font = '48px serif';
        // state.ctx.fillStyle = '#ca0aca';
        // state.ctx.translate(250, 150);
        // state.ctx.rotate(2.54);
        // state.ctx.fillText('Dayum, a game!', 0, 0);
        state.text.fill(150, 150)

        return state;
    }
})();