$(document).ready(function() {
  const $slider = $('.slider'),
        $slider__strip = $('.slider__strip'),
        $slider__wrapper = $('.slider__wrapper'),
        $images = $('.slider__item'),
        $controls = $('<ul>'),
        controlsElements = [],
        $nextImg = $('<div></div>'),
        $prevImg = $('<div/>');

  $controls.addClass('slider__controls');
  $nextImg.addClass('slider__next');
  $prevImg.addClass('slider__prev');

  for (let i = 0; i < $images.length; i++) {
    const $control = $('<li>');

    $control
      .addClass('slider__controls-item')
      .attr('data-id', i);
    $controls.append($control);
    controlsElements.push($control);
  }

  $slider__wrapper
    .append($controls)
    .append($nextImg)
    .append($prevImg);

  $controls.on('click', '.slider__controls-item', function() {
    const $el = $(this),
          imageId = $el.attr('data-id');

    showImage(imageId);
  });

  $nextImg.on('click', () => showImage($slider.currentImageId + 1));
  $prevImg.on('click', () => showImage($slider.currentImageId - 1));

  showImage(0);

  function showImage(imageId) {
    const $prev = $('.slider__controls-item--active');

    $slider__strip.css('transform', `translateX(-${imageId*100}%)`);

    if ($prev.length) {
      $prev.removeClass('slider__controls-item--active');
    }

    $slider__strip.append($images.eq(imageId % $images.length).clone());

    $slider.currentImageId = imageId;

    controlsElements[imageId % $images.length].addClass('slider__controls-item--active');
  }
});
