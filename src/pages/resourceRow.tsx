import React, { useState } from 'react';
import { Resource } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { AddOutline, CloseOutline, PencilOutline } from 'react-ionicons';

type ResourceRowProps = {
  resource: Resource;
  setResource: (resource: Resource) => void;
  removeResource: (uuid: string) => void;
  addResource: (resource: Resource) => void;
};

enum RowMode {
  View,
  Edit,
}

function ResourceRow(props: ResourceRowProps) {
  const [mode, setMode] = useState<RowMode>(RowMode.View);
  if (mode === RowMode.View) {
    return (
      <tr key={props.resource.uuid}>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.position + 1}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.name}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.description}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.favor}
        </td>
        <td>
          <button
            className='mx-2'
            onClick={() => {
              props.removeResource(props.resource.uuid);
            }}
          >
            <CloseOutline height='1rem' width='1rem'></CloseOutline>
          </button>
        </td>
        <td className='align-middle'>
          <button
            className='mx-2'
            onClick={() => {
              setMode(RowMode.Edit);
            }}
          >
            <PencilOutline height='1rem' width='1rem'></PencilOutline>
          </button>
        </td>
      </tr>
    );
  }
  return <div></div>;
}

export default ResourceRow;
