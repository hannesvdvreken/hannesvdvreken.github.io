---
layout: default
modal-id: 2013-07-17
title: "TIL: callback.call(this [, arg1 [, arg2…]]);"
date: 2013-07-17
alt: "TIL: callback.call(this [, arg1 [, arg2…]]);"
project-date: July 2013
description: "TIL: callback.call(this [, arg1 [, arg2…]]);"
---

In javascript, the `this` object in a callback is the object from where it is called.
If you have a function that is not contained by an object (recognisable by the curly braces: `{}`),
the `this` object will be `window`. You can check this by writing a `console.log(this)`.

So, a helper function:

<script src="https://gist.github.com/hannesvdvreken/1d8101dd67facfdc6d38.js"></script>

When you execute `obj.bar()` somewhere on your console their will be an output of the `window` object.

To allow for access of `this.name` in the anonymous function, change this:

<script src="https://gist.github.com/hannesvdvreken/e2e5d8249a9e9176640c.js"></script>

More information on this can be found at [the Mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

One last quick tip: a good JS developer always adds `mdn` to his Google query to get good documentation and not the commercial w3schools docs.

Cheers!