import React from 'react'

const PersonForm = ({ handleOnSubmit, nameValue, handleOnChangeName, numberValue, handleOnChangeNumber }) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name: <input
          value={nameValue}
          onChange={handleOnChangeName}
        />
      </div>
      <div>
        number: <input
          value={numberValue}
          onChange={handleOnChangeNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm