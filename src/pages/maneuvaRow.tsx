import React from 'react';
import { Maneuva, Regret } from '../models';
import { v4 as uuidv4 } from 'uuid';

type ManeuvaRowProps = {
  maneuva: Maneuva;
  setManeuva: (maneuva: Maneuva) => void;
  removeManeuva: (uuid: string) => void;
  addManeuva: (maneuva: Maneuva) => void;
};

function ManeuvaRow(props: ManeuvaRowProps) {
  return (
    <div className='table-row' key={props.maneuva.uuid}>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.position + 1}
      </div>
      <div className='table-cell border border-black p-1'>
        <input
          className=' w-full'
          type='checkbox'
          defaultChecked={props.maneuva.lost}
          onInput={(e) => {
            props.maneuva.lost = e.currentTarget.checked;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </div>
      <div className='table-cell border border-black p-1'>
        <input
          className=' w-full'
          type='checkbox'
          defaultChecked={props.maneuva.used}
          onInput={(e) => {
            props.maneuva.used = e.currentTarget.checked;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.malice}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.act}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.category}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.region}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.maneuvaType}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.name}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.timing}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.cost}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.range}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.description}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.from}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.maneuva.favor}
      </div>
      <div className='table-cell'>
        <button
          className='mx-2'
          onClick={() => {
            props.removeManeuva(props.maneuva.uuid);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ManeuvaRow;
