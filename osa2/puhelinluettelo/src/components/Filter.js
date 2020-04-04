import React from 'react'

const Filter = ({filterValue, handleOnChange}) => {
  return (
    <>
      <label htmlFor="filter">filter shown with</label>
      <input
        value={filterValue}
        onChange={handleOnChange}
        id="filter"
      />
    </>
  )
}

export default Filter