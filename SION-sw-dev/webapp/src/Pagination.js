import React, { Component } from "react";

class Pagination extends Component {

  handleBack() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onBack;
      if (f) f();
    };

    return fn;
  }

  handleNext() {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onNext;
      if (f) f();
    };

    return fn;
  }

  handleItem(index) {
    let self = this;

    let fn = (evt) => {
      evt.preventDefault();

      let f = self.props.onItem;
      if (f) f(index);
    };

    return fn;
  }

  createItem() {
    let self = this;

    let fn = (item) => {
      let isActive = item.active;
      let className = "waves-effect";
      if (isActive) {
        className = "active"
      }

      return (
        <li className={className}>
          <a href="#item-pag" onClick={self.handleItem(item.label)}>{item.label}</a>
        </li>
      );
    };

    return fn;
  }

  render() {
    // disabled waves-effect
    let items = this.props.items;
    let num_pages = this.props.num_pages;
    let page = this.props.page;

    if (!items) items = [];
    if (!page) page = Pagination.FIRST_PAGE;
    if (!num_pages) num_pages = 0;

    let items_back = false;
    let items_next = false;

    if (items.length > 1) {
      let first = items[0];
      if (first.label > 1) {
        items_back = (() => {
          return (
            <li className="waves-effect">
              <a href="#more">...</a>
            </li>
          );
        })();
      }

      let index = items.length - 1;
      let last = items[index];
      if (last.label < num_pages) {
        items_next = (() => {
          return (
            <li className="waves-effect">
              <a href="#more">...</a>
            </li>
          );
        })();
      }
    }

    let nextClass = 'disabled';
    let backClass = 'disabled';

    if (page === 1) backClass = 'waves-effect';
    if (page === items.length) nextClass = 'waves-effect';

    return (
      <ul className="pagination">
        <li className={backClass} onClick={this.handleBack()}>
          <a href="#back">
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {items_back}

        {items.map(this.createItem())}

        {items_next}

        <li className={nextClass}>
          <a href="#next" onClick={this.handleNext()}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    );
  }
}

Pagination.ROWS_PER_PAGE = 10;
Pagination.FIRST_PAGE = 1;
Pagination.LIMIT_PAGES = 10;

export default Pagination;