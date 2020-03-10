/**
 * Universal Slider Light v1.2.0
 * Author: Andrii Bai
 * Description :  using ES6
 * https://github.com/andriibai/sliderUniversal.git
 */

/**
 * Slider parameter
 * @param sliderParams
 */
class SliderUniversal{
    constructor(sliderParams) {
        this.id = sliderParams.id;
        this.activeSlidesLg = sliderParams.activeSlidesLg;
        this.activeSlidesMd = sliderParams.activeSlidesMd;
        this.activeSlidesSm = sliderParams.activeSlidesSm;
        this.activeSlidesXs = sliderParams.activeSlidesXs;
        this.slideTime = sliderParams.slideTime;
        this.slideEffect = sliderParams.slideEffect;
        this.slideMargin = sliderParams.slideMargin;
        this.autoSlide = sliderParams.autoSlide;
        this.onHoverStop = sliderParams.onHoverStop;
        this.activeArrows = sliderParams.activeArrows;
        this.showArrows = sliderParams.showArrows;
        this.showBullets = sliderParams.showBullets;
        this.hiddenClass = 'hidden';
        this.activeClass = 'active';
        this.counter = 0;
    }

/**
 * Return media screen to slides
 * @return
 */
mediaScreenSlides(){
    if($(window).width() >= 992){
        return this.activeSlidesLg;
    }else if($(window).width() >= 768){
        return this.activeSlidesMd;
    }else if($(window).width() < 768 && $(window).width() >= 576){
        return this.activeSlidesSm;
    }else if($(window).width() < 576){
        return this.activeSlidesXs;
    }
}

/**
 * Counts the width of each slide item
 * arguments: slideMargin property
 * @return int
 */
slideWidth(){
    if(this.slideMargin){
        return (100/this.mediaScreenSlides()) - this.slideMargin;
    }else{
        return (100/this.mediaScreenSlides());
    }
}

/**
 * Clone slide if no full quantity to view
 */
cloneSlide(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.slider__item');

    var m = 0;
    var imgQuantity = allSlidersItems.length % this.mediaScreenSlides();

    while (imgQuantity !==0) {
        var classAttr = allSlidersItems.attr('class');
        var imageClone = $(allSlidersItems[m]).find('img').clone();
        var imageAttr = imageClone.attr('src');
        $('#' + this.id).append('<div class="' + classAttr + '">' +
            '<img src="' + imageAttr + ' " alt />' +
            '</div>');

        allSlidersItems.length = allSlidersItems.length + 1;
        imgQuantity = allSlidersItems.length % this.mediaScreenSlides();
        m++;
    }
}

/**
 * Push all items of slider in array
 */
slide(){
    let sliderContainer = $('#'+this.id);
    let allSlidersItems = $(sliderContainer).find('.slider__item');

    $(allSlidersItems).addClass(''+this.hiddenClass);
    this.slidesQuantity = allSlidersItems.length;
    this.arr = [];

    for(let i = 0; i < this.slidesQuantity; i++){
        this.arr.push(allSlidersItems[i]);
    }
};

/**
 * Remove active class for all slides
 */
removeAllActiveItems(){
    $('#'+this.id).find('.slider__item').removeClass('animated '+''+this.slideEffect);
    $('#'+this.id).find('.slider__item').removeClass(''+this.activeClass).addClass(''+this.hiddenClass).removeAttr('style');
    $('.slider__bullets').find('.slider__dot').removeClass(''+this.activeClass);
}


setSlides(arr){
    $(arr).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);

    if(this.slideEffect){
        $(arr).addClass('animated '+''+this.slideEffect);
    }

    if(this.slideMargin){
        $(arr).css({'width': this.slideWidth()+'%','margin-right':this.slideMargin/2+'%','margin-left':this.slideMargin/2+'%'});
    }else{
        $(arr).css({'width': this.slideWidth()+'%'});
    }
}

/**
 * Build dots if show true
 */
setBullets(){
    if(this.showBullets === true) {
        var finalQuantityOfSlides = 0;
        $('#'+this.id).append("<div class='slider__bullets'></div>");
        var numberSlidesPortion = parseInt(this.slidesQuantity/this.mediaScreenSlides());
        var numberNotFullPortion = this.slidesQuantity - numberSlidesPortion * this.mediaScreenSlides();
        if(numberNotFullPortion){
            finalQuantityOfSlides = numberSlidesPortion + 1;
        }else{
            finalQuantityOfSlides = numberSlidesPortion;
        }
        for (var d = 0; d < finalQuantityOfSlides; d++) {
            $('.slider__bullets').append("<div class='slider__dot'></div>");
        }
        var allSlidersDots = $('.slider__bullets').find('.slider__dot');
        $(allSlidersDots[0]).addClass(''+this.activeClass);
    }
}

/**
 * Build arrows if show arrows true
 */
setArrows(){
    if(this.showArrows === true){
        $('#'+this.id).append(
            '<div class="slider__arrows">' +
            '<span class="slider__prev"></span>' +
            '<span class="slider__next"></span>' +
            '</div>');
    }
}

/**
 * Set slides to first load
 */
setActiveSlides(){
    let sliderContainer = $('#'+this.id);
    let allSlidersItems = $(sliderContainer).find('.slider__item');
    for(let i = 0; i < this.mediaScreenSlides(); i++){
        $(allSlidersItems[i]).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);
        this.setSlides(this.arr[this.counter]);
        this.counter++;
    }
}

/**
 * Right click button
 */
nextArrow(){
    var self = this;
    var allSlidersDots = $('.slider__bullets').find('.slider__dot');
    var nextBtn = $('.slider__arrows').find('.slider__next');

    $(nextBtn).click(function () {
        self.removeAllActiveItems();

        if(self.counter >= self.arr.length) {
            self.counter = 0;
        }

        for(var k = 0; k < self.mediaScreenSlides(); k++) {
            self.setSlides(self.arr[self.counter]);
            self.counter++;
        }

        $(allSlidersDots[self.counter/self.mediaScreenSlides() - 1]).addClass(''+self.activeClass);
        if(self.counter >= self.arr.length) {
            self.counter = 0;
        }
    });

}

/**
 * Left click button
 */
prevArrow(){
    var self = this;
    var allSlidersDots = $('.slider__bullets').find('.slider__dot');
    var prevBtn = $('.slider__arrows').find('.slider__prev');

    $(prevBtn).click(function () {
        self.removeAllActiveItems();
        var actualCounter = parseInt(self.counter);

        if(actualCounter === 0){
            self.counter = self.arr.length - (self.mediaScreenSlides()*2);
        }
        if(actualCounter < 0){
            self.counter = self.arr.length - self.mediaScreenSlides();
        }
        if(actualCounter > 0 && actualCounter > self.mediaScreenSlides()) {
            self.counter = actualCounter - (self.mediaScreenSlides() * 2);
        }
        if(actualCounter === self.mediaScreenSlides()){
            self.counter = self.arr.length - (self.mediaScreenSlides());
        }
        for(var k = 0; k < self.mediaScreenSlides(); k++){
            self.setSlides(self.arr[self.counter]);
            self.counter++;
        }
        $(allSlidersDots[self.counter/self.mediaScreenSlides() - 1]).addClass(''+self.activeClass);
        if (self.counter < 0) {
            self.counter = self.arr.length;
        }
    });
}

/**
 * Functionally for auto run slider
 */
run(){
        var allSlidersDots = $('.slider__bullets').find('.slider__dot');
        this.removeAllActiveItems();
        if(this.counter >= this.arr.length) {
            this.counter = 0;
        }
        for(var k = 0; k < this.mediaScreenSlides(); k++){
            this.setSlides(this.arr[this.counter]);
            this.counter++;
        }
        $(allSlidersDots[this.counter/this.mediaScreenSlides() - 1]).addClass(''+this.activeClass);
        if(this.counter >= this.arr.length) {
            this.counter = 0;
        }
}

/**
 *  Functionally for touch on dots
 */
touchBullets(){
    var self = this;
    var allSlidersDots = $('.slider__bullets').find('.slider__dot');

    $(allSlidersDots).click(function () {
        $(allSlidersDots).removeClass(''+self.activeClass);
        self.removeAllActiveItems();
        $(this).addClass(''+self.activeClass);
        var d = $(this).index();
        var actualDots = self.mediaScreenSlides() * d;

        for(var k = 0; k < self.mediaScreenSlides(); k++){
            self.setSlides(self.arr[actualDots]);
            actualDots++;
        }
        self.counter = actualDots;
    });

}

/**
 *  Set auto running & stop hover of slider
 */
setPlayStopHover() {
    var self = this;
    var interval;

    if(this.autoSlide === true) {
        interval = setInterval(function () {
            self.run()
        }, self.slideTime);
    }

    if (this.onHoverStop === true && this.autoSlide === true) {
        $('#' + this.id).hover(function () {
            clearInterval(interval);
        }, function () {
            interval = setInterval(function () {
                self.run()
            }, self.slideTime);
        })
    }
}

/**
 * Init function for slider
 */
init(){
    //this.cloneSlide();
    this.slide();
    //this.setBullets();
    //this.setArrows();
    this.setActiveSlides();
    //this.nextArrow();
    //this.prevArrow();
    //this.touchBullets();
    this.setPlayStopHover();
}

} /***end class SliderUniversal
/**
 * Parameters for user
 */
$(document).ready(function(){
    'use strict';
    var sliderParams = {
        id: 'slider-un',
        activeSlidesLg: 2,
        activeSlidesMd: 3,
        activeSlidesSm: 2,
        activeSlidesXs: 1,
        slideTime: 3000,
        slideEffect: 'fadeIn',
        slideMargin: 3,
        autoSlide: false,
        onHoverStop: false,
        showArrows: true,
        showBullets: true,
    };

    const slider = new SliderUniversal(sliderParams);
    slider.init();
});