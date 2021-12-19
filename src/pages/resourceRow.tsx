import React from 'react';
import { Maneuva, Regret, Resource } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { AddOutline, CloseOutline } from 'react-ionicons';

type ResourceRowProps = {
  resource: Resource;
  setResource: (resource: Resource) => void;
  removeResource: (uuid: string) => void;
  addResource: (resource: Resource) => void;
};

function ResourceRow(props: ResourceRowProps) {
  return (
    <div className='table-row' key={props.resource.uuid}>
      <div className='table-cell border border-black p-1'>
        {props.resource.position + 1}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.resource.name}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.resource.description}
      </div>
      <div className='table-cell border border-black p-1'>
        {props.resource.favor}
      </div>
      <div className='table-cell'>
        <button
          className='mx-2'
          onClick={() => {
            props.removeResource(props.resource.uuid);
          }}
        >
          <CloseOutline height='1rem' width='1rem'></CloseOutline>
        </button>
      </div>
    </div>
  );
}

export default ResourceRow;
