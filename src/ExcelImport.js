import React, { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";

const ExcelImport = (props) => {
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [sheetNames, setSheetNames] = useState(null);
  const [sheetData, setSheetData] = useState({});

  const acceptableFileNames = ['xlsx','xls']

  //Validating file type
  const checkFileName =(name)=>{
      return acceptableFileNames.includes(name.split('.').pop().toLowerCase())
  }
  
  //Reading the metadata
  const readDataFromExcel = (data) => {
    const wb = XLSX.read(data);
    setSheetNames(wb.SheetNames);
    console.log(sheetNames)
    var mySheetData = {};

    //looping thru objects

    for (var i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];
      const worksheet = wb.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        blankrows: "",
        headers: 1,
      });
      mySheetData[sheetName] = jsonData;
      console.log(sheetName);
    }
    setSheetData(mySheetData);
    console.log(sheetData)
    return mySheetData;
  };

  //hanldling file changes
  const handleFile = async (e) => {
    const myFile = e.target.files[0];
    console.log(file)
    if (!myFile) return;

    if(!checkFileName(myFile.name)){
        alert("invalid file type")
        return;
    }

    setFile(myFile);

    setFileName(myFile.name);

    console.log(e);

    console.log(fileName)

    const data = await myFile.arrayBuffer();

    const mySheetData = readDataFromExcel(data);

    props.onFileUploaded(mySheetData);
  };

  return (
    <>
      <input
        type="file"
        accept="xlsx,xls"
        multiple={false}
        onChange={handleFile}
      />
    </>
  );
};

export default ExcelImport;
