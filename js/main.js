$(document).ready(function() {
    $('.stores__body__link').click(function (e) {
        e.preventDefault();
        let elem = e.target;
        console.log(elem);
		let id = '1' + elem.getAttribute('id');
		$('.stores__body__info').removeClass('stores__body__info--active');
		jQuery("#"+id).addClass('stores__body__info--active');
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