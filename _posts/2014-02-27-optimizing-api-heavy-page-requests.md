---
layout: post
date: 2014-02-27
title: "Optimizing API-heavy page requests"
description: "Making many requests slows down the page load significantly, how to reduce this"
categories: Guzzle
tags: Guzzle PHP speed
---

**Note:** this is a repost from a [blog post](http://myri.se/optimizing-api-heavy-page-requests/) I did for a former employer.
Nowadays I would recommend a different technique, though:
[GuzzlePHP version 5 asynchronous requests](http://guzzle.readthedocs.org/en/latest/faq.html#can-guzzle-send-asynchronous-requests).

Moving on to the original post:

At Darwin Analytics we rely on many external APIs. This includes the Google Analytics Management API.
To get all the data we need we have to make a lot of requests to the Google Analytics API.
However, making this many requests slows down the application significantly. This blogpost details how we dealt with it.

### OAuth2

When a user decides to connect a Google Analytics account he is guided through the (in)famous OAuth2 flow.
At the end of that flow, Google gives us access to read the Google Analytics accounts for that user.

Google Analytics uses the notion of accounts, properties and views. Every property belongs to one account
and every view belongs to one property.

### The Goal

The goal is to show the user a list of all his Google Analytics views, so they can choose which ones (one or more)
to connect to the brand they track with Darwin Analytics.

### The requests

To get a list of all the accounts of the user, we need to make a request to:

`https://www.googleapis.com/analytics/v3/management/accounts`
Every account has zero or more properties. The number of properties a specific account has is not returned in the first request.
This means that we need to perform a separate request to:

`.../accounts/{account-id}/webproperties`
…for every account returned in the first request. First of all, keep in mind that when you have a
Google Analytics account and you happen to delete a property, this property will still get returned by this request.
Secondly, every property has a number that represents the amount of views that belong to that property.
Remember: the accounts didn't have a property count attribute.

Moving on: we'd like to get all the views that belong to a property. We can do so with this request:

`.../accounts/{account-id}/webproperties/{property-id}/profiles`
We can decide not to perform a request if we know it is going to return zero views according to the profile's view count.

### A real life scenario

Let's say a user has 3 accounts, and every account has 5 properties.
Combining all the requests yields us a total of 1 + 3 + (3 * 5) = 19 requests.
Most requests to the Google Analytics API took 70 to 90 milliseconds to complete on my development machine.
Thus, even in the best case scenario, the requests will take at least 19 * 70 = 1330 milliseconds, or 1.3 seconds.

### Unexpected problems

An additional issue that arose was a strange Google Analytics bug. Sometimes, a request returns an error without any reason.
Performing an identical request again after several milliseconds sometimes does return the response we want.

Another problem is pagination. In the rare occasion a user has more than 1000 accounts, profiles or views,
the Google Analytics API only returns 1000 entries at a time and requires you to make one or more additional requests.
We don't have a client yet that has 1000 of any of these, but we still needed to add support for it.
Just in case someone with that amount of profiles signed up.

### Parallelism

This made us realize we needed to throw some parallelism in the mix.

Our application is made with PHP in the Laravel framework (4.1), the latest version.
For debugging purposes, we use the Clockwork browser plugin which integrates with the Google Chrome DevTools.
The Clockwork tool allows us to log certain things from the server side without messing up your
HTML output like you would do console.log in the front-end. It also allows to track down time
consuming parts of a request by logging it to the Clockwork timeline.

The screenshot below shows the timeline feature in the Google Chrome DevTools:

![timeline](/assets/article_images/2014-02-27-optimizing-api-heavy-page-requests/timeline.png)

We use the GuzzlePHP HTTP Client to perform our requests to the Google Analytics API.
This uses the PHP cURL extension but with an easy-to-use interface. By writing a Guzzle plugin I was able to log
all requests to the Clockwork plugin. Every instance of a Guzzle Client gets a plugin attached to it which
logs noteworthy events to the Clockwork plugin. The plugin logs status codes, tracks timing, etc.

To optimize the previously mentioned Google Analytics API problem, we made use of the Guzzle Multitransfer functionality.
It's easy to use: create several Guzzle Request objects and passed them as an array to the Guzzle client's send() method.
The client then performs a cURL multirequest. In doing so, we were able to retrieve all properties in under 90 milliseconds.

<script src="https://gist.github.com/hannesvdvreken/2574d0da291b72d0c16b.js"></script>

We use the same trick to get all the views.
The total time to retrieve all views takes the same amount of time as the longest of it's individual request.
In theory, we should be able to retrieve a list of all the user's views in around 210 milliseconds.
In reality, this takes about 240+ milliseconds on a slow development virtual machine,
if none of the Google Analytics API requests return an error.
The total time requesting the Google Analytics API does not increase as the amount of accounts or properties
go up as long as the JSON returned doesn't get ridiculously long or as long as we don't need to do pagination.

### Lessons learned

Use a debug tool with a timeline. It doesn't matter which one. We prefer Clockwork because it is clean and it does the trick.
Track which API requests take a while to complete, and try to group similar calls to perform those requests in parallel.
The user doesn't like waiting, so optimize.