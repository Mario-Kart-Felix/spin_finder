import $ from 'properjs-hobo';
import avoidOrphan from './utils/avoid-orphan';
import loadImages from './utils/load-images';
import emitter from './utils/emitter';
import scroller from './utils/scroller';
import resizer from './utils/resizer';
import SearchButton from './components/SearchButton';
import MobileNav from './components/MobileNav';
import ScrollElems from './components/ScrollElems';
import Modal from './components/Modal';

export default class App {
  constructor() {
    this.$lazyImgs = $('.js-lazy-img');
    this.$scrolls = $('.js-scrolls');
    this.$orphans = $('.js-avoid-orphan');
    this.orphanArray = [];
    this.initialize();
  }

  initialize() {
    this.searchButton = new SearchButton('.js-search-icon');
    this.mobileNav = new MobileNav('.js-nav-button');
    this.modal = new Modal('.js-modal-init');
    loadImages(this.$lazyImgs);
    this._bindEvents();
    this._mapOrphans();
    this._mapScrolls();
    this._printRecipe();
  }

  _bindEvents() {
    scroller.on('scroll', () => {
      emitter.fire('app--scroll');
    });

    resizer.on('resize', () => {
      emitter.fire('app--resizer');
    });
  }

  _mapScrolls() {
    this.$scrolls.each((elem, i) => {
      const $elem = $(this.$scrolls[i]);
      $elem.data('scrolls', new ScrollElems($elem));
    });
  }

  _mapOrphans() {
    this.$orphans.each((elem) => {
      this.orphanArray.push(elem);
    });
    this.orphanArray.map((orphan) => {
      avoidOrphan(orphan);
    });
  }

  _printRecipe() {
    $('.js-print-recipe').on('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
}
