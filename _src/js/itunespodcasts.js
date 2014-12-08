function processPodcast(data) {
  var targetDiv    = $('#podcasts').children().children();
  var iTunesResult = data.results[0];
  var htmlOutput   = ['<div class="podcast">',
    '  <a href="' + iTunesResult.collectionViewUrl + '" target="_blank">',
    '    <img class = "podcast-cover" src="' + iTunesResult.artworkUrl600 + '"/>',
    '  </a>',
    '</div>'
  ];

  targetDiv.append(htmlOutput.join('\n'));
};

$(document).ready(function() {
  // Search terms
  var apiCalls = [
    'https://itunes.apple.com/search?term=accidental+tech+podcast&entity=podcast&callback=?',
    'https://itunes.apple.com/search?term=the+talk+show+gruber&artist=gruber&entity=podcast&callback=?',
    'https://itunes.apple.com/search?term=debug+ritchie+guy+english&entity=podcast&callback=?',
    'https://itunes.apple.com/search?term=freak+show+metaebene&entity=podcast&callback=?',
    'https://itunes.apple.com/search?term=the+record+brent+simmons&entity=podcast&callback=?',
    'https://itunes.apple.com/search?term=iterate+ritchie+edwards&entity=podcast&callback=?',
    'https://itunes.apple.com/search?term=core+intuition+manton&entity=podcast&callback=?'
  ];

  apiCalls.forEach(function(apiCall) {
    $.getJSON(apiCall, processPodcast);
  });
});
