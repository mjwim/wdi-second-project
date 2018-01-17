$(init);

function init() {
  getGiphys();

  const $wineNext = $('#wine-next');
  $wineNext.click(function() {
    const $wineActive = $('.carousel-item.wine.active');
    const currentWineId = $wineActive[0].innerText;
    console.log('Current wine', currentWineId);
  });
}



function getGiphys() {
  $
    .get('https://api.giphy.com/v1/gifs/search?api_key=7Gvmzou9a3EEDjPUPrff9jNSnQiLnauz&q=wine&limit=1&offset=0&rating=G&lang=en')
    .done(data => {
      $.each(data.data, (index, giphy) => addGiphy(giphy));
    });
}

function addGiphy(giphy) {
  $('main').append(`<img src="${giphy.images.downsized.url}">`);
}
