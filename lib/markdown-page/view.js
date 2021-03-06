/**
 * Module dependencies.
 */

var closest = require('closest');
var dosMarkdown = require('markdown');
var events = require('events');
var marked = require('marked');
var o = require('query');
var render = require('render');
var t = require('t');
var template = require('./template');


/**
 * Expose View.
 */

module.exports = View;

/**
 * DemocracyOS markdown guide view
 *
 * @return {View} `View` instance.
 * @api public
 */

function View() {
  if (!(this instanceof View)) {
    return new View();
  };

  this.el = render.dom(template, { marked: marked, dosMarkdown: dosMarkdown });
  this.switchOn();
}

/**
 * Switch on events
 *
 * @api public
 */

View.prototype.switchOn = function() {
  this.events = events(this.el, this);
  this.events.bind('keyup textarea.playground', 'onchange');
};

/**
 * Switch off events
 *
 * @api public
 */

View.prototype.switchOff = function() {
  this.events.unbind();
}

/**
 * On text change
 *
 * @param {Object} data
 * @api public
 */

 View.prototype.onchange = function(ev) {
  var target = ev.delegateTarget || closest(ev.target, 'textarea');
  var result = o('.result', this.el);
  var value = target.value;
 
  if (value != '') {
    result.innerHTML = dosMarkdown(target.value);
  } else {
    result.innerHTML = t('markdown.playground.text');
  }
};

/**
 * Render view
 * 
 * @return {View} `View` instance.
 * @api public
 */

View.prototype.render = function() {
  return this.el;
}