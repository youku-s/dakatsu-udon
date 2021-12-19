import React from 'react';
import { Memory } from '../models';
import { v4 as uuidv4 } from 'uuid';

type MemoriesProps = {
  memories: Memory[];
  setMemories: (memories: Memory[]) => void;
};

function Memories(props: MemoriesProps) {
  const header = (
    <div className='table-row' key={uuidv4()}>
      <div className='bg-gray-300 p-1 m-1 table-cell'>名前</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>詳細</div>
    </div>
  );
  const rows = props.memories.map((x, i) => {
    return (
      <div className='table-row' key={x.uuid}>
        <div className='table-cell w-1/6'>
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
        </div>
        <div className='table-cell w-4/6'>
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
        </div>
        <div className='table-cell w-1/6'>
          <button
            className='mx-2'
            onClick={() => {
              const newMemories = props.memories.filter(
                (m) => m.uuid !== x.uuid,
              );
              props.setMemories(newMemories);
            }}
          >
            ✕
          </button>
        </div>
      </div>
    );
  });
  const content = [header].concat(rows);
  return (
    <div>
      <div className='table w-full text-xs'>
        <div className='table-row-group'>{content}</div>
        <button
          onClick={() => {
            const newMemories = [
              ...props.memories,
              { uuid: uuidv4(), name: '', description: '' },
            ];
            props.setMemories(newMemories);
          }}
        >
          ＋
        </button>
      </div>
    </div>
  );
}

export default Memories;
