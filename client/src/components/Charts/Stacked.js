import React from 'react';
import {
   Category, ChartComponent, SeriesCollectionDirective, Inject, Legend, Tooltip,
   StackingColumnSeries, SeriesDirective
} from "@syncfusion/ej2-react-charts";
import {stackedPrimaryXAxis, stackedPrimaryYAxis, stackedCustomSeries} from "../../data/dummy";

const Stacked = ({height, width}) => {
   return (
      <ChartComponent width={width} height={height} id={"charts"}
                      primaryXAxis={stackedPrimaryXAxis} primaryYAxis={stackedPrimaryYAxis}
                      chartArea={{border: {width: 0}}} tooltip={{enable: true}} LegendSettings={{background: "white"}}>
         <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]}/>
         <SeriesCollectionDirective>
            {stackedCustomSeries.map((item, index) =>
               <SeriesDirective key={index} {...item}/>)}
         </SeriesCollectionDirective>
      </ChartComponent>
   )
}

export default Stacked;