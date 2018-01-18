$(init);

function init() {
  getGiphys();

  const $wineNext = $('#wine-next');
  $wineNext.click(function() {
    const $wineActive = $('.carousel-item.wine.active');
    console.log($wineActive);
    const currentWineId = $wineActive[0].textContent;
    const currentWineIdSplit = currentWineId.split(' ');
    const newArray = cleanArray(currentWineIdSplit);
    const nextWine = newArray[3];
    const $selectedWine = $('#wine');
    $selectedWine[0].innerHTML = `<option value=${nextWine}> ${nextWine} </option>`;
  });

  const $cheeseNext = $('#cheese-next');
  $cheeseNext.click(function() {
    const $cheeseActive = $('.carousel-item.cheese.active');
    const currentCheeseId = $cheeseActive[0].textContent;
    const currentCheeseIdSplit = currentCheeseId.split(' ');
    const newArray = cleanArray(currentCheeseIdSplit);
    const nextCheese = newArray[3];
    const $selectedCheese = $('#cheese');
    $selectedCheese[0].innerHTML = `<option value=${nextCheese}> ${nextCheese} </option>`;
  });

  const $winePre = $('#wine-pre');
  $winePre.click(function() {
    const $wineActive = $('.carousel-item.wine.active');
    const currentWineId = $wineActive[0].textContent;
    const currentWineIdSplit = currentWineId.split(' ');
    const newArray = cleanArray(currentWineIdSplit);
    const preWine = newArray[4];
    const $selectedWine = $('#wine');
    $selectedWine[0].innerHTML = `<option value=${preWine}> ${preWine} </option>`;
  });

  const $cheesePre = $('#cheese-pre');
  $cheesePre.click(function() {
    const $cheeseActive = $('.carousel-item.cheese.active');
    const currentCheeseId = $cheeseActive[0].textContent;
    const currentCheeseIdSplit = currentCheeseId.split(' ');
    const newArray = cleanArray(currentCheeseIdSplit);
    const preCheese = newArray[4];
    const $selectedCheese = $('#cheese');
    $selectedCheese[0].innerHTML = `<option value=${preCheese}> ${preCheese} </option>`;
  });
}



function getGiphys() {
  $
    .get('https://api.giphy.com/v1/gifs/random?api_key=7Gvmzou9a3EEDjPUPrff9jNSnQiLnauz&tag=wine&rating=G')
    .done((data) => {
      addGiphy(data);
    });
}

function addGiphy(giphy) {
  $('.giphy-lol').append(`<img src="${giphy.data.image_original_url}">`);
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
