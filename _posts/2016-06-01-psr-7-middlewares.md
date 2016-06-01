---
layout: post
date: 2016-06-01
title: "On PSR-7 middlewares"
description: "This PSR-7 middleware discussion is kind of waste of time"
tags: psr-7 php http
---

PSR-7 got released May 4, 2015. There is a discussion about middlewares based on PSR-7 messages, and it is awfully overdue. The most common middlewares in use since June 2015 are callables with this interface:

<script src="https://gist.github.com/hannesvdvreken/6767f0b423a28b24e7c588c22f552b78.js"></script>

They just work. I've been using them since June 2015. You can stack a number of middlewares with tools like [relay/relay](https://packagist.org/packages/relay/relay) or [mindplay/middleman](https://packagist.org/packages/mindplay/middleman). I prefer the latter because it plays well with `container-interop` containers to resolve middlewares when you need them.

Granted, you can use them wrong by fiddling with the Response before passing it on to the next middleware. Just don't do that. But I'd rather educate newbies than to remodel the whole thing and to make it overly complex. I've been giving [this PSR-7 talk](https://www.youtube.com/watch?v=gOVALgpqHzM) for 12! months now. Please just spread the word and stop discussing something that has been in use for over a year now.

Thanks.

PSR-7 middlewares discussion links:

- [Anthony Ferrara's post](http://blog.ircmaxell.com/2016/05/all-about-middleware.html)
- [Woody Gilk's post](http://shadowhand.me/all-about-psr-7-middleware/)
- [Phil Sturgeon's post](https://philsturgeon.uk/2016/05/31/why-care-about-php-middleware/)
- [Andrew Carter educating that the StreamInterface isn't immutable](http://andrewcarteruk.github.io/programming/2016/05/22/psr-7-is-not-immutable.html)
- [PHP-FIG discussion on google groups](https://groups.google.com/forum/#!msg/php-fig/vTtGxdIuBX8/NXKieN9vDQAJ)
- [PHP league discussion on google groups](https://groups.google.com/forum/#!msg/thephpleague/jyztj-Nz_rw/I4lHVFigAAAJ)

Some links might be missing here. Feel free to send a PR.
