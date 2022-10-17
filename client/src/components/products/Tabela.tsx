import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useCookies } from "react-cookie";
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { Link } from "react-router-dom";


const Tabela: React.FC = () => {

    const [isFetched, setIsFetched] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>([])

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:3060/produtos",
            {
                method: "get",
                // mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })
            .then((response) => response.json())
            .then((res) => {
                if(res.status != 403 || 401) {
                    setData(res)
                    setIsFetched(true)
                } else {
                    console.log('err')
                }
            })
        
    }, [])

    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', width: 180 },
        { field: 'tipo', headerName: 'Tipo', width: 80 },
        { field: 'nserie', headerName: 'N° Série', width: 130 },
        { field: 'preco', headerName: 'Preço', width: 80 },
        { field: 'imei', headerName: 'IMEI', width: 180 },
        { field: 'cor', headerName: 'Cor', width: 80 },
        { field: 'marca', headerName: 'Marca', width: 130 },
    ];

    const handleRemoveProduct = async (event: any, selectedRows: any) => {

        for(let i = 0; i < selectedRows.length; i++) {
        await fetch(`http://localhost:3060/produtos/${selectedRows[i].id}`,
            {
                method: "delete",
                // mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })
            .then((res) => {
                if(res.status != 403 || 401) {
                    
                } else {
                    console.log('err')
                }
            })
        }
        window.location.reload();
    }

    const [cookies, setCookie] = useCookies();
    
    const handleSellProduct = async (event: any, selectedRows: any) => {
        
        const decoded = jwtDecode<any>(cookies.access_token)
        const email = decoded.email

        
        for(let i = 0; i < selectedRows.length; i++) {

            const precoEmNumero: number = selectedRows[i].preco

            let user = {
                email: email,
                preco: precoEmNumero
            }
            
            await fetch(`http://localhost:3060/venda/${selectedRows[i].id}`,
            {
                method: "post",
                // mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(user)
            })
            .then((res) => {
                if(res.status != 403 || 401) {
                    
                } else {
                    console.log('err')
                }
            })
        }
        window.location.reload();
    }


    if (!isFetched) {
        return null;
    } else {
        return (
            <>
                <div style={{ height: 400, width: '950px' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = data.filter((row) =>
                          selectedIDs.has(row.id.toString()))
                        console.log(typeof(selectedRowData));
                        setSelectedRow(selectedRowData)
                      }}
                />
                </div>
                <button style={{
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '5px',
                    margin: '20px',
                    height: '45',
                    padding: '10px',
                    width: '155px',
                    fontWeight: 'bold'
                }} onClick={event => handleRemoveProduct(event, selectedRow)}>Remover produto</button>
                <button style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    borderRadius: '5px',
                    margin: '20px',
                    height: '45',
                    padding: '10px',
                    width: '155px',
                    fontWeight: 'bold'
                }} onClick={event => handleSellProduct(event, selectedRow)}>Baixa</button>
                <Link style={{
                    backgroundColor: 'green',
                    color: 'black',
                    borderRadius: '5px',
                    margin: '20px',
                    height: '45',
                    padding: '10px',
                    width: '160px',
                    fontWeight: 'bold',
                    float: 'right'
                }} to="/addProduct">Adicionar produto</Link>
            </>
        )
    }

}

export default Tabela;