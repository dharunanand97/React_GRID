import React, { Component } from 'react'
import Select from 'react-select'

export function Form1(){
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

return(
  <Select options={options} />
)

};