import React, { useState } from 'react'

const CountrySelector = (props) => {

  return (
    <div className='query'>
      <p>Select Your Contry</p>
      <select value={props.country} onChange={(e) => {
        const selectedCountry = e.target.value;
        props.handle(selectedCountry);
      }} >
        <option value="af">Afghanistan</option>
        <option value="cn">China</option>
        <option value="in">India</option>
        <option value="ir">Iran</option>
        <option value="pk">Pakistan</option>
      </select>
    </div>
  )
}

export default CountrySelector
