
var sliderProto = function(sliderParams){
    this.id = sliderParams.id;
    this.activeSlidesL = sliderParams.activeSlidesL;
    this.activeSlidesM = sliderParams.activeSlidesM;
    this.activeSlidesS = sliderParams.activeSlidesS;
    //this.activeSlidesXS = sliderParams.activeSlidesXS;
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

// sliderProto.prototype.hoverDetector = function(entity){
// // check if entity is on hover
// // return bool
// };

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


// sliderProto.prototype.nextArrow = function(){
//     var self = this;
//     var nextBtn = $('.arrows').find('.next');
//     var sliderContainer = $('#'+this.id);
//     var allSlidersItems = $(sliderContainer).find('.item');
//     var allSlidersDots = $('.navigation').find('.dot');
//
//     $(nextBtn).click(function () {
//         allSlidersDots.removeClass(''+ self.activeClass);
//         allSlidersItems.removeClass(''+self.activeClass).addClass(''+self.hiddenClass);
//         allSlidersItems.removeAttr('style');
//
//         for(var k = 0; k < self.activeSlidesL; k++){
//             self.setSlides(self.arr[self.counter]);
//             self.counter++;
//         }
//
//         if (self.counter >= self.arr.length) {
//             self.counter = 0;
//         }
//     });
// };
//
// sliderProto.prototype.prevArrow = function(){
//     var self = this;
//     var prevBtn = $('.arrows').find('.prev');
//     var sliderContainer = $('#'+this.id);
//     var allSlidersItems = $(sliderContainer).find('.item');
//     var allSlidersDots = $('.navigation').find('.dot');
//
//     this.counter = this.arr.length;
//
//     $(prevBtn).click(function () {
//         allSlidersDots.removeClass(''+ self.activeClass);
//         allSlidersItems.removeClass(''+self.activeClass).addClass(''+self.hiddenClass);
//         allSlidersItems.removeAttr('style');
//
//         for(var k = 0; k < self.activeSlidesL; k++){
//             self.setSlides(self.arr[self.counter]);
//             self.counter--;
//         }
//
//         if (self.counter <= 0 ) {
//             self.counter = self.arr.length;
//         }
//
//         console.log(self.counter);
//     });
// };


sliderProto.prototype.nextPrev = function () {
    var self = this;
    var prevBtn = $('.arrows').find('.prev');
    var nextBtn = $('.arrows').find('.next');

    self.counter = 0;

    var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');


    $(prevBtn).click(function () {
        allSlidersItems.removeClass(''+self.activeClass).addClass(''+self.hiddenClass);
        allSlidersItems.removeAttr('style');

        if (self.counter > 0) {
                self.setSlides(self.arr[self.counter - 1]);
                self.counter--;
        } else {
                self.setSlides(self.arr[self.arr.length - 1]);
                self.counter = self.arr.length - 1;
        }
        console.log(self.counter);
        console.log('prev');
    });


    $(nextBtn).click(function () {

         allSlidersItems.removeClass(''+self.activeClass).addClass(''+self.hiddenClass);
         allSlidersItems.removeAttr('style');

        // for(var k = 0; k < self.activeSlidesL; k++) {
        //     self.setSlides(self.arr[self.counter]);
        //     self.counter++;
        // }
        // if(self.counter >= self.arr.length) {
        //     self.counter = 0;
        // }

        if (self.counter < self.arr.length - 1) {
            for(var k = 0; k < self.activeSlidesL; k++) {
                self.setSlides(self.arr[self.counter + 1]);
                self.counter++;
            }
        } else {
            for(var k = 0; k < self.activeSlidesL; k++) {
                self.setSlides(self.arr[k]);
                self.counter = 0;
            }
        }
        console.log(self.counter);
        console.log('next');
    });

};

/**
 * Functionally for auto run slider
 */
sliderProto.prototype.run = function(){
        var allSlidersDots = $('.navigation').find('.dot');
        this.removeAllActiveItems();
        for(var k = 0; k < this.activeSlidesL; k++){
            this.setSlides(this.arr[this.counter]);
            this.counter++;
        }
        $(allSlidersDots[this.counter/this.activeSlidesL - 1]).addClass(''+this.activeClass);
        if(this.counter >= this.arr.length) {
            this.counter = 0;
        }
};

// sliderProto.prototype.touchBullets = function(){
//     var slideIndex = 1;
//
//     var self = this;
//     var allSlidersDots = $('.navigation').find('.dot');
//
//     $(allSlidersDots).click(function () {
//
//         self.removeAllActiveItems();
//
//         if (self.counter > self.arr.length) {slideIndex = 1}
//
//         if (self.counter < 1) {slideIndex = self.arr.length}
//
//         for(var k = 0; k < self.arr.length; k++){
//              self.setSlides(self.arr[self.])
//         }
//
//         console.log(self.counter);
//
//         //$(allSlidersDots).removeClass(''+self.activeClass);
//         //$(this).addClass(''+self.activeClass);
//
//
//     });
// };


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

    this.nextPrev();
    //this.nextArrow();
    //this.prevArrow();
    //this.touchBullets();
    this.setPlayStopHover();
};

$(document).ready(function(){
    var sliderParams = {
        id: 'slider_rw',
        activeSlidesL: 2,
        activeSlidesM: 3,
        activeSlidesS: 2,
        //activeSlidesXS: 1,
        slideTime: 2000,
        slideEffect: 'fadeIn',
        slideMargin: 2,
        autoSlide: false,
        onHoverStop: true,
        showArrows: true,
        showBullets: true,
        step: 1
    };

    var slider = new sliderProto(sliderParams);
    slider.init();

    //setInterval(function(){slider.run()},slider.slideTime);
});