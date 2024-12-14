    /*
    // Asegurar que el script se ejecute después de cargar el DOM
    document.addEventListener("DOMContentLoaded", () => {
        const row = document.querySelector(".plan-table tbody tr");

        if (row) {
            const sumCell = row.querySelector(".sum-cell"); // Celda donde se muestra la suma
            const inputs = row.querySelectorAll("input[type='number']"); // Inputs de la fila

            // Función para calcular y actualizar la suma
            function updateSum() {
                // Actualizar el valor en la celda de suma
                sumCell.textContent = Array.from(inputs)
                          .reduce((acc, cell) => acc + parseFloat(cell.textContent || 0), 0);
              console.log("Suma = " + sumCell.textContent);
            }

            // Calcular la suma inicial al cargar la página
            updateSum();

            // Escuchar cambios en los inputs y actualizar la suma
            inputs.forEach(input => {
                input.addEventListener("input", updateSum);
            });
        } else {
            console.error("No se encontró la fila en la tabla.");
        }
    });
    */