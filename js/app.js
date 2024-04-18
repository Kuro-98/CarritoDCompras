const contenedorCards = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const carrito = document.querySelector('#carrito');
let compras = [];

cargarEventListeners();
function cargarEventListeners() {
	contenedorCards.addEventListener('click', agregarCurso);

	carrito.addEventListener('click', eliminarCurso);

	vaciarCarritoBtn.addEventListener('click', (e) => {
		e.preventDefault();
		compras = [];
		limpiarHTML();
	});
}

function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		leerCurso(e.target.parentElement.parentElement);
	}
}

//elimina curso del carrito
function eliminarCurso(e) {
	if (e.target.classList.contains('borrar-curso')) {
		const cId = e.target.getAttribute('data-id');

		// Elimina del arreglo de articulosCarrito por el data-id
		// cursoId = compras.findIndex((it) => it.id === cId);
		// curso = compras[cursoId];

		// if (curso) {
		// 	curso.cantidad--;
		// 	if (curso.cantidad === 0) {
		// 		compras = compras.filter((curso) => curso.id !== cId);
		// 	}
		// }
		// agregarHTML();

		compras = compras
			.map((curso) => {
				if (curso.id === cId) {
					if (curso.cantidad > 1) {
						curso.cantidad--;
						return curso;
					} else {
						return null;
					}
				} else {
					return curso;
				}
			})
			.filter((curso) => curso !== null);
		agregarHTML();
	}
}

function leerCurso(curso) {
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	//Revisa si un elemento ya existe en el carrito
	const existe = compras.some((curso) => curso.id === infoCurso.id);
	if (existe) {
		const listaDeCompras = compras.map((curso) => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso;
			} else {
				return curso;
			}
		});
		compras = [...listaDeCompras];
	} else {
		compras = [...compras, infoCurso];
	}
	agregarHTML();
}

function agregarHTML() {
	limpiarHTML();
	compras.forEach((curso) => {
		const row = document.createElement('tr');
		row.innerHTML = `
		<td>
			<img src="${curso.imagen}" width="116"/>
		</td>
		<td>
			${curso.titulo}
		</td>
		<td>
			${curso.precio}
		</td>
		<td>
			${curso.cantidad}
		</td>
		<td>
			<a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
		</td>
		`;
		listaCarrito.appendChild(row);
	});
}

function limpiarHTML() {
	while (listaCarrito.hasChildNodes()) {
		listaCarrito.removeChild(listaCarrito.children[0]);
	}
}
