/*
    Handlebars Block Helper
    ----

    Dynamic content block, that can be updated from whithin templates
    with contentFor helper

    Usage: {{#block "name}}{{/block}}

    	   {{#contentFor "name}}content{{/contentFor}}

* ==================================================== */

module.exports = function(name, options) {
		var blocks  = this._blocks,
            content = blocks && blocks[name];

        return content ? content.join('\n') : null;
}
