---
layout: post
date: 2016-06-01
title: "On PSR-7 middlewares"
description: "This PSR-7 middleware discussion is kind of waste of time"
tags: psr-7 php http
---

PSR-7 got released May 4, 2015. There is a discussion about middlewares based on PSR-7 messages, and it is awfully overdue. The most common middlewares in use since June 2015 are callables with this interface:

```php
use Psr\Http\Message\ResponseRequestInterface;
use Psr\Http\Message\ServerRequestInterface;

function (ServerRequestInterface $request, ResponseInterface $response, callable $next)
{
    // Do something with the Request or stop execution and return a Response here.
    ...

    // Call the next middleware
    $response = $next($request, $response);

    // Modify the response, if you like, before returning it.
    ...

    return $response;
}
```

They just work. I've been using them since June 2015. You can stack a number of middlewares with tools like [relay/relay](https://packagist.org/packages/relay/relay) or [mindplay/middleman](https://packagist.org/packages/mindplay/middleman). I prefer the latter because it plays well with `container-interop` containers to resolve middlewares when you need them.

Granted, you can use them wrong by fiddling with the Response before passing it on to the next middleware. Just don't do that. But I'd rather educate newbies than to remodel the whole thing and to make it overly complex. I've been giving this PSR-7 talk for 12! months now. Please just spread the word and stop discussing something that has been in use for over a year now.

Thanks.

Links to other discussions:
- http://blog.ircmaxell.com/2016/05/all-about-middleware.html
- https://philsturgeon.uk/2016/05/31/why-care-about-php-middleware/
- https://groups.google.com/forum/#!msg/php-fig/vTtGxdIuBX8/NXKieN9vDQAJ
- https://groups.google.com/forum/#!msg/thephpleague/jyztj-Nz_rw/I4lHVFigAAAJ

Some links might be missing here. Feel free to send a PR.
