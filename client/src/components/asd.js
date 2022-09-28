import React from 'react';
import {Col, Row} from "antd";

const Asd = () => {
   let datas = [{num: 1}, {num: 2}, {num: 3}, {num: 4}]
   return (
      <div>
         <Row style={{ justifyContent: "center" }}>
            {datas.map((d, i) => (
               <Col className="mt-10" style={{display: "flex", justifyContent: "center"}} xs={24} md={12} lg={6} xl={4} key={i}>
                  <div style={{
                     height: "180px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center",
                     borderRadius: "100%", border: "1px solid #392d90", width: "180px",backgroundColor:"#392d90",color:"white"
                  }}>
                     Deger : {d.num}
                  </div>
               </Col>
            ))}
         </Row>
      </div>
   )
}
export default Asd;