import React from 'react';
import {Header} from "../components";
import {
   GridComponent, ColumnsDirective, ColumnDirective,
   Page, Search, Inject, Toolbar, Edit, Selection, Sort, Filter
} from "@syncfusion/ej2-react-grids";
import {customersData, customersGrid} from "../data/dummy";

const Customers = () => {
   const selectionsettings = { persistSelection: true };
   const toolbarOptions = ['Delete'];
   const editing = { allowDeleting: true, allowEditing: true };
   return (
      <div className={"mt-2 md:m-10 p-2 md:p-10  bg-white rounded-3xl"}>
         <Header category={"Page"} title={"Customers"}/>
         <GridComponent dataSource={customersData} allowPaging allowSorting toolbar={["Search", "Delete"]}
                        width={"auto"}
                        editSettings={{allowDeleting: true, allowEditing: true}}>
            <ColumnsDirective>
               {customersGrid.map((item, i) => (
                  <ColumnDirective key={i} {...item}/>
               ))}
            </ColumnsDirective>
            <Inject services={[Page, Search, Toolbar, Selection, Edit, Sort, Filter]}/>
         </GridComponent>
      </div>
   )
}

export default Customers;