---
layout: post
date: 2015-05-08
title: "How clean is your code? How clean are your diffs?"
description: "Some tips on how to keep your diffs clean by choosing the right code style options."
categories: "code-style"
tags: php-cs-fixer php cs whitespace
---

**Note:** this is a repost from my post on the [madewithlove blog](http://blog.madewithlove.be/post/code-style-options-for-cleaner-diffs/).

[My previous blog post](http://blog.madewithlove.be/post/legacy-code-style-fixing/) covered tips on code style fixing while working on legacy projects. The blog post was very generic and the ideas are applicable on projects in any language. I mentioned some tips that help your peer developers review your pull requests. What I didn't mention are code style standards and code style details.

In this blog post I would like to share some thoughts on code style details for cleaner diffs.

### Diffs

Cleaner diffs make it easier for your peer developers to review code changes. When your peers don't get distracted by awkward diff lines you can expect a more thoughtful review, less overlooked bugs, and more honest feedback. Here are a couple of code style tips that allow for cleaner diffs.

#### Tip 1: Add as many trailing commas as possible!

When you're appending new lines to a list, you might need to add a comma to the previous last item in order
to comply with the syntax. Some languages allow to append a comma to the last line without throwing syntax errors.

This first example has a clean diff when you're appending a new item to the array initialisation:
<script src="https://gist.github.com/hannesvdvreken/6ceaf8b553af057d8950.js"></script>
[watch the clean diffs](https://gist.github.com/hannesvdvreken/6ceaf8b553af057d8950/revisions)

This second example is less clean:
<script src="https://gist.github.com/hannesvdvreken/cadc3d8d6ff72e848dea.js"></script>
[watch the harder diffs](https://gist.github.com/hannesvdvreken/cadc3d8d6ff72e848dea/revisions)

Is it not possible to add a comma to the last item of a block/array/... because of syntax limitations?
You can sometimes avoid appending to the back of the list by ordering the list items. That way you'll mostly insert items in the middle and not at the end.
Are you a Composer user? It's actually a bad practise to touch your `composer.json` file.

<blockquote class="twitter-tweet"></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Therefore, use a special flag to have Composer sort your items for you: `composer require monolog/monolog --sort-packages`.

#### Tip 2: Don't align assignments

Don't align things like consecutive assignments (aligning equal signs) or list definitions (aligning arrows or semicolons). When the longest line changes in length, or when a new longer line is added, you will need to adjust the other lines by adding or removing spaces, resulting in larger diffs. If you didn't align them, it's more clear on what has been changed or added.

- Consecutive variable assignments:

<script src="https://gist.github.com/hannesvdvreken/f8c54e469c8d663c4893.js"></script>
[watch the clean diffs](https://gist.github.com/hannesvdvreken/f8c54e469c8d663c4893/revisions)
<script src="https://gist.github.com/hannesvdvreken/abc21707ff86707131f7.js"></script>
[watch the harder diffs](https://gist.github.com/hannesvdvreken/abc21707ff86707131f7/revisions)

- List/array assignments:

<script src="https://gist.github.com/hannesvdvreken/c5ff31f02dc5aba2b3ee.js"></script>
[watch the clean diffs](https://gist.github.com/hannesvdvreken/c5ff31f02dc5aba2b3ee/revisions)
<script src="https://gist.github.com/hannesvdvreken/62db1c762cf969da5344.js"></script>
[watch the harder diffs](https://gist.github.com/hannesvdvreken/62db1c762cf969da5344/revisions)

This is just a suggestion, though. People like to align assignments for various reasons. Because it's pretty, or because it's visually easier to scan a file. If you like the benefits of aligning over the downside of the heavier diffs, go ahead: align.

#### Tip 3: use as many braces as possible

It's sometimes possible to leave off certain braces. For example: calling a constructor in PHP when passing zero arguments is possible without braces `$client = new GuzzleHttp\Client;` but when you need to change that and need to pass one or more arguments to the constructor, you'll still need to add the braces. You might notice I'm nitpicking here, this doesn't actually result in super ugly diffs. But what about when you delete the last argument of a constructor? Do you delete the braces from every existing constructor call? If not, you'll end up with inconsistent notation.

Often language syntax allows you to use control structures (if, for, while, ...) without braces as well: they just use the single next line as the code block to execute conditionally, if no braces are used. Apart from the risk of bugs this also results in [harder diffs](https://gist.github.com/hannesvdvreken/e87a2a73b5d3df49d572/revisions) when you add lines, or inconsistencies when you remove lines but don't remove the braces.

#### Tip 4: have clear rules on whitespace

Have your editor and code style tool be clear on whitespace: where to have how many invisible characters (spaces, tabs, new lines). EditorConfig is an editor independent config file that can help you with that. In PHP we like to remove trailing whitespace at the end of a line, and empty lines must be completely empty. We also like to have a single empty line at the end of every `.php` file.

When a diff contains whitespace changes one can often ignore those lines. Use `git diff -bw` (short for `git diff --ignore-space-change --ignore-all-space`) or add `?w=0` in the address bar when viewing a diff on GitHub.

### PHP CS fixer

At [madewithlove](http://mwl.be) we like to follow industry standards. This includes code style standards.
For PHP that means PSR-2, and the stricter [Symfony coding standards](http://symfony.com/doc/current/contributing/code/standards.html).

The tool we use most for automated code style fixing
is [php-cs-fixer](http://cs.sensiolabs.org/), currently maintained by the GitHub organisation [FriendsOfPHP](https://github.com/FriendsOfPHP).

The php-cs-fixer tool has some options to guard some of the tips mentioned in this post previously.

* The `multiline_array_trailing_comma` fixer can be used to append commas everywhere, but is never enabled by default.
* The `new_with_braces` fixer is not enabled on the PSR-2 level, but it is on the Symfony level.
* The `phpdoc_params` is included in the Symfony level, it aligns docblock items so I like to disable it instead.
* The `align_double_arrow` and `align_equals` options are available, but I rather leave them off.

Of course, these aren't golden rules. I just have my reasons to enable or disable them. Define the rules you like for your projects and make sure to run the code style fixer regularly. For example before every commit, when your code base already adheres to all those rules, or after every commit on the files that have been changes, to slowly move to a cleaner code base.

Happy CS fixing!
