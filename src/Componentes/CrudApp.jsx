import { useState, useEffect } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const CrudApp = () => {
    const [db, setDb] = useState([]);
    
    useEffect(() => {
  fetch("http://localhost:3002/productos")
    .then((res) => res.json())
    .then((data) => {
      console.log("Datos recibidos:", data);
      setDb(data);
    })
    .catch((err) => console.error("Error:", err));
}, []);

    const [dataToEdit, setDataToEdit] = useState(null); {/*este estado almacena el producto que se quiere editar, cuando se hace clic en el botón de editar , ese estado cambia y el form se completa automaticamente*/}


    {/**    envio el producto a jsonserver , lo guardo en db.json, me devuelve el producto creado con su id y react actualiza la tbla */}
    const createData = async (data) => {
    try {
        const respuesta = await fetch(
            "http://localhost:3002/productos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        const nuevoProducto = await respuesta.json();

        setDb([...db, nuevoProducto]);

         } catch (error) {
             console.error("Error al crear producto:", error);
             }
    };


    const updateData = async (data) => {
        try {
            const respuesta = await fetch(
                `http://localhost:3002/productos/${data.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const productoActualizado = await respuesta.json();

            let newData = db.map((el) =>
            String(el.id) === String(data.id)
                 ? productoActualizado
                 : el
                );
                
            setDb(newData);

        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };
    

    const deleteData = async (id) => {
        try {
            await fetch(`http://localhost:3002/productos/${id}`, {
                method: "DELETE",
            });

            let newData = db.filter(el => el.id !== id);
            setDb(newData);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    //creo un estado para el filtro de categoria, se lo paso a CrudTable y desde ahí se lo paso a cada fila para que filtre los datos que se muestran en la tabla*/

    const [filtroCategoria, setFiltroCategoria] = useState("");

    //creo un estado para la búsqueda, se lo paso a CrudTable y desde ahí se lo paso a cada fila para que filtre los datos que se muestran en la tabla*/

    const [busqueda, setBusqueda] = useState("");

	return(
		<div>
            <h2 className="display-4 fw-bold text-center mb-4">
           Centro de distribución Ultra 
            </h2>

{/*le paso las funciones de crear, actualizar y eliminar datos, así como el estado de dataToEdit y la función 
setDataToEdit para poder editar un registro desde el formulario 
            
-comunicacion padre-hijo: le paso las funciones de crear, actualizar y eliminar datos, 
 así como el estado de dataToEdit y la función setDataToEdit para poder editar un registro desde el formulario */}
            */
            <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />

            
			<CrudTable 
            data={db} setDataToEdit={setDataToEdit} deleteData={deleteData} 
            filtroCategoria={filtroCategoria} setFiltroCategoria={setFiltroCategoria} busqueda={busqueda} setBusqueda={setBusqueda}/>

		</div>
)
}
export default CrudApp;

