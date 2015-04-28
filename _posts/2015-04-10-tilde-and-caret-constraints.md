---
layout: post
date: 2015-04-13
title: "Tilde and caret version constraints in Composer"
description: "Running my very first marathon, the whole story"
categories: "composer"
tags: php composer semver
---

**Note:** this is a repost from my post on the [madewithlove blog](http://blog.madewithlove.be/post/tilde-and-caret-constraints/).

When installing a dependency we are used to install a version that adheres to a
known public interface and does what it promises. That way we can safely use it in our code.

A dependency that uses semantic versioning allows you to predict wether it is still going to work or not
when you upgrade it to a new version. Basically when the `x` in a `x.y.z` version number changes,
you might need to do some changes to be able to work with this new version without problems.
When dealing with a `0.y.z` version this is slightly different: when the first non-zero number (`y`) changes,
backwards compatibility is not guaranteed. If you're not familiar with semver:
head over to the [specs](http://semver.org/)!

A dependency can change without breaking backwards compatibility. A new release will then have a
greater version number (x.y), depending on the type of change (bugfix or added functionality).
When you depend on packages you might want to define a range of versions that are OK to install,
rather than having a locked down version specified. This allows you to receive fixes
(that includes security fixes) from external code for free with a simple update command.

Depending on your dependency manager you can define version contraints using wildcards (`*`), comparators like `<=`,
logical operators (`,` often means AND and `|` means OR), etc... Using logical operators you can mix and match
different version constraints to build even more complex ones. For example `>=0.9.0,<0.11.0`
means everything that matches `0.9.*` and `0.10.*`, but can also be noted as `0.9.* || 0.10.*`.

There are also some syntactic sugar operators like `~` (tilde) and `^` (caret).

- [`~4.1.3`](http://semver.mwl.be/#?package=laravel%2Fframework&version=~4.2.3) means `>=4.1.3,<4.2.0`,
- [`~4.1`](http://semver.mwl.be/#?package=laravel%2Fframework&version=~4.2) means `>=4.1.0,<5.0.0` (most used),
- [`~0.4`](http://semver.mwl.be/#?package=league%2Fflysystem&version=~0.4) means `>=0.4.0,<1.0.0`,
- [`~4`](http://semver.mwl.be/#?package=laravel%2Fframework&version=~4.2.3) means `>=4.0.0,<5.0.0`.

The caret sign is slightly different:

- [`^4.1.3`](http://semver.mwl.be/#?package=laravel%2Fframework&version=%5E4.1.3) (most used) means `>=4.1.3,<5.0.0`,
- [`^4.1`](http://semver.mwl.be/#?package=laravel%2Fframework&version=%5E4.1) means `>=4.1.0,<5.0.0`, same as `~4.1` but:
- [`^0.4`](http://semver.mwl.be/#?package=league%2Fflysystem&version=%5E0.4) means `>=0.4.0,<0.5.0`, this is different from `~0.4` and is more useful for defining backwards compatible version ranges.
- [`^4`](http://semver.mwl.be/#?package=laravel%2Fframework&version=%5E4) means `>=4.0.0,<5.0.0` which is the same as `~4` and `4.*`.

Basically use the caret sign to exclude early releases which contain known threats. For example if you need
a dependency which has functionality which got introduced in `2.1.x` and version `2.1.1` fixes a bug which
was shipped with the `2.1.0` release. If that bug affected you or when it's a security bug,
you will be able to exclude all earlier versions with
[`^2.1.1`](http://semver.mwl.be/#?package=league%2Fevent&version=%5E2.1.1).
This way you can still benefit from all new backward compatible releases.

Fun fact: `caret` is Latin for "it lacks", so you can remember this as "it (this version range) lacks
some early releases but it's backwards compatible up to the next major release".

For now when you run the command `composer require monolog/monolog` it will still save `~1.13`
(at the time of writing) as the default version constraint in your composer.json file and not `^1.13.1`.
This is to protect users who might not have updated their Composer to a version which can handle
caret `^` constraints. Expect this to change in the coming weeks or months.

In case you didn't notice yet, the links behind all these version constraints point to
[semver.mwl.be](http://semver.mwl.be). We created this tool after [Maxime](https://twitter.com/anahkiasen)
posted a link to [semver.npmjs.com](http://semver.npmjs.com/) in our [madewithlove](http://mwl.be) slack channel.

I won't go into stability as it is out of the scope of this blog post, but I suggest you play around with
[our tool](http://semver.mwl.be/#?package=symfony%2Fsymfony&version=~2.4&minimum-stability=RC)
to see the effect of selecting `stable`, `RC`, `beta`, `alpha` or `dev`.

Cheers!
