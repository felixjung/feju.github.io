---
layout: post
title: Atom for a Vim User
category: Geekery
tags: development vim atom
---
Over the past year, I've made [Vim](http://www.vim.org) my text editor of choice. It was a steep learning curve, but by now I have a fully tricked out ``.vimrc`` and feel right at home. Still, I never got over the fact that Vim does not have a nice modern GUI and is limited by things like its low interaction capabilities with asynchronous sub-processes. Hence, I'm still on the hunt for the perfect text editor. Recently, I've regained interest in [Atom](http://atom.io), the text editor by the good people at [Github](http://github.com). It's come along nicely and a large ecosystem of packages has developed since the first beta was released in February, 2014. Here's a brief discussion on how to make Atom more like Vim.<!--more-->

##### Making Atom more like my Vim
As any Vim user [will know][vimproblem], once you get used to Vim, you can no longer work with a [non-modal interface][modal]. I was happy to find that there is a [Vim Mode](https://github.com/atom/vim-mode) package for Atom, replicating Vim's modal interface. It works just like you'd expect and makes using Atom much nicer for a Vim user. The package is far from perfect, but it's a start. One of my favorite plugins for Vim is [YouCompleteMe](https://github.com/Valloric/YouCompleteMe) (YCM) by @Valloric. Atom includes an autocomplete package by default, which can be extended to offer language-specific completions via language packages. Additionally, you may install the [Autocomplete Plus](https://atom.io/packages/autocomplete-plus) package, which will automatically trigger the completion menu whenever completions are available[^1]. In other words, with atocomplete-plus you get functionality very similar to Vim's YCM in Atom.

##### Pre-wedding jitters
In Vim I've bound ``jj`` to ``esc`` in insert-mode. For some reason unknown to me, this ``jj`` mapping immediately takes me to command-mode. Regular ``esc`` behaviour with YCM installed is to close any open completion menu. A second press of ``esc`` is required to get into command-mode. Personally, I prefer getting right into command-mode. The completion menu automatically disappears, if I continue typing. Unfortunately, the default experience of using Vim Mode and Autocomplete Plus is equivalent to the default Vim + YCM behaviour.

##### Holy matrimony
Obviously, I would like to get my ``jj`` Vim behavior back. Adding the following two lines of code to Atom's ``keymap.cson`` configuration file will do the job for you.

{% highlight js linenos=table %}
'.autocomplete-plus input.hidden-input':
  'escape': 'vim-mode:activate-command-mode'
{% endhighlight %}

##### Until death do us part?
I'm curious to see what the future holds for Atom. I still switch back to Vim on a regular basis. But maybe this will change soon. I'll definitely write about my progress. If you're like me and obsess about finding the perfect text editor, you might also be interested in [Neovim](http://neovim.org); an attempt to bring Vim to the 21st century and expose all of its capabilities through modern APIs with full support for asynchronous sub-processes. Eventually, this will allow for modern OS specific GUIs to Vim; think a nice Mac OS X text editor like Textmate or an IDE like Xcode having Vim running underneath.

[^1]: Without autocomplete-plus you have to press ``ctrl space`` to trigger the completion menu.
[vimproblem]: http://haldean.org/vim-problems/ "Haldean Brown - The problem with Vim"
[modal]: http://unix.stackexchange.com/questions/57705/modeless-vs-modal-editors
