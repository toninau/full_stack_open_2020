import React from 'react'

const Filter = ({filterValue, handleOnChange}) => {
  return (
    <div>
      <label htmlFor="filter">find countries</label>
      <input
        value={filterValue}
        onChange={handleOnChange}
        id="filter"
      />
    </div>
  )
}

export default Filter