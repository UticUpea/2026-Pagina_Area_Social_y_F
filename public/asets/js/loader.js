window.addEventListener("load",function(){
    var element = document.getElementById("loader-wrapper");
    var contenedor = this.document.getElementById("loader-wrapper");
    contenedor.style.display = 'none';
    element.style.display = 'none';
})

$('body').scrollspy({ 
    target: '.fixed-side-navbar',
    offset: 200
});

function isVisible(elm) {
	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

// cuando se carga la página...
window.addEventListener('DOMContentLoaded', (ev0) => {
        // asignamos un evento scroll...
	window.addEventListener('scroll', (ev1) => {
                // y a todos los elementos con la clase paused...
		document.querySelectorAll(".paused").forEach(elm => {
			if (isVisible(elm)){ // que sean visibles...
				elm.classList.remove("paused"); // les quitamos la clase paused 
            }
		})
	});
});

  