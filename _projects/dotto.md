---
title: Dotto
tagline: A node module helping you to set up your dotfiles
github: https://github.com/felixjung/dotto
---

Dotto is a CLI tool and Node.js module for deploying your dotfiles. The idea is
to provide you with granular control over how your dotfiles are set up by
allowing you to write individual Javascript installers. Dotto will scan for
these installers, allow you to select the ones you would like to run, and
executes the selection. It also exposes some utility modules like
[shelljs](http://documentup.com/shelljs/shelljs) and
[brewmaster](http://github.com/felixjung/brewmaster) that can be very useful in
your install scripts. For more details visit the [Github
repo](https://github.com/felixjung/dotto).
