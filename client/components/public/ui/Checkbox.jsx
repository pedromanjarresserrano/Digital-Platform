import React from 'react'

export const CheckBox = props => {
  return (
    <li className={props.liClassName}>
      <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} className={props.className} /> {props.label}
    </li>
  )
}

export default CheckBox