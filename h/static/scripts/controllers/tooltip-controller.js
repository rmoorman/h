'use strict';

/**
 * A custom tooltip similar to the one used in Google Docs which appears
 * instantly when activated on a target element.
 *
 * The tooltip is displayed and hidden by setting its target element.
 *
 *  var tooltip = new Tooltip(document.body);
 *  tooltip.setState({target: aWidget}); // Show tooltip
 *  tooltip.setState({target: null}); // Hide tooltip
 *
 * The tooltip's label is derived from the target element's 'aria-label'
 * attribute.
 *
 * @param {Element} el - The container for the tooltip.
 */
function TooltipController(el) {
  var self = this;

  el.addEventListener('mouseover', function () {
    self.setState({target: el});
  });

  el.addEventListener('mouseout', function () {
    self.setState({target: null});
  });

  this.setState = function (state) {
    this.state = Object.freeze(Object.assign({}, this.state, state));
    this.render();
  };

  this.render = function () {
    var TOOLTIP_ARROW_HEIGHT = 7;

    if (!this.state.target) {
      this._el.style.visibility = 'hidden';
      return;
    }

    var target = this.state.target;
    var label = target.getAttribute('aria-label');
    this._labelEl.textContent = label;

    var tooltipRect = this._el.getBoundingClientRect();

    var targetRect = target.getBoundingClientRect();
    var top = targetRect.top - tooltipRect.height - TOOLTIP_ARROW_HEIGHT;
    var left = targetRect.left;

    Object.assign(this._el.style, {
      visibility: '',
      top: top + 'px',
      left: left + 'px',
    });
  };

  this._el = el.ownerDocument.createElement('div');
  this._el.innerHTML = '<span class="tooltip-label js-tooltip-label"></span>';
  this._el.className = 'tooltip';
  el.appendChild(this._el);
  this._labelEl = this._el.querySelector('.js-tooltip-label');

  this.setState({});
}

module.exports = TooltipController;
