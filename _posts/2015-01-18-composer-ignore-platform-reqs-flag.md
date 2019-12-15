---
layout: post
date: 2015-01-18
title: "Composer ignore-platform-reqs flag"
description: "Composer's new --ignore-platform-reqs flag"
categories: "composer"
tags: php composer git
image: /assets/images/background_image.jpg
---


### Composer update without PHP environment checking

Hi there, welcome for another blog post on Composer.

Since version `1.0.0-alpha9` composer has a new option flag available on the install and update commands. I'm talking about the `--ignore-platform-reqs` flag. From the changelog:

<pre>
Added --ignore-platform-reqs to install/update commands to install even if you are missing a php extension or have an invalid php version.
</pre>

And the docs read this:

<pre>
--ignore-platform-reqs: ignore php, hhvm, lib-* and ext-* requirements and force the installation even if the local machine does not fulfill these.
</pre>

Normally when you run composer install, update, require or create-project (these will invoke update), composer will compare your installed PHP version with the PHP version limitations from your composer.json's require field and the PHP version requirements of your other dependencies. The same goes for HHVM. It will also check if some optional PHP extensions are loaded and match the required version, as well as the PHP extension requirements of the required dependencies. When the versions don't match up, composer will not install your required packagist packages.

But if you add the `--ignore-platform-reqs` option when you run `composer update`, it will gracefully ignore these restrictions.

Now, when this feature was being added, people +1'd this for the following reason: they could run composer commands from a different environment than the environment in which the application would run. This is people running `composer install` on their host machine while their application runs on their vagrant box. I don't think this solves their problem in all cases because of possible composer after scripts.

I don't have anything installed on my host system except vagrant, git and some desktop apps. So this is not the reason why I am excited about the new flag.

In my opinion this is a useful addition because you can now install dependencies on simplified test machines. Automated systems like travis-ci and scrutinizer-ci use test boxes without any, or with only a few PHP extensions installed on it. In order to get composer to install your dependencies, one needs to run bash commands as before scripts to install pear/pecl packages and maybe even modify php.ini files to load these extensions. When for example you have `mongodb/mongodb` defined as a dependency, you are required to have `"ext-mongo": "~1.6"` installed on your system. You can now use the `--ignore-platform-reqs` flag to install the MongoDB package anyway, without needing the extension. Like so, one can inject mocked MongoDB Client objects into classes and never hit the mongo extension requirement. Unless you're doing acceptance/integration testing with an actual MongoDB database server installed on the test box, this new flag might be useful to you. Your `.travis.yml` file `before_script` section will be able to be reduced to:

<script src="https://gist.github.com/hannesvdvreken/b01bcab4022852809037.js"></script>

One other case when this flag might help you is when one of your dependencies requires a higher PHP version than you. Let's say you want to run tests for PHP version 5.3 and you have some helper package as a dependency, but not for testing, which requires PHP 5.4. In that case you may also use the `--ignore-platform-reqs` flag. Be careful not to misabuse this flag, though. Minimum PHP versions are defined as they are for a reason!

Well, this was why I think this flag is very useful for package developers. Scrutinizer-ci confirmed they will use this flag in the near future when they updated their boxes with the newest composer. If you happen to know other cases where this flag is useful, leave a comment or hit me up on twitter ([@hannesvdvreken](https://twitter.com/hannesvdvreken)).

I also added this small addendum for the people who wonder how composer is able to check your PHP environment. Here's how: you're able to retrieve your PHP version using the [`phpversion`](http://php.net/manual/en/function.phpversion.php) function. This function returns the value that is stored in the `PHP_VERSION` global constant. To check if an extension is loaded one can use the [`extension_loaded`](http://php.net/manual/en/function.extension-loaded.php) function and to retrieve the extension version: `phpversion($extensionName);`. Version comparisons can be done performed using the [`version_compare`](http://php.net/manual/en/function.version-compare.php) function, although the tilde (~) and caret (^) operators that composer allows will need some more string manipulations and conditionals.

Peace Out.

References:

- Composer changelog: [https://github.com/composer/composer/releases/tag/1.0.0-alpha9](https://github.com/composer/composer/releases/tag/1.0.0-alpha9)
- ignore-platform-reqs GitHub issue: [https://github.com/composer/composer/issues/1426](https://github.com/composer/composer/issues/1426)
- ignore-platform-reqs documentation: [https://getcomposer.org/doc/03-cli.md#require](https://getcomposer.org/doc/03-cli.md#require)
- Travis: [https://travis-ci.org/](https://travis-ci.org/)
- Scrutinizer: [https://scrutinizer-ci.com/](https://scrutinizer-ci.com/)
- travis_retry [http://docs.travis-ci.com/user/build-timeouts/](http://docs.travis-ci.com/user/build-timeouts/)
