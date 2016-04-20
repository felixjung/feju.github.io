---
layout: post
title: Introducing Dotto
subtitle: Your friendly helper for setting up dotfiles
category: Geekery
tags: node dotfiles
---

Most developers have a collection of configuration files for their favorite
tools. These files, called dotfiles because their names are typically preceeded
by a `.`, are often managed via git repositories with bash scripts or entire
frameworks for installing dotfiles on new environments. Github has an entire
[webpage dedicated](https://dotfiles.github.io) to these kinds of projects.

I started creating and maintaining my own dotfiles repository long before
becoming a web developer. Mostly, I relied on other people's bash scripts for
doing things like installing homebrew packages or creating symlinks.[^holman]

At some point I got the feeling my dotfiles were getting more and more
complicated in terms of dependencies and I felt the need for getting more
control over the bash scripts responsible for setting up my environment. The
problem was [I really suck at
bash](https://developer.atlassian.com/blog/2015/11/scripting-with-node/). Given
that I feel quite comfortable writing Javascript these days, I decided to write
a Node.js dotfiles helper that gives me back control over how my dotfiles are
set up -- Dotto was born.

Dotto is a combination of a CLI tool and a Node.js module, exposing other
modules and helper functions for installing dotfiles. If this sounds like your
type of thing, check out the [repository on
Github](https://github.com/felixjung/dotto).

I haven't used Dotto yet, outside of some limited testing. I also haven't
written any unit tests at this point. So if you try it, things could get a
little bumpy. Feel free to send me a pull request.

[^holman]: I took a lot of code and ideas from [Zach Holman's](https://github.com/holman/dotfiles) dotfiles.
