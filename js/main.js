$(document).ready(function() {    
    $('.stores__body__link').click(function (e) {
        e.preventDefault();
        let elem = e.target;
        console.log(elem);
		let id = '1' + elem.getAttribute('id');
		$('.stores__body__info').removeClass('stores__body__info--active');
		jQuery("#"+id).addClass('stores__body__info--active');
	});
    $('.partners__items__title').click(function (e) {
        e.preventDefault();
        let elem = e.target;
        console.log(elem);
		let id = '1' + elem.getAttribute('id');
        console.log(id);
		$('.partners__items__content').removeClass('partners__items__content--active');
		jQuery("#"+id).addClass('partners__items__content--active');
	});
    $('.email__box__head__btn').click(function (e) {
        e.preventDefault();
        let elem = e.target;
        console.log(elem);
		let id = '1' + elem.getAttribute('id');
        console.log(id);
		$('.email__box__body').removeClass('email__box__body--active');
		jQuery("#"+id).addClass('email__box__body--active');
	});
    $('.stores__head__link--ourstore').click(function (e) {
        e.preventDefault();
        $('.stores__head__link--ourstore').addClass('stores__head__link--active');
        $('.stores__head__link--partners').removeClass('stores__head__link--active');
        $('.stores__body--ourstore').addClass('stores__body--active');
        $('.stores__body--partners').removeClass('stores__body--active');
	});
    $('.stores__head__link--partners').click(function (e) {
        e.preventDefault();
        $('.stores__head__link--partners').addClass('stores__head__link--active');
        $('.stores__head__link--ourstore').removeClass('stores__head__link--active');
        $('.stores__body--partners').addClass('stores__body--active');
        $('.stores__body--ourstore').removeClass('stores__body--active');
	});
    $('.email__box__head__btn--individuals').click(function (e) {
        e.preventDefault();
        $('.email__box__head__btn--individuals').addClass('email__box__head__btn--active');
        $('.email__box__head__btn--legal').removeClass('email__box__head__btn--active');
	});
    $('.email__box__head__btn--legal').click(function (e) {
        e.preventDefault();
        $('.email__box__head__btn--legal').addClass('email__box__head__btn--active');
        $('.email__box__head__btn--individuals').removeClass('email__box__head__btn--active');
	});
    $('.scrollto a').on('click', function scroll(e) {
		e.preventDefault();
		let href = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(href).offset().top
		}, {
			duration: 370,
			easing: "linear"
		});
		return false;
	});
    $('.menu__btn').on('click', function (e) {
        e.preventDefault();
        $('.menu__btn').toggleClass('menu__btn--close');
        $('.menu__list').toggleClass('menu__list--active');
        $('.menu__btn-element').toggleClass('menu__btn-element_close');
    });
    $('.header__slider__box__items--vertical').slick({
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 1,
        autoplay: true,
        dots: false,
        arrows: false,
        speed: 4000,
    });
    $('.header__slider__box__items--horisontal').slick({
        slidesToShow: 1,
        autoplay: true,
        dots: false,
        arrows: false,
        speed: 2500,
    });
});
(function(){
    init();

    var g_containerInViewport;
    function init(){
        setStickyContainersSize();
        bindEvents();
    }

    function bindEvents(){
        window.addEventListener("wheel", wheelHandler);        
    }

    function setStickyContainersSize(){
        document.querySelectorAll('.fullpage').forEach(function(container){
            const stikyContainerHeight = container.querySelector('main').scrollWidth;
            container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
        });
    }

    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }

    function wheelHandler(evt){
        
        const containerInViewPort = Array.from(document.querySelectorAll('.fullpage')).filter(function(container){
            return isElementInViewport(container);
        })[0];

        if(!containerInViewPort){
            return;
        }

        var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
        var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
        let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

        if(g_canScrollHorizontally){
            containerInViewPort.querySelector('main').scrollLeft += evt.deltaY;
        }
    }
})();
const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input__items input");

let priceGap = 50;

priceInput.forEach(input=>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(priceInput[0].value),
        maxVal = parseInt(priceInput[1].value);
        
        if((maxVal - minVal >= priceGap) && maxVal <= 1000 ){
            if(e.target.className === "input-min price__number price__number--left"){
                rangeInput[0].value = minVal;
                console.log(minVal);
                $('.filter__progress').css({"left": (minVal / rangeInput[0].max) * 100 + "%"});
            }else{
                rangeInput[1].value = maxVal;
                $('.filter__progress').css({"right": 100 - (maxVal / rangeInput[1].max) * 100 + "%"});
            }
        }
    });
})

rangeInput.forEach(input=>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        
        if(maxVal - minVal < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            $('.filter__progress').css({"left": (minVal / rangeInput[0].max) * 100 + "%"});
            $('.filter__progress').css({"right": 100 - (maxVal / rangeInput[1].max) * 100 + "%"});
        }
    });
})