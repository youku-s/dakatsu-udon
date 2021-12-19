import React from 'react';
import { Regret } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { AddOutline, CloseOutline } from 'react-ionicons';

type RegretsProps = {
  regrets: Regret[];
  setRegrets: (regrets: Regret[]) => void;
};

function Regrets(props: RegretsProps) {
  const rows = props.regrets.map((x, i) => {
    return (
      <tr key={x.uuid}>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='text'
            defaultValue={x.target}
            onInput={(e) => {
              x.target = e.currentTarget.value;
              const newRegrets = props.regrets.map((reg) => {
                if (reg.uuid === x.uuid) {
                  return x;
                }
                return reg;
              });
              props.setRegrets(newRegrets);
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
              const newRegrets = props.regrets.map((reg) => {
                if (reg.uuid === x.uuid) {
                  return x;
                }
                return reg;
              });
              props.setRegrets(newRegrets);
            }}
          ></input>
        </td>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='number'
            defaultValue={x.currentVal}
            onInput={(e) => {
              x.currentVal = +e.currentTarget.value;
              const newRegrets = props.regrets.map((reg) => {
                if (reg.uuid === x.uuid) {
                  return x;
                }
                return reg;
              });
              props.setRegrets(newRegrets);
            }}
          ></input>
        </td>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='number'
            defaultValue={x.maxVal}
            onInput={(e) => {
              x.maxVal = +e.currentTarget.value;
              const newRegrets = props.regrets.map((reg) => {
                if (reg.uuid === x.uuid) {
                  return x;
                }
                return reg;
              });
              props.setRegrets(newRegrets);
            }}
          ></input>
        </td>
        <td>
          <input
            className='border border-black p-1 w-full'
            type='text'
            defaultValue={x.negative}
            onInput={(e) => {
              x.negative = e.currentTarget.value;
              const newRegrets = props.regrets.map((reg) => {
                if (reg.uuid === x.uuid) {
                  return x;
                }
                return reg;
              });
              props.setRegrets(newRegrets);
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
              const newRegrets = props.regrets.map((reg) => {
                if (reg.uuid === x.uuid) {
                  return x;
                }
                return reg;
              });
              props.setRegrets(newRegrets);
            }}
          ></input>
        </td>
        <td className='talign-middle'>
          <button
            className='mx-2'
            onClick={() => {
              const newRegrets = props.regrets.filter(
                (reg) => reg.uuid !== x.uuid,
              );
              props.setRegrets(newRegrets);
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
            <th className='bg-gray-300 p-1 w-32'>対象</th>
            <th className='bg-gray-300 p-1 w-32'>種類</th>
            <th className='bg-gray-300 p-1 w-16'>現在値</th>
            <th className='bg-gray-300 p-1 w-16'>最大値</th>
            <th className='bg-gray-300 p-1 w-32'>発狂効果</th>
            <th className='bg-gray-300 p-1 w-60'>備考</th>
            <th className='bg-gray-300 p-1 w-5'></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <button
        onClick={() => {
          const newRegrets = [
            ...props.regrets,
            {
              uuid: uuidv4(),
              target: '',
              name: '',
              currentVal: 3,
              maxVal: 4,
              negative: '',
              description: '',
            },
          ];
          props.setRegrets(newRegrets);
        }}
      >
        <AddOutline height='1rem' width='1rem'></AddOutline>
      </button>
    </div>
  );
}

export default Regrets;
