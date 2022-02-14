import React, {useState,useEffect} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import Axios from 'axios' 
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Select from 'react-select'

export function Grid()
 {
    const [rowData, setRowData] = useState();
    
    const [gridApi, setGridApi] = useState(null);

  const [collDefs,setcollDefs]=useState([]);
  const [seloptions,setseloptions]=useState([]);
  var colDefs=[];
  
  const handler = (event) => {
    const value = event.value
   console.log(String(value))

    console.log("Hello")
        
    Axios.get('https://localhost:7107/api/Schema_/'+String(value)).then((response)=>{
      setcollDefs(response.data)
      console.log("Get request called")
      console.log(collDefs)

    })
    Axios.get('https://localhost:7107/api/Data/'+String(value)).then((response)=>{
      
      setRowData(response.data)
    })
  
    let obj1 =[];
    var i=0;
    for(i=0;i<collDefs.length;++i)
    {
      let obj2 ={field : collDefs[i]}
      obj1.push(obj2)
    }
    colDefs=obj1
    console.log(obj1)

  }
    
    Axios.get('https://localhost:7107/api/Schema_').then((response)=>{
      
      setseloptions(response.data)
    })
    let obj3 =[];
    var i=0;
    for(i=0;i<seloptions.length;++i)
    {
      let obj4 ={value : seloptions[i],label : seloptions[i]}
      obj3.push(obj4)
    }
    const options=obj3
    //console.log(obj3)



//console.log(rowData);
const gridOptions = {
    // turns OFF row hover, it's on by default
    suppressRowHoverHighlight: true,
    // turns ON column hover, it's off by default
    columnHoverHighlight: true,
    
    // other grid options ...
  }
  const cellStyle ={color : 'red'}


     return (

      <div>
          <Select options={options} onChange={handler}/>
     
         <div className="ag-theme-alpine" style={{height: "100vh", width: "100%"}}> 
         
             <AgGridReact 
                  cellStyle={cellStyle}
                  defaultColDef={{sortable: true, filter: true }}
                  animateRows={true}
                  pagination={true}
                  rowData={rowData}
                  columnDefs={colDefs}
                  unSortIcon={true}
                  gridOptions={gridOptions}
                  
                  >
             </AgGridReact>
         </div>
         </div>

     )
  

};