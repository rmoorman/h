'use strict';

/**
 * Controller for dropdown menus.
 */
class DropdownMenuController {
  constructor(element) {
    const toggleEl = element.querySelector('.js-dropdown-menu-toggle');
    const contentEl = element.querySelector('.js-dropdown-menu-content');

    const handleClickOutside = event => {
      if (!contentEl.contains(event.target)) {
        // When clicking outside the menu on the toggle element, stop the event
        // so that it does not re-trigger the menu
        if (toggleEl.contains(event.target)) {
          event.stopPropagation();
          event.preventDefault();
        }
        contentEl.classList.remove('is-open');
        element.ownerDocument.removeEventListener('click', handleClickOutside,
          true /* capture */);
      }
    };

    toggleEl.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      contentEl.classList.add('is-open');

      element.ownerDocument.addEventListener('click', handleClickOutside,
        true /* capture */);
    });
  }
}

module.exports = DropdownMenuController;
