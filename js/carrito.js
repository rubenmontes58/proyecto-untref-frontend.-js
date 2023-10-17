document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

fetch('https://zmszgmmzcdolvhbxrskm.supabase.co/rest/v1/untref?select=id', {
	headers: {
		apikey:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptc3pnbW16Y2RvbHZoYnhyc2ttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4OTI5NzAsImV4cCI6MjAwNTQ2ODk3MH0.KcTnLJ_4ODZJ-ccqwXPf-d5fO0D1vPIBgGlWrVng6vM",
	},
})
	.then((response) => response.json())

	.then((data) => {
		if (data && data.length > 0) {
			// Acceder a las propiedades del producto
			document.getElementById("idValue").textContent = data[0].id;
			document.getElementById("titleValue").textContent = data[0].title;
			document.getElementById("descriptionValue").textContent =
				data[0].description;
			document.getElementById("priceValue").textContent = data[0].price;
			document.getElementById("thumbnailValue").src = data[0].thumbnail;
		}

		const addToCartButton = document.getElementById("addToCartButton");

		addToCartButton.addEventListener("click", () => {
			const product = {
				id: data[0].id,
				title: data[0].title,
				description: data[0].description,
				price: data[0].price,
				thumbnail: data[0].thumbnail,
			};

			// Obtener el array del carrito del almacenamiento local
			let cart = localStorage.getItem("cart");
			if (!cart) {
				cart = [];
			} else {
				cart = JSON.parse(cart);
			}

			// Agregar el producto al carrito
			cart.push(product);

			// Guardar el carrito actualizado en el almacenamiento local
			localStorage.setItem("cart", JSON.stringify(cart));

			// Opcional: Mostrar un mensaje de confirmación
			console.log("El producto ha sido agregado al carrito.");

			// Opcional: Redirigir a la página del carrito
			window.location.href = "/carrito.html";
		});
	})
	.catch((error) => {
		console.error("Error:", error);
	});

  // Llamar a la función de actualización del carrito al cargar la página
  updateCart();
});

function emptyCart() {
  // Vaciar el carrito en el almacenamiento local
  localStorage.removeItem("cart");
  // Actualizar el carrito en la interfaz de usuario
  updateCart();
  // Mostrar mensaje de confirmación
  console.log("El carrito ha sido vaciado.");
 }
 
 function updateCart() {
   // Obtener el contenedor del carrito y el elemento del total
   const cartItemsContainer = document.getElementById("cartItems");
   const totalElement = document.getElementById("total");
 
   // Vaciar el contenedor del carrito y el elemento del total
   cartItemsContainer.innerHTML = "";
   totalElement.textContent = "";
 
   // Obtener los productos del carrito del almacenamiento local
   const cart = JSON.parse(localStorage.getItem("cart")) || [];
 
   let total = 0;
   console.log(cart);
 
   // Mostrar los productos del carrito en la interfaz de usuario y calcular el total
   cart.forEach(product => {
     const cartItem = document.createElement("div");
     cartItem.classList.add("cart-item");
     cartItem.innerHTML = `
     
       <img src="${product.thumbnail}" alt="${product.title}" width="100">
       <h3>${product.title}</h3>
       
       <p>Precio por unidad: $${product.price}</p>
  <button class="btn btn-danger type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal"" onclick="eliminarProducto('${product.title}')">Eliminar</button>
  <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" ">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Producto Eliminado</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
	
       <h3>${product.title}</h3>
	     <img src="${product.thumbnail}" alt="${product.title}" width="100">
       
       <p>Precio: $${product.price}</p>
	  

        <h4 class="text-danger">Producto Eliminado</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
        
      </div>
    </div>
  </div>
</div>

    
    
      
     
       <hr>
     `;
     cartItemsContainer.appendChild(cartItem);
 
     total += parseFloat(product.price);
   });
 
   // Mostrar el total en el elemento correspondiente
   totalElement.textContent = `Total: $${total.toFixed(2)}`;
 }
function eliminarProducto(title) {
  // Obtener el array del carrito del almacenamiento local
  let cart = localStorage.getItem("cart");
  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  // Filtrar el carrito para eliminar el producto con el título especificado
  cart = cart.filter((product) => product.title !== title);

  // Guardar el carrito actualizado en el almacenamiento local
  localStorage.setItem("cart", JSON.stringify(cart));

  // Actualizar el carrito en la interfaz de usuario
  updateCart();

  // Opcional: Mostrar un mensaje de confirmación
  console.log(
    "El producto ha sido eliminado del carrito y del almacenamiento local."
  );
}


  document.getElementById("myButton").addEventListener("click", function() {
	generarNumeroSeguimiento()
	  .then((numeroSeguimiento) => {
		alert("Número de seguimiento generado: " + numeroSeguimiento);
	  })
	  .catch((error) => {
		alert("Error al generar el número de seguimiento: " + error);
	  });
  });

  function generarNumeroSeguimiento() {
	return new Promise((resolve, reject) => {
	  setTimeout(() => {
		const numeroSeguimiento = Math.floor(Math.random() * 1000000);
		if (numeroSeguimiento) {
		  resolve(numeroSeguimiento);
		} else {
		  reject("No se pudo generar el número de seguimiento");
		}
	  }, 3000); // 3000 milisegundos = 3 segundos
	});
  }
