import {useState, useEffect} from 'react'

const initialForm = {
    fecha: "",
    categoria: "",
    producto: "",
    precioUnitario: "",
    cantidad: "",
    id: null
}
const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit }) => {
	const [form, setForm] = useState(initialForm)

    //HOOK
    useEffect(()=>{
		if(dataToEdit){
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }
        },[dataToEdit]
    )

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.fecha || !form.categoria || !form.producto || !form.precioUnitario || !form.cantidad){
            alert('Datos incompletos. Por favor complete todos los campos');
            return;
        }
        if(form.id === null){
            createData(form);
        } else {
            updateData(form);
        }
        handleReset();
    }
    const handleReset = (e) => {
        setForm(initialForm);
	    setDataToEdit(null);
    }
	return(

        <div  className="card card-stock cold-md-8 shadow-lg border-0 container mt-5 mb-5">
            <div className="card-body">
                <h2 className="text-center border-bottom pb-3 mb-4 ">Agregar Producto</h2>
                <form onSubmit={handleSubmit}  className="row justify-content-center col-md-8 col-lg-6 mx-auto g-0">

                    <div className="row mb-3">
                        <div className=" col-md-6 mb-3 mb-md-0">
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="date" id="fecha" name="fecha" onChange={handleChange} value={form.fecha}  className="form-control form-control-lg"/>
                        </div>
                        
                        <div className=" col-md-6">
                            <label for="cat">Elige una categoria:</label>
                            <select id="cat" name="categoria" value={form.categoria} onChange={handleChange} className="form-select form-select-lg" >
                                <option value="">Seleccionar</option>
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
                        </div>
                    </div>

                    <input type="text" name="producto" placeholder="Producto" onChange={handleChange} value={form.producto} className="form-control form-control-lg mb-3"/>
                    <input type="text" name="cantidad" placeholder="Cantidad" onChange={handleChange} value={form.cantidad} className="form-control form-control-lg mb-3"/>    
                    <input type="text" name="precioUnitario" placeholder="Precio Unitario" onChange={handleChange} value={form.precioUnitario} className="form-control form-control-lg"/> 
                   
                    <div className="text-center mt-3">
                        <input type="submit" value="Agregar" className="btn btn-primary me-2 "/>
                        <input type="reset" value="Limpiar" onClick={handleReset} className="btn btn-secondary"/>
                    </div>
                   
                </form>
		    </div>
        </div>

		
    )
}

export default CrudForm;
