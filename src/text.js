(function () {
    'use strict';

    class Text {
        constructor(ctx) {
            this.ctx = ctx;
            this.font = '48px Sans';
            this.color = '#fff';
            this.content = 'Dummy text';
        }

        font(font) {
            this.font = font;
            return this;
        }

        color(color) {
            this.color = color;
            return this;
        }

        content(text) {
            this.content = text;
            return this;
        }

        fill(x, y) {
            this.ctx.font = this.font;
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.content, x, y);
            return this;
        }

        stroke(x, y) {
            this.ctx.font = this.font;
            this.ctx.strokeStyle = this.color;
            this.ctx.strokeText(this.content, x, y);
            return this;
        }
    }

    window.registerService('text', Text);
})();
