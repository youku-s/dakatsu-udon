import React from 'react';
import { Karma } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { AddOutline, CloseOutline } from 'react-ionicons';

type KarmasProps = {
  karmas: Karma[];
  setKarmas: (karmas: Karma[]) => void;
};

function Karmas(props: KarmasProps) {
  const rows = props.karmas.map((x, i) => {
    return (
      <tr key={x.uuid}>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='checkbox'
            defaultChecked={x.achieved}
            onInput={(e) => {
              x.achieved = e.currentTarget.checked;
              const newKarmas = props.karmas.map((kar) => {
                if (kar.uuid === x.uuid) {
                  return x;
                }
                return kar;
              });
              props.setKarmas(newKarmas);
            }}
          ></input>
        </td>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='text'
            defaultValue={x.name}
            onInput={(e) => {
              x.name = e.currentTarget.value;
              const newKarmas = props.karmas.map((kar) => {
                if (kar.uuid === x.uuid) {
                  return x;
                }
                return kar;
              });
              props.setKarmas(newKarmas);
            }}
          ></input>
        </td>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='text'
            defaultValue={x.description}
            onInput={(e) => {
              x.description = e.currentTarget.value;
              const newKarmas = props.karmas.map((kar) => {
                if (kar.uuid === x.uuid) {
                  return x;
                }
                return kar;
              });
              props.setKarmas(newKarmas);
            }}
          ></input>
        </td>
        <td className='align-middle'>
          <button
            className='mx-2'
            onClick={() => {
              const newKarmas = props.karmas.filter(
                (kar) => kar.uuid !== x.uuid,
              );
              props.setKarmas(newKarmas);
            }}
          >
            <CloseOutline height='1rem' width='1rem'></CloseOutline>
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <table className='table-fixed text-xs border-separate'>
        <thead>
          <tr>
            <th className='bg-gray-300 p-1 w-10'>達成</th>
            <th className='bg-gray-300 p-1 w-40'>条件</th>
            <th className='bg-gray-300 p-1 w-40'>詳細</th>
            <th className='bg-gray-300 p-1 w-5'></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <button
        onClick={() => {
          const newKarmas = [
            ...props.karmas,
            {
              uuid: uuidv4(),
              achieved: false,
              name: '',
              description: '',
            },
          ];
          props.setKarmas(newKarmas);
        }}
      >
        <AddOutline height='1rem' width='1rem'></AddOutline>
      </button>
    </div>
  );
}

export default Karmas;
