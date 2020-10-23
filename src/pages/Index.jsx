import React, { Component } from 'react';

export default class Index extends Component {
  componentDidMount() {
    // this.tracker = new WebLogger({
    //   plat: { yai: "tracer-independent-test" },
    // });
    // this.tracker.enterpage();c
    const div = document.getElementById('index');
    const p = document.getElementById('page');

    div.addEventListener(
      'click',
      (e) => {
        console.log('div click true');
        // e.stopPropagation();
        // e.stopImmediatePropagation();
      },
      true
    );

    p.addEventListener(
      'click',
      (e) => {
        console.log('p click true');

        // e.stopPropagation();
        // e.stopImmediatePropagation();
      },
      true
    );

    p.addEventListener(
      'click',
      (e) => {
        console.log('p click false');

        // e.stopPropagation();
        // e.stopImmediatePropagation();
      },
      false
    );

    div.addEventListener(
      'click',
      (e) => {
        console.log('div click false');

        e.stopPropagation();
        // e.stopImmediatePropagation();
      },
      false
    );
  }

  render() {
    return (
      <div id="index">
        index<p id="page">page</p>
      </div>
    );
  }
}
