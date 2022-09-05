
document.addEventListener('DOMContentLoaded', () => {
	const mapControl = document.querySelectorAll('.our-stores__tag'),
		formRating = document.querySelectorAll('.reviews-form__rating-star'),
		productGallery= document.querySelectorAll('.product-images__gallery-item > img'),
		producrtImage = document.querySelector('.product-images__gallery-img > img'),
		itemBasketCounter = document.querySelectorAll('.item-basket__counter'),
		basketCheckbox = document.querySelector('.basket-controls__checkbox-input'), 
		itemBasketCheckbox = document.querySelectorAll('.item-basket__checkbox__input')

	
	
	// рейтинг для вормы отзовов
	if(formRating) {
	formRating.forEach((elem, index)=>{
		elem.onclick = ()=>{
			for (let i = 0; i < formRating.length; i++) {
				formRating[i].querySelector('input').checked = false
			}
			// добавляем 'cheked' до назатового елемента
			for (let i = 0; i < index + 1; i++) {
				formRating[i].querySelector('input').checked = true
			}
		}
		
	})
	}
	// яндекс карты
	if (document.querySelector('#map')) {
		ymaps.ready(init);
		function init(){
			let myMap = new ymaps.Map("map", {
				center: [61.667862, 50.841490],
				zoom: 14
			});


			mapControl.forEach(control => {
				control.onclick = function(){
					mapControl.forEach(elem => elem.classList.remove('active'))
					this.classList.add('active')
					let center = JSON.parse(this.dataset.met) 
					myMap.setCenter(center, 14, {
						checkZoomRange: true,
						duration: 1000
					});
					myMap.geoObjects.add(new ymaps.Placemark(center))
				}
			});

			myMap.controls.remove('geolocationControl'); // удаляем геолокацию
			myMap.controls.remove('searchControl'); // удаляем поиск
			myMap.controls.remove('trafficControl'); // удаляем контроль трафика
			myMap.controls.remove('typeSelector'); // удаляем тип
			myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
			myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
			myMap.controls.remove('rulerControl'); // удаляем контрол правил
			myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
		}
	}

	// Выбор кол-во товара 
	let itemCount;
	itemBasketCounter.forEach(elem=> {
		itemCount = +elem.querySelector('.item-basket__counter-count').innerText;

		elem.addEventListener('click', (event)=>{ 
			if (itemCount >= 1){
				if(event.target.hasAttribute('data-increment')){
					itemCount += 1 
				}
			}
			if (itemCount > 1){
				if (event.target.hasAttribute('data-decrement')) {
					itemCount -= 1
				}
			}
			//вывод кол-во товара
			elem.querySelector('.item-basket__counter-count').innerText = itemCount;
		})
	})

	// Выбор всех товаров
	basketCheckbox.addEventListener('click', ()=>{
		
		itemBasketCheckbox.forEach(elem =>{
			if (basketCheckbox.checked){
				elem.checked = true
			}else{
				elem.checked = false
			}
		})
	})
	productGallery.forEach(elem =>{
		elem.onclick = (event)=>{
			let self = event.target
			console.log(self.src)
			producrtImage.src = self.src
		}
	})
	
	  
		
});





