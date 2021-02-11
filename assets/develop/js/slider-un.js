/**
 * Universal Slider Light v1.2.0
 * Author: Andrii Bai
 * Description :  SimpleSlider
 * https://github.com/andriibai/sliderUniversal.git
 */

/**
 * Slider parameter
 * @param sliderParams
 */

class SliderUniversal {
  constructor (params) {
    this.id = params.id
    this.activeSlidesLg = params.activeSlidesLg
    this.activeSlidesMd = params.activeSlidesMd
    this.activeSlidesSm = params.activeSlidesSm
    this.activeSlidesXs = params.activeSlidesXs
    this.slideTime = params.slideTime
    this.slideEffect = params.slideEffect
    this.slideMargin = params.slideMargin
    this.slideHeight = params.slideHeight
    this.autoSlide = params.autoSlide
    this.onHoverStop = params.onHoverStop
    this.activeArrows = params.activeArrows
    this.showArrows = params.showArrows
    this.showBullets = params.showBullets
    this.hiddenClass = 'hidden'
    this.activeClass = 'active'
    this.counter = 0
  }

  /**
   * Return media screen to slides
   * @return
   */
  mediaScreenSlides () {
    if ($(window).width() >= 992) {
      return this.activeSlidesLg
    } else if ($(window).width() >= 768) {
      return this.activeSlidesMd
    } else if ($(window).width() < 768 && $(window).width() >= 576) {
      return this.activeSlidesSm
    } else if ($(window).width() < 576) {
      return this.activeSlidesXs
    }
  }

  /**
   * Counts the width of each slide item
   * arguments: slideMargin property
   * @return int
   */
  slideWidth () {
    if (this.slideMargin) {
      return (100 / this.mediaScreenSlides()) - this.slideMargin
    } else {
      return (100 / this.mediaScreenSlides())
    }
  }

  /**
   * Clone slide if no full quantity to view
   */
  cloneSlide () {
    let sliderContainer = $('#' + this.id)
    let allSlidersItems = $(sliderContainer).find('.slider__item')

    let m = 0
    let imgQuantity = allSlidersItems.length % this.mediaScreenSlides()

    while (imgQuantity !== 0) {
      let classAttr = allSlidersItems.attr('class')
      let imageClone = $(allSlidersItems[m]).find('img').clone()
      let imageAttr = imageClone.attr('src')
      $('#' + this.id).append('<div class="' + classAttr + '">' +
        '<img class="slider__img" src="' + imageAttr + ' " alt />' +
        '</div>')

      allSlidersItems.length = allSlidersItems.length + 1
      imgQuantity = allSlidersItems.length % this.mediaScreenSlides()
      m++
    }
  }

  /**
   * Push all items of slider in array
   */
  slide () {
    let sliderContainer = $('#' + this.id)
    let allSlidersItems = $(sliderContainer).find('.slider__item')

    $(allSlidersItems).addClass('' + this.hiddenClass)
    this.slidesQuantity = allSlidersItems.length
    this.arr = []

    for (let i = 0; i < this.slidesQuantity; i++) {
      this.arr.push(allSlidersItems[i])
    }
  };

  /**
   * Remove active class for all slides
   */
  removeAllActiveItems () {
    $('#' + this.id).find('.slider__item').removeClass('animated ' + '' + this.slideEffect)
    $('#' + this.id).find('.slider__item').removeClass('' + this.activeClass).addClass('' + this.hiddenClass).removeAttr('style')
    $('.slider__bullets').find('.slider__dot').removeClass('' + this.activeClass)
  }

  setSlides (arr) {
    $(arr).addClass('' + this.activeClass).removeClass('' + this.hiddenClass)

    if (this.slideEffect) {
      $(arr).addClass('animate__animated ' + '' + this.slideEffect)
    }

    if (this.slideMargin) {
      $(arr).css({
        'width': this.slideWidth() + '%',
        'margin-right': this.slideMargin / 2 + '%',
        'margin-left': this.slideMargin / 2 + '%'
      })
    } else {
      $(arr).css({ 'width': this.slideWidth() + '%' })
    }

    if (this.slideHeight) {
      $(arr).css({ 'height': this.slideHeight + 'px' })
    }
  }

  /**
   * Build dots if show true
   */
  setBullets () {
    if (this.showBullets === true) {
      let finalQuantityOfSlides = 0
      $('#' + this.id).append('<div class="slider__bullets"></div>')
      let numberSlidesPortion = parseInt(this.slidesQuantity / this.mediaScreenSlides())
      let numberNotFullPortion = this.slidesQuantity - numberSlidesPortion * this.mediaScreenSlides()
      if (numberNotFullPortion) {
        finalQuantityOfSlides = numberSlidesPortion + 1
      } else {
        finalQuantityOfSlides = numberSlidesPortion
      }
      for (let d = 0; d < finalQuantityOfSlides; d++) {
        $('.slider__bullets').append('<div class="slider__dot"></div>')
      }
      let allSlidersDots = $('.slider__bullets').find('.slider__dot')
      $(allSlidersDots[0]).addClass('' + this.activeClass)
    }
  }

  /**
   * Build arrows if show arrows true
   */
  setArrows () {
    if (this.showArrows === true) {
      $('#' + this.id).append(
        '<div class="slider__arrows">' +
        '<span class="slider__prev"></span>' +
        '<span class="slider__next"></span>' +
        '</div>')
    }
  }

  /**
   * Set slides to first load
   */
  setActiveSlides () {
    let sliderContainer = $('#' + this.id)
    let allSlidersItems = $(sliderContainer).find('.slider__item')
    for (let i = 0; i < this.mediaScreenSlides(); i++) {
      $(allSlidersItems[i]).addClass('' + this.activeClass).removeClass('' + this.hiddenClass)
      this.setSlides(this.arr[this.counter])
      this.counter++
    }
  }

  /**
   * Right click button
   */
  nextArrow () {
    let self = this
    let allSlidersDots = $('.slider__bullets').find('.slider__dot')
    let nextBtn = $('.slider__arrows').find('.slider__next')

    $(nextBtn).click(function () {
      self.removeAllActiveItems()

      if (self.counter >= self.arr.length) {
        self.counter = 0
      }

      for (let k = 0; k < self.mediaScreenSlides(); k++) {
        self.setSlides(self.arr[self.counter])
        self.counter++
      }

      $(allSlidersDots[self.counter / self.mediaScreenSlides() - 1]).addClass('' + self.activeClass)
      if (self.counter >= self.arr.length) {
        self.counter = 0
      }
    })

  }

  /**
   * Left click button
   */
  prevArrow () {
    let self = this
    let allSlidersDots = $('.slider__bullets').find('.slider__dot')
    let prevBtn = $('.slider__arrows').find('.slider__prev')

    $(prevBtn).click(function () {
      self.removeAllActiveItems()
      let actualCounter = parseInt(self.counter)

      if (actualCounter === 0) {
        self.counter = self.arr.length - (self.mediaScreenSlides() * 2)
      }
      if (actualCounter < 0) {
        self.counter = self.arr.length - self.mediaScreenSlides()
      }
      if (actualCounter > 0 && actualCounter > self.mediaScreenSlides()) {
        self.counter = actualCounter - (self.mediaScreenSlides() * 2)
      }
      if (actualCounter === self.mediaScreenSlides()) {
        self.counter = self.arr.length - (self.mediaScreenSlides())
      }
      for (let k = 0; k < self.mediaScreenSlides(); k++) {
        self.setSlides(self.arr[self.counter])
        self.counter++
      }
      $(allSlidersDots[self.counter / self.mediaScreenSlides() - 1]).addClass('' + self.activeClass)
      if (self.counter < 0) {
        self.counter = self.arr.length
      }
    })
  }

  /**
   * Functionally for auto run slider
   */
  run () {
    let allSlidersDots = $('.slider__bullets').find('.slider__dot')

    this.removeAllActiveItems()
    if (this.counter >= this.arr.length) {
      this.counter = 0
    }

    for (let k = 0; k < this.mediaScreenSlides(); k++) {
      this.setSlides(this.arr[this.counter])
      this.counter++
    }

    $(allSlidersDots[this.counter / this.mediaScreenSlides() - 1]).addClass('' + this.activeClass)
    if (this.counter >= this.arr.length) {
      this.counter = 0
    }
  }

  /**
   *  Functionally for touch on dots
   */
  touchBullets () {
    let self = this
    let allSlidersDots = $('.slider__bullets').find('.slider__dot')

    $(allSlidersDots).click(function () {
      $(allSlidersDots).removeClass('' + self.activeClass)
      self.removeAllActiveItems()
      $(this).addClass('' + self.activeClass)
      let d = $(this).index()
      let actualDots = self.mediaScreenSlides() * d

      for (let k = 0; k < self.mediaScreenSlides(); k++) {
        self.setSlides(self.arr[actualDots])
        actualDots++
      }
      self.counter = actualDots
    })

  }

  /**
   *  Set auto running & stop hover of slider
   */
  setPlayStopHover () {
    let self = this
    let interval

    if (this.autoSlide === true) {
      interval = setInterval(function () {
        self.run()
      }, self.slideTime)
    }

    if (this.onHoverStop === true && this.autoSlide === true) {
      $('#' + this.id).hover(function () {
        clearInterval(interval)
      }, function () {
        interval = setInterval(function () {
          self.run()
        }, self.slideTime)
      })
    }
  }

  /**
   * Init function for slider
   */
  init () {
    this.cloneSlide()
    this.slide()
    this.setBullets()
    this.setArrows()
    this.setActiveSlides()
    this.nextArrow()
    this.prevArrow()
    this.touchBullets()
    this.setPlayStopHover()
  }

}

/***end class SliderUniversal

 /**
 * Parameters for user
 */
$(document).ready(function () {
  'use strict'
  let params = {
    id: 'slider-un',
    activeSlidesLg: 1,
    activeSlidesMd: 2,
    activeSlidesSm: 2,
    activeSlidesXs: 1,
    slideTime: 3000,
    slideEffect: 'animate__pulse',
    slideMargin: 3,
    slideHeight: 250,
    autoSlide: false,
    onHoverStop: true,
    showArrows: true,
    showBullets: true,
  }

  const slider = new SliderUniversal(params)
  slider.init()
})