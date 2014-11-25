function processPodcast(data) {
  var iTunesResult = data.results[0]
  var htmlOutput   = '<img class = "podcast-cover" src="' + iTunesResult.artworkUrl600 + '"/>'

  document.write(htmlOutput)
}
