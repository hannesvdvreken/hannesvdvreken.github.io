---
layout: post
title:  "Improving code style when working on a legacy code base"
description: "Some tips and pitfalls on code style changes in legacy projects."
date: 2015-05-27
categories: ["code-style", "legacy"]
tags: code-style legacy
---

**Note:** this is a repost from my post on the [madewithlove blog](http://blog.madewithlove.be/post/legacy-code-style-fixing/).

### Legacy projects

Old projects (maybe even 6 months or less) often come without test suites,
are tightly coupled with an outdated version of a framework (if not: has lots of boilerplate code),
and are written without consistency in code style.

When working on such a project, it's tempting to start moving brackets around,
replacing old syntax style with newer language version syntax,
and renaming variables/classes/functions. Especially when you're refactoring or adding a feature.

With this blog post I wanted to share some tips and pitfalls on code style changes in legacy projects.

### Code style

First of all: fixing code style isn't necessarily a bad thing.
Code style makes code more readable, less personal, and more uniform.
As long as there is some kind of agreement that you will be working on this project for at least the next few months,
your future self and colleagues might benefit from a better code style.

### How to improve code style

* Do not change code style in files or functions when you're not required to change the code at all. This confuses your peer developers that need to review your changes.
* Feel free to adjust docblocks if they are missing or plain wrong and add documentation where needed.
* When you're about to adjust a method, always –always– commit code style changes separately from code changes, even if the changed code produces the exact same output and behaves exactly the same. Peer developers that need to review your code can review your pull requests without having to investigate what has changed, and what is just an adjustment of code style. They can review individual commits and ignore commits with "CS" in the commit message.

### CS fixing tools

You might be tempted to use an automated tool to reformat an entire file, or even your entire code base.
Here's why that's not a good idea:

* You lose all line history. Imagine backtracking why a certain line has been changed in the past when every line has been changed in the same commit, maybe just because of a tabs to spaces conversion.
* All existing open pull request will need to be updated to base off of the newly formatted code

It is a good idea to setup a CS fixer for newly created files though.
You can gradually build up a namespace full of new
classes that adhere to a certain code style standard and have it backed by an automated tool.

While refactoring you can slim down existing classes and functions and inject new, well tested dependencies.
That way you can slowly move away from the legacy code that's still badly formatted.

If you do want to reformat an entire directory of code, despite my advise,
make sure to have as few branches and open pull requests as possible. Ideally: no pull request and only one branch.
Then do a single commit where you only reformat the code, nothing else. Push it, and done!

Happy CS fixing!
