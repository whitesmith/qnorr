/*
    Handlebars contentFor Helper
    ----

    Usage: {{#contentFor 'name'}}{{⁄contentFor}}

* ==================================================== */

module.exports = function(name, options) {
    var blocks = this._blocks || (this._blocks = {}),
        block  = blocks[name] || (blocks[name] = []);

    block.push(options.fn(this));
}
