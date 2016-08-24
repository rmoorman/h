'use strict';

const scrollIntoView = require('scroll-into-view');

class SearchBucketController {
  constructor(element) {
    this.scrollTo = scrollIntoView;

    const header = element.querySelector('.js-header');
    const content = element.querySelector('.js-content');

    header.addEventListener('click', () => {
      element.classList.toggle('is-expanded');
      content.classList.toggle('is-expanded');

      if (element.classList.contains('is-expanded')) {
        this.scrollTo(element);
      }
    });
  }
}

module.exports = SearchBucketController;
