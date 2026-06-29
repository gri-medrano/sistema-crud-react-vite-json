import { useState, useEffect } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const CrudApp = () => {
    const [db, setDb] = useState([]); //USESTATE PARA ADMINISTRAR EL ESTADO 
    
    //HOOK PARA EJECUTAR EFECTOS SECUNDARIOS, EN ESTE CASO PARA OBTENER LOS DATOS DE LA API CUANDO SE MONTA EL COMPONENTE
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
                    "Content-Type": "application/json", //TIPO DE CONTENIDO QUE SE ENVIA AL SERVIDOR, EN ESTE CASO JSON
                },
                body: JSON.stringify(data), //CONVIERTO EL OBJETO DATA EN UN STRING JSON PARA ENVIARLO AL SERVIDOR
            }
        );

        const nuevoProducto = await respuesta.json();

        setDb([...db, nuevoProducto]); //agrego el nuevo producto al estado db, para que se renderice en la tabla

         } catch (error) {
             console.error("Error al crear producto:", error);
             }
    };

    //le digo a js que realizare tareas asincronicas
    const updateData = async (data) => { //recibo data del form,osea el producto editado
        //try para controlar errores, si hay un error se ejecuta el catch
        try {
            const respuesta = await fetch(    //peticion al servidor
                `http://localhost:3002/productos/${data.id}`,  //se indica a que recurso acceder
                {//objeto
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json", //TIPO DE CONTENIDO QUE SE ENVIA AL SERVIDOR, EN ESTE CASO JSON
                    },
                    body: JSON.stringify(data),// envio los datos 
                }
            );

            const productoActualizado = await respuesta.json(); //convierto la respuesta en un objeto js

            let newData = db.map((el) => //recorro todo el estado, la db , mapeo 
            //string porq es alfanumerico 
            String(el.id) === String(data.id)  //comparo el id del producto editado con el id de cada producto en la db, si son iguales reemplazo el producto por el producto editado, si no son iguales dejo el producto tal cual
                 ? productoActualizado         //operador ternario si cocincide reemplazo
                 : el                          // si no queda como estaba
                );
                
            setDb(newData);       //se actualiza el estado  y renderiza la tabla con los datos actualizados

        } catch (error) {
            console.error("Error al actualizar producto:", error);  //manejo de errores
        }
    };
    

    const deleteData = async (id) => {
        try {
            await fetch(`http://localhost:3002/productos/${id}`, {
                method: "DELETE",
            });

            let newData = db.filter(el => el.id !== id);  //filtro para eliminar con el id que llego por parametro
            setDb(newData);                                 //actualizo db
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

