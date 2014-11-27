function processPodcast(data) {
  var iTunesResult = data.results[0]
  var htmlOutput   = ['<div class="podcast">',
    '  <a href="' + iTunesResult.collectionViewUrl + '" target="_blank">',
    '    <img class = "podcast-cover" src="' + iTunesResult.artworkUrl600 + '"/>',
    '  </a>',
    '</div>'
  ]

  document.write(htmlOutput.join('\n'))
}
