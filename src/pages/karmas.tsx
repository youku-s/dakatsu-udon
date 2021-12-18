import React, { useState, useEffect } from 'react';
import { Karma } from '../models';
import { v4 as uuidv4 } from 'uuid';

type KarmasProps = {
  karmas: Karma[];
  setKarmas: (karmas: Karma[]) => void;
};

function Karmas(props: KarmasProps) {
  const header = (
    <div className='table-row' key={uuidv4()}>
      <div className='bg-gray-300 p-1 m-1 table-cell'>達成</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>条件</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>詳細</div>
    </div>
  );
  const rows = props.karmas.map((x, i) => {
    return (
      <div className='table-row' key={x.uuid}>
        <div className='table-cell w-10'>
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
        </div>
        <div className='table-cell w-40'>
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
        </div>
        <div className='table-cell w-80'>
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
        </div>
        <div className='table-cell w-10'>
          <button
            className='mx-2'
            onClick={() => {
              const newKarmas = props.karmas.filter(
                (kar) => kar.uuid !== x.uuid,
              );
              props.setKarmas(newKarmas);
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
          ＋
        </button>
      </div>
    </div>
  );
}

export default Karmas;
