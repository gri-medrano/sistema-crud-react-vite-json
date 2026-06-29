const CrudTableRow = ({el, setDataToEdit, deleteData}) => {
    let {fecha, categoria, producto, precioUnitario, id} = el
	return(
		<tr>

			<td>{fecha}</td>
            <td>{categoria}</td>
            <td>{producto}</td>
            <td>${precioUnitario}</td>
            <td>{el.cantidad} {el.cantidad == 0 ? (
                <span className="badge bg-dark">
                Sin Stock
                </span>
            ) : el.cantidad < 10 ? (
                <span className="badge bg-danger">
                Bajo Stock
                </span>
            ) : (
                <span className="badge bg-success">
                Disponible
                </span>
            )}
            </td>      
            <td>${precioUnitario * el.cantidad}</td> 
            <td> 
                <button className="btn btn-primary me-2" onClick={() => {setDataToEdit(el)}}>Editar</button>
                <button className="btn btn-danger" onClick={() => {deleteData(id)}}>Eliminar</button>
            </td>
		</tr>
    )
}

export default CrudTableRow;
