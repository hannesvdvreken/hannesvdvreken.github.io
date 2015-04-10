---
layout: default
modal-id: 2015-04-09
title: Work-in-progress Pull Requests
date: 2015-04-09
alt: Work-in-progress Pull Requests
project-date: April 2015
description: The benefits of Work-in-progress Pull Requests
---

A while ago I saw a discussion on Twitter on when to open a pull request,
when you're done creating the changes, or when you start working on something?
The latter is the preferred option, in my opinion.

Crafting a PR is possible from the moment you do a first commit on a new branch. You can start with a "[boyscouting](http://jason.pureconcepts.net/2015/01/are-you-a-boy-scout/)"
commit which only moves some code around but doesn't change any functionality. When you create
a work-in-progress PR make sure to tag it with a WIP label or prepend `[WIP]` to the title.

WIP pull requests have several benefits:

- The description can be kept up to date with a changelog right from the start. You can keep documenting changes, needed changes for users of the public interface, ...
- Allows peer developers to advice early if a developer is spending time on something that will most probably not be merged.
- Allows peer developers to take a quick look to see if a feature implementation isn't getting overcomplicated. Feature requirements aren't always clear and could sometimes be translated into something much simpler. This could prevent spending a whole week while it could be done in a few hours.
- When you are pushing a couple of code cleaning commits first, peers know they don't need to review just yet.
- Building a clear timeline on the evolution of this branch. Who did what, who reviewed when, who was assigned, what states did it go through (from `WIP` to `in review` etc), what extra changes have been made, ...

When not to open a WIP pull request?
When the project you are working on is a public project and the feature you are building is top secret,
you might want to postpone pushing your branch. Also a PR for an open source project can start a long discussion
between community members before you even finished your work. In these kind of situations it is perfectly normal
to keep your branch local for the time you're working on it.

At [madewithlove](http://mwl.be) we definitely like this approach of opening WIP pull requests.
It gives all these benefits to peer developers. For project managers this gives the ability to track
progress, next to what they can see on [huboard](https://huboard.com) or [zenhub](https://www.zenhub.io/).

Cheers!
