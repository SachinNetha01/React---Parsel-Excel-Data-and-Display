import React, { useState } from "react";
import { Row, Col, Table, Button, ButtonGroup } from "reactstrap";

import ExcelImport from "./ExcelImport";

const DynamicRenderExcel=()=>{
  const [sheetData, setSheetData] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [rSelected, setRSelected] = useState(0);

  const handleFileUpload = (e) => {
    console.log("file uloaded", e);
    if (e) {
      setSheet(Object.keys(e)[0]);
    }
    setSheetData(e);
  };

  function handleClick(tmpIdx) {
    setRSelected(tmpIdx);
    setSheet(Object.keys(sheetData)[tmpIdx]);
  }

  return (
    <div className="App">
      <ExcelImport onFileUploaded={(e) => handleFileUpload(e)} />
      {sheetData && (
        <div>
          <h5>List of Sheets:</h5>
          <ButtonGroup style={{margin:"10px"}}>
            {Object.keys(sheetData).map((arr, index) => (
              <Button
                color="outline-success"
                onClick={() => handleClick(index)}
                active={rSelected === index}
                className='mr-1'
                size="sm"
                style={{margin:"5px", borderRadius:"6px"}}
              >
                {arr}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      )}
      {sheetData && (
        <Row>
          <Col md={12}>
            <Table bordered className="border">
              <thead className="text-primary">
                <tr>
                  {Object.keys(sheetData[sheet][0]).map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetData[sheet].map((row) => (
                  <tr>
                    {Object.values(row).map((c) => (
                      <td>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default DynamicRenderExcel;

