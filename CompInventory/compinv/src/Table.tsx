import React, { useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode} from 'primereact/api';
import { Component } from './types/component';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import './index.css';
import 'primeicons/primeicons.css'

interface TableProps{
    component: Component[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

function Table({component, onEdit, onDelete}: TableProps){
    const [loading, setLoading] = useState(false);
    const[filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS },
        type: {value: null, matchMode: FilterMatchMode.CONTAINS },
        value: {value: null, matchMode: FilterMatchMode.EQUALS },
        description: {value: null, matchMode: FilterMatchMode.CONTAINS },
        stock: {value: null, matchMode: FilterMatchMode.EQUALS },
        status: {value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const[globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        const _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const header = (
        <div className="header-container">
            <div className="header-top">
            <Button className="addButton" label="Add Component" icon="pi pi-plus" rounded aria-label="addButton"></Button>
                <div className="header-search">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </IconField>
                </div>
            </div>
        </div>
    );

    const getSeverity = (status: string) => {
        switch(status) {
            case 'In Stock':
                return 'success';
            case 'Low':
                return 'warning';
            case 'Out of Stock':
                return 'danger';
            default:
                return 'info';
        }
    };

    const statusBodyTemplate = (rowData: Component) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const actionColumnButtons = (rowData: Component) => {
        return(
            <div className="actionButtonGroup">
                <Button className="EditButton" icon="pi pi-pencil" rounded aria-label="Edit" onClick={() => onEdit(rowData.component_id)}></Button>
                <Button className="DeleteButton" icon="pi pi-trash" rounded severity="danger" aria-label="Delete" onClick={() => onDelete(rowData.component_id)}></Button>
            </div>
        )
    }

    return(
        <div className="MainTable">
            <DataTable value={component} filters={filters} header={header} showGridlines stripedRows paginator rows={20} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="type" sortable header="Type"></Column>
                <Column field="value" sortable header="Value"></Column>
                <Column field="description" sortable header="Description"></Column>
                <Column field="stock" sortable header="Stock"></Column>
                <Column body={statusBodyTemplate} field="status" sortable header="Status"></Column>
                <Column body={actionColumnButtons} header="Actions" />
            </DataTable>
        </div>
    )
}

export default Table;