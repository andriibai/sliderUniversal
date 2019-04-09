
var sliderProto = function(sliderParams){
    this.id = sliderParams.id;
    this.activeSlidesL = sliderParams.activeSlidesL;
    this.activeSlidesM = sliderParams.activeSlidesM;
    this.activeSlidesS = sliderParams.activeSlidesS;
    this.activeSlidesXS = sliderParams.activeSlidesXS;
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
    this.step = sliderParams.step;
    this.counter = 0;
};

/**
 * Counts the width of each slide item
 * arguments: slideMargin property
 * @return int
 */
sliderProto.prototype.slideWidth = function(){
    if(this.slideMargin){
        if($(window).width() > 991){
            return (100/this.activeSlidesL) - this.slideMargin;
        }else{
            return 0;
        }
    }else{
        if($(window).width() > 991){
            return (100/this.activeSlidesL);
        }else{
            return 0;
        }
    }
};

/**
 *	Push all items of slider in array
 */
sliderProto.prototype.slide = function(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');
    $(allSlidersItems).addClass(''+this.hiddenClass);
    this.slidesQuantity = allSlidersItems.length;
    this.arr = [];
    if($(window).width() > 991){
        for(var i = 0; i < this.slidesQuantity; i++){
            this.arr.push(allSlidersItems[i]);
        }
    }
};

sliderProto.prototype.removeAllActiveItems = function (){
    $('#'+this.id).find('.item').removeClass(''+this.activeClass).addClass(''+this.hiddenClass).removeAttr('style');
    $('.navigation').find('.dot').removeClass(''+this.activeClass);
};

sliderProto.prototype.setSlides = function(arr){
    $(arr).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);
    if(this.slideMargin){
        $(arr).css({'width': this.slideWidth()+'%','margin-right':this.slideMargin/2+'%','margin-left':this.slideMargin/2+'%'});
    }else{
        $(arr).css({'width': this.slideWidth()+'%'});
    }
};

sliderProto.prototype.setBullets = function(){
    if(this.showBullets === true) {
        var finalQuantityOfSlides = 0;
        $('#'+this.id).append("<div class='navigation'></div>");
        var numberSlidesPortion = parseInt(this.slidesQuantity/this.activeSlidesL);
        var numberNotFullPortion = this.slidesQuantity - numberSlidesPortion * this.activeSlidesL;
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

sliderProto.prototype.setArrows = function(){
    if(this.showArrows === true){
        $('#'+this.id).append(
            '<div class="arrows">' +
            '<span class="prev"></span>' +
            '<span class="next"></span>' +
            '</div>');
    }
};

sliderProto.prototype.setActiveSlides = function(){
    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');
    for(var j = 0; j < this.activeSlidesL; j++){
        $(allSlidersItems[j]).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);
        this.setSlides(this.arr[this.counter]);
        this.counter++;
    }
};

sliderProto.prototype.nextArrow = function(){
    var self = this;
    var allSlidersDots = $('.navigation').find('.dot');
    var nextBtn = $('.arrows').find('.next');

    $(nextBtn).click(function () {
        self.removeAllActiveItems();
        for(var k = 0; k < self.activeSlidesL; k++) {
            self.setSlides(self.arr[self.counter]);
            self.counter++;
        }
        $(allSlidersDots[self.counter/self.activeSlidesL - 1]).addClass(''+self.activeClass);
        if(self.counter >= self.arr.length) {
            self.counter = 0;
        }
    });
};

/**
 * Left click btn
 */
sliderProto.prototype.prevArrow = function(){
    var self = this;
    var allSlidersDots = $('.navigation').find('.dot');
    var prevBtn = $('.arrows').find('.prev');

    $(prevBtn).click(function () {
        self.removeAllActiveItems();

        var actualCounter = parseInt(self.counter);

        if(actualCounter === 0){
            self.counter = self.arr.length - (self.activeSlidesL*2);
        }
        if(actualCounter < 0){
            self.counter = self.arr.length - self.activeSlidesL;
        }
        if(actualCounter > 0 && actualCounter > self.activeSlidesL) {
            self.counter = actualCounter - (self.activeSlidesL * 2);
        }
        if(actualCounter === self.activeSlidesL){
            self.counter = self.arr.length - (self.activeSlidesL);
        }

        for(var k = 0; k < self.activeSlidesL; k++){
            self.setSlides(self.arr[self.counter]);
            self.counter++;
        }
        if (self.counter < 0) {
            self.counter = self.arr.length;
        }
        console.log("Left click : "+ self.counter);
    });
};

/**
 * Functionally for auto run slider
 */
sliderProto.prototype.run = function(){
        var allSlidersDots = $('.navigation').find('.dot');
        this.removeAllActiveItems();
        //var actualCounter = this.counter;
        if(this.counter >= this.arr.length) {
            this.counter = 0;
        }
        for(var k = 0; k < this.activeSlidesL; k++){
            this.setSlides(this.arr[this.counter]);
            this.counter++;
        }
        $(allSlidersDots[this.counter/this.activeSlidesL - 1]).addClass(''+this.activeClass);
        if(this.counter >= this.arr.length) {
            this.counter = 0;
        }
        console.log('Run: '+this.counter);
};

/**
 * To do
 */
sliderProto.prototype.touchBullets = function(){
    var self = this;
    var allSlidersDots = $('.navigation').find('.dot');

    $(allSlidersDots).click(function () {
        $(allSlidersDots).removeClass(''+self.activeClass);
        $(this).addClass(''+self.activeClass);
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

sliderProto.prototype.init = function(){
    this.slide();
    this.setBullets();
    this.setArrows();
    this.setActiveSlides();
    this.nextArrow();
    this.prevArrow();
    this.touchBullets();
    this.setPlayStopHover();
};

$(document).ready(function(){
    var sliderParams = {
        id: 'slider_rw',
        activeSlidesL: 3,
        activeSlidesM: 3,
        activeSlidesS: 2,
        activeSlidesXS: 1,
        slideTime: 2000,
        slideEffect: 'fadeIn',
        slideMargin: 2,
        autoSlide: true,
        onHoverStop: true,
        showArrows: true,
        showBullets: true,
        step: 1
    };

    var slider = new sliderProto(sliderParams);
    slider.init();
    //setInterval(function(){slider.run()},slider.slideTime);
});