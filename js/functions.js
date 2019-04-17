/**
 * Universal Slider Light v1.0.0
 * Author: Andrii Bai, Rostislav Yakuts
 * https://github.com/andriibai/sliderUniversal.git
 */

/**
 * Slider parameter
 * @param sliderParams
 */
var sliderProto = function(sliderParams){
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
};

/**
 * Return media screen to slides
 * @return
 */
sliderProto.prototype.mediaScreenSlides = function () {
    if($(window).width() >= 992){
        return this.activeSlidesLg;
    }else if($(window).width() >= 768){
        return this.activeSlidesMd;
    }else if($(window).width() < 768 && $(window).width() >= 576){
        return this.activeSlidesSm;
    }else if($(window).width() < 576){
        return this.activeSlidesXs;
    }
};

/**
 * Counts the width of each slide item
 * arguments: slideMargin property
 * @return int
 */
sliderProto.prototype.slideWidth = function(){
    if(this.slideMargin){
        return (100/this.mediaScreenSlides()) - this.slideMargin;
    }else{
        return (100/this.mediaScreenSlides());
    }
};

/**
 * Clone slide if no full quantity to view
 */
sliderProto.prototype.cloneSlide = function(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');

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
};

/**
 * Push all items of slider in array
 */
sliderProto.prototype.slide = function(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');

    $(allSlidersItems).addClass(''+this.hiddenClass);
    this.slidesQuantity = allSlidersItems.length;
    this.arr = [];

    for(var i = 0; i < this.slidesQuantity; i++){
        this.arr.push(allSlidersItems[i]);
    }
};

/**
 * Remove active class for all slides
 */
sliderProto.prototype.removeAllActiveItems = function (){
    $('#'+this.id).find('.item').removeClass('animated '+''+this.slideEffect);
    $('#'+this.id).find('.item').removeClass(''+this.activeClass).addClass(''+this.hiddenClass).removeAttr('style');
    $('.navigation').find('.dot').removeClass(''+this.activeClass);
};


sliderProto.prototype.setSlides = function(arr){
    $(arr).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);

    if(this.slideEffect){
        $(arr).addClass('animated '+''+this.slideEffect);
    }

    if(this.slideMargin){
        $(arr).css({'width': this.slideWidth()+'%','margin-right':this.slideMargin/2+'%','margin-left':this.slideMargin/2+'%'});
    }else{
        $(arr).css({'width': this.slideWidth()+'%'});
    }
};

/**
 * Build dots if show true
 */
sliderProto.prototype.setBullets = function(){
    if(this.showBullets === true) {
        var finalQuantityOfSlides = 0;
        $('#'+this.id).append("<div class='navigation'></div>");
        var numberSlidesPortion = parseInt(this.slidesQuantity/this.mediaScreenSlides());
        var numberNotFullPortion = this.slidesQuantity - numberSlidesPortion * this.mediaScreenSlides();
        if(numberNotFullPortion){
            finalQuantityOfSlides = numberSlidesPortion + 1;
        }else{
            finalQuantityOfSlides = numberSlidesPortion;
        }
        for (var d = 0; d < finalQuantityOfSlides; d++) {
            $('.navigation').append("<div class='dot'></div>");
        }
        var allSlidersDots = $('.navigation').find('.dot');
        $(allSlidersDots[0]).addClass(''+this.activeClass);
    }
};

/**
 * Build arrows if show arrows true
 */
sliderProto.prototype.setArrows = function(){
    if(this.showArrows === true){
        $('#'+this.id).append(
            '<div class="arrows">' +
            '<span class="prev"></span>' +
            '<span class="next"></span>' +
            '</div>');
    }
};

/**
 * Set slides to first load
 */
sliderProto.prototype.setActiveSlides = function(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');
    for(var j = 0; j < this.mediaScreenSlides(); j++){
        $(allSlidersItems[j]).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);
        this.setSlides(this.arr[this.counter]);
        this.counter++;
    }
};

/**
 * Right click button
 */
sliderProto.prototype.nextArrow = function(){
    var self = this;
    var allSlidersDots = $('.navigation').find('.dot');
    var nextBtn = $('.arrows').find('.next');

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

};

/**
 * Left click button
 */
sliderProto.prototype.prevArrow = function(){
    var self = this;
    var allSlidersDots = $('.navigation').find('.dot');
    var prevBtn = $('.arrows').find('.prev');

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
};

/**
 * Functionally for auto run slider
 */
sliderProto.prototype.run = function(){
        var allSlidersDots = $('.navigation').find('.dot');
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
};

/**
 *  Functionally for touch on dots
 */
sliderProto.prototype.touchBullets = function(){
    var self = this;
    var allSlidersDots = $('.navigation').find('.dot');

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

};

/**
 *  Set auto running & stop hover of slider
 */
sliderProto.prototype.setPlayStopHover = function() {
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
};

/**
 * Init function for slider
 */
sliderProto.prototype.init = function(){
    this.cloneSlide();
    this.slide();
    this.setBullets();
    this.setArrows();
    this.setActiveSlides();
    this.nextArrow();
    this.prevArrow();
    this.touchBullets();
    this.setPlayStopHover();
};

/**
 * Parameters for user
 */
$(document).ready(function(){
    var sliderParams = {
        id: 'slider-un',
        activeSlidesLg: 4,
        activeSlidesMd: 4,
        activeSlidesSm: 2,
        activeSlidesXs: 1,
        slideTime: 2000,
        slideEffect: 'fadeIn',
        slideMargin: 2,
        autoSlide: true,
        onHoverStop: true,
        showArrows: true,
        showBullets: true,
    };

    var slider = new sliderProto(sliderParams);
    slider.init();
    //setInterval(function(){slider.run()},slider.slideTime);
});