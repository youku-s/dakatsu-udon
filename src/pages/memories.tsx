import React from 'react';
import { Memory } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { AddOutline, CloseOutline } from 'react-ionicons';

type MemoriesProps = {
  memories: Memory[];
  setMemories: (memories: Memory[]) => void;
};

function Memories(props: MemoriesProps) {
  const rows = props.memories.map((x, i) => {
    return (
      <tr key={x.uuid}>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='text'
            defaultValue={x.name}
            onInput={(e) => {
              x.name = e.currentTarget.value;
              const newMemories = props.memories.map((mem) => {
                if (mem.uuid === x.uuid) {
                  return x;
                }
                return mem;
              });
              props.setMemories(newMemories);
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
              const newMemories = props.memories.map((mem) => {
                if (mem.uuid === x.uuid) {
                  return x;
                }
                return mem;
              });
              props.setMemories(newMemories);
            }}
          ></input>
        </td>
        <td className='align-middle'>
          <button
            className='mx-2'
            onClick={() => {
              const newMemories = props.memories.filter(
                (m) => m.uuid !== x.uuid,
              );
              props.setMemories(newMemories);
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
            <th className='bg-gray-300 p-1 w-40'>名前</th>
            <th className='bg-gray-300 p-1 w-40'>詳細</th>
            <th className='bg-gray-300 p-1 w-5'></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <button
        onClick={() => {
          const newMemories = [
            ...props.memories,
            { uuid: uuidv4(), name: '', description: '' },
          ];
          props.setMemories(newMemories);
        }}
      >
        <AddOutline height='1rem' width='1rem'></AddOutline>
      </button>
    </div>
  );
}

export default Memories;
