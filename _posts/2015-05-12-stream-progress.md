---
layout: post
date: 2015-05-12
title: "Displaying stream progress in PHP"
description: ""
categories: "php"
tags: php resource stream symfony console progressbar
---

With PHP you can, next to handling HTTP requests, invoke scripts from the command line. For a typical web application this could be used to run database migrations, insert data into the database from fixtures or seeders, repetitive tasks run by cron, clear the cache (`cache:clear`), general admin stuff... basically anything that can be automated.

The Symfony console component is a very useful tool to bundle and bootstrap these kind of CLI tasks. You can view the console application as the command line alternative of your index.php front controller and request objectsfor HTTP requests. It handles calling the right commands, parsing and validating arguments and options, displaying help, ...
All you need to do is to create a `Command` class per task and define its name, description, arguments and options.

You command's `execute` method will be called using an InputInterface object and an OutputInterface object. The `$input` object can be used for getting the arguments and options to run the specific task. The `$output` object for displaying what the task is doing or has done. What is actually printed on the console is very important for the task issuer. Think of it as the command's usability.

Opposite to HTTP requests, tasks run from the command line aren't supposed to return instantly. They can take a very long time. Imagine a task that loops an entire database table or a task that references an external source repetitively. Or maybe a large file transfer. It's very important to show the issuer what is actually going on, or he/she will be left in the dark for minutes/hours. "Is this task still running?", "How long has this thing been running yet?", "Is it almost done?", "Is it running out of memory?"

Enter the [ProgressBar](http://symfony.com/doc/current/components/console/helpers/progressbar.html). The `ProgressBar` is an output helper that wraps the `OutputInterface` object. Initiate a `ProgressBar` object with the `OutputInterface` object, and an initial number of maximum iterations to be executed, for example number of table rows, number of bytes to be transferred, ... For example, do a quick count query first on your database to check the amount of iterations that will need to be done. Then while iterating call the `ProgressBar::advance` or `ProgressBar::setProgress` method to indicate progress.

```
15214/455642 [=========>------------------]  33%  21 sec/58 sec  2.1 MB
```

When you call any Symfony console command you can indicate the output verbosity you want (use `-vvv` option). When adding 3 `v`'s the ProgressBar will also display the elapsed time, the estimated time left and the memory the process is currently consuming.

When transferring a file it's a little bit harder to show the progress of the transfer. When opening resources (also called streams) in PHP one can add a "stream context" which can have a reference to a [`stream_notification_callback`](http://php.net/manual/en/function.stream-notification-callback.php). A resource can be a FTP, SFTP, HTTP, HTTPS source, or anything else that can be streamed over TCP sockets.

```php
$context = stream_context_create([], ['notification' => $callback]);
$resource = fopen($source, 'r', null, $context);
```

The notification callback can be used to get notified of certain events. See of it as a event dispatching mechanism and a single callable event listener. For example: one can get notified how many bytes are available on the readable stream. After every chunk of data transfer the callback is notified with the number of bytes that have been transferred up till then.

<script src="https://gist.github.com/hannesvdvreken/4e20b9f9569f3d5c6245.js"></script>

There are a few caveat though...

First: stream contexts must be created before the resource is opened. This means one simply cannot use the notification callback for existing resources.

That is why in the previous example I used Flysystem to write the stream to a file, but not to initiate the read stream. `FilesystemInterface::readStream` returns a resoure but it doesn't allow you to set a stream context.
By the way, most Flysystem adapters implement the `readStream` in a slightly inexpected way. To comply with the interface the adapters read the source file content and append it to the `php://temp` (in memory) stream. Then the memory stream is rewound, so it is ready to read, and ultimately returned.

Second caveat: using resources and a notification callback doesn't mean the transfer is asynchronous. To create truly asynchronous transfer I would recommend taking a look at [ReactPHP](http://reactphp.org/).

Finally the true benefits of resources and the notification callback:

Large files aren't stored in memory while transferring. Only buffered chunks are kept in memory. To give an example: I managed to transfer an entire Ubuntu iso file over HTTP to the local file system while the process was using merely 2.2MB of memory. And more importantly: the issues of the taks sees how the task is progressing. This greatly improves the usability of the task.

Happy streaming!
