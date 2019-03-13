
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
        for(var i = 0; i < this.slidesQuantity; i ++){
            this.arr.push(allSlidersItems[i]);
        }
    }
};

sliderProto.prototype.setSlides = function(arr){
    $(arr).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);

    $(arr).css({'width':this.slideWidth()+'%'});


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

sliderProto.prototype.setActiveSlides = function(){
	var sliderContainer = $('#'+this.id);
    var allSlidersItems = $(sliderContainer).find('.item');
	for(var j = 0; j < this.activeSlidesL; j++){
        $(allSlidersItems[j]).addClass(''+this.activeClass).removeClass(''+this.hiddenClass);
        if(this.slideMargin){
            $(allSlidersItems[j]).css({'width': this.slideWidth()+'%','margin-right':this.slideMargin/2+'%','margin-left':this.slideMargin/2+'%'});
            this.counter++;
        }else{
            $(allSlidersItems[j]).css({'width': 100/this.activeSlidesL+'%'});
            this.counter++;
        }
    }
    console.log(this.counter);
};
sliderProto.prototype.run = function(){
    if(this.autoSlide === true && this.slideEffect){

        var allSlidersDots = $('.navigation').find('.dot');

        $('.item').removeClass(''+this.activeClass).addClass(''+this.hiddenClass);
        $('.item').removeAttr('style');
        $('.dot').removeClass(''+this.activeClass);

        for(var k = 0; k < this.activeSlidesL; k++){
            this.setSlides(this.arr[this.counter]);
            this.counter++;
            //$(allSlidersDots[this.counter-1]).addClass(''+this.activeClass);
        }
        if(this.counter >= this.arr.length) {
            this.counter = 0;
        }
    }
};
sliderProto.prototype.init = function(){
    this.slide();
    this.setBullets();
    this.setActiveSlides();
};

$(document).ready(function(){
    var sliderParams = {
        id: 'slider_rw',
        activeSlidesL: 4,
        activeSlidesM: 3,
        activeSlidesS: 2,
        //activeSlidesXS: 1,
        slideTime: 3000,
        slideEffect: 'fadeIn',
        slideMargin: 2,
        autoSlide: true,
        showArrows: true,
        showBullets: true,
        step: 1
    };

    var slider = new sliderProto(sliderParams);
    slider.init();
    setInterval(function(){slider.run()},slider.slideTime);
});
