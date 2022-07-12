import React from 'react';
import {Header} from "../components";
import {
   GridComponent, ColumnsDirective,
   ColumnDirective, Page, Search, Inject, Toolbar
} from "@syncfusion/ej2-react-grids";
import {employeesData, employeesGrid} from "../data/dummy";

const Employees = () => {
   const toolbarOptions = ['Search'];
   const editing = {allowDeleting: true, allowEditing: true};

   return (
      <div className={"mt-2 md:m-10 p-2 md:p-10  bg-white rounded-3xl"}>
         <Header category={"Page"} title={"Employees"}/>
         <GridComponent dataSource={employeesData} allowPaging allowSorting width={"auto"}
                        pageSettings={{pageCount: 5}} editSettings={editing} toolbar={toolbarOptions}>
            <ColumnsDirective>
               {employeesGrid.map((item, i) => (
                  <ColumnDirective key={i} {...item}/>
               ))}
            </ColumnsDirective>
            <Inject services={[Page, Search, Toolbar]}/>
         </GridComponent>
      </div>
   )
}

export default Employees;