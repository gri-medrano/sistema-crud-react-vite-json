import CrudTableRow from "./CrudTableRow";
import { useState } from "react";

/*
comunicacion hijo-padre: recibo las props que me pasan desde CrudApp, data es el estado que contiene la base de datos, 
 setDataToEdit es la función que me permite editar un registro, deleteData es la función que me permite eliminar un registro, 
 filtroCategoria es el estado que contiene el filtro de categoria y setFiltroCategoria es la función que me permite cambiar el
  filtro de categoria
*/

//recibo las props que me pasan desde CrudApp, data es el estado que contiene la base de datos, setDataToEdit es la función que me permite editar un registro, deleteData es la función que me permite eliminar un registro, filtroCategoria es el estado que contiene el filtro de categoria y setFiltroCategoria es la función que me permite cambiar el filtro de categoria*/

const CrudTable = ({data, setDataToEdit, deleteData, filtroCategoria, setFiltroCategoria, busqueda, setBusqueda }) => {

	return(
		<div className="table-responsive">
			<h3 className="text-center border-bottom pb-3 mb-4">Stock en Almacén</h3>
            <h4>Filtra por producto:</h4>
            <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} //función que se ejecuta cuando cambia el valor del input
            />
            <h4>o mejor por categoria:</h4>
            <select
            className="form-select mb-3"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)} //función que se ejecuta cuando cambia el valor del select
            >
                                <option value="">Todas</option>
                                <option value="Alimentos">Alimentos</option>
                                <option value="Cuidado Personal">Cuidado Personal</option>
                                <option value="Juguetes">Juguetes</option>
                                <option value="Limpieza">Limpieza</option>
                                <option value="Comestibles">Comestibles</option>
                                <option value="Electronica">Electronica</option>
                                <option value="Descartables">Descartables</option>
                                <option value="Libreria">Libreria</option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Congelados">Congelados</option>
                                <option value="Frutas y Verduras">Frutas y Verduras</option>
                                <option value="Panadería">Panadería</option>
                                <option value="Higiene">Higiene</option>
                                <option value="Lacteos">Lacteos</option>
                                <option value="Golosinas">Golosinas</option>
                                <option value="Varios">Varios</option>
            </select>
			<table className="table table-striped table-hover">

                <thead>
                    <tr >
                        <th>Fecha</th>
                        <th>Categoria</th>
                        <th>Producto</th>
                        <th>Precio Unitario</th>
                        <th>Stock</th>
                        <th>Total</th>  
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {data.length === 0 ? (
                        <tr>
                            <td colSpan="7">Sin Datos</td>
                        </tr>
                        ) : (
                        data   //estado q viene de crudapp
                            .filter(el =>  //recorre todo el arreglo 
                            filtroCategoria === ""       //condicion, si el filtro de categoria esta vacio muestro todos los productos
                                ? true
                                : el.categoria === filtroCategoria    //sino muestro los productos que coincidan con la categoria seleccionada
                            )
                            .filter(el =>    //sobre el resultado del filtro anterior
                                el.producto
                                .toLowerCase() //convierte en minusculas 
                                .includes(busqueda.toLowerCase())  //busqueda por producto, si el producto contiene la cadena de busqueda lo muestro
                            )
                            .map(el => (   //cada producto que queda muestro una fila

                                //renderizo
                            <CrudTableRow
                                key={el.id}    //paso el id como key para que react pueda identificar cada fila de la tabla
                                el={el}
                                setDataToEdit={setDataToEdit}
                                deleteData={deleteData}   
                            />
                            ))
                        )}
                </tbody>
            </table>
		</div>
    )
}

export default CrudTable;
//className="table table-striped table-hover"