---
layout: post
date: 2015-01-28
title: "Composer's autoload-dev"
description: "About Composer's autoload-dev section in your composer.json file"
categories: "composer"
tags: php composer git
image: /assets/images/background_image.jpg
---

Today's blog post is about the `autoload-dev` configuration section in the root of `composer.json` file.
This is almost identical to the `autoload` section, with optional child objects such as `classmap`, `psr-0` and `psr-4`,
and the optional `files` array. The only difference is when it has effect.

When the `composer dump-autoload` command is executed, by default both the autoload and autoload-dev sections of
your composer.json file have an effect on the resulting `vendor/autoload.php` file.
You can force composer to leave out the autoload-dev autoloaded namespaces and files by adding the `--no-dev` flag.
When composer pulls in a depending package, it will automatically register all autoload sections
from the depending packages as well, but not the autoload-dev section.
The autoload-dev autoload sections are thus reserved for the package/application developers and not for the dependents.

As a package developer this is useful to create namespaces for stub classes,
classes for fake object, etc... These classes can then be used in tests and will not be available
to anyone who requires your project.

As an application developer I would still use this functionality just to make a difference between classes
that are only used in CI/testing and classes that are used in production.
This will also slightly reduce the number of namespaces registered in the `vendor/autoload.php` scripts
and thus increase performance on production. At least, that's the theory.

This is not a brand new feature in composer, it has been available since the beginning of March 2014,
but it got released as part of the stable 1.0.0-alpha9 release from December 2014.
Lots of packages use this and I will try to get `laravel/framework` to do the same.
Laravel's test suite contains a lot of stub declarations in the root namespace
so it could clearly benefit from autoload-dev. But it's a big refactor to extract them all out of the test files.

This post was the third composer blog post in a row. Previously I wrote about [gitattributes](/2015/01/14/gitattributes/)
and the [--ignore-platform-reqs](/2015/01/18/composer-ignore-platform-reqs-flag/) flag.

That's all folks! Cheers.

References:

- [Composer pull request #1344](https://github.com/composer/composer/pull/1344)
- [Composer documentation on autoload-dev](https://getcomposer.org/doc/04-schema.md#autoload-dev)
- [Composer 1.0.0-alpha9 release notes](https://github.com/composer/composer/releases/tag/1.0.0-alpha9)
- [Stubs in Laravel's test files](https://github.com/laravel/framework/blob/master/tests/Container/ContainerTest.php#L504-L598)
