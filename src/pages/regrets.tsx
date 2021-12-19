import React from 'react';
import { Regret } from '../models';
import { v4 as uuidv4 } from 'uuid';

type RegretsProps = {
  regrets: Regret[];
  setRegrets: (regrets: Regret[]) => void;
};

function Regrets(props: RegretsProps) {
  const header = (
    <div className='table-row' key={uuidv4()}>
      <div className='bg-gray-300 p-1 m-1 table-cell'>対象</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>種類</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>現在値</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>最大値</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>発狂効果</div>
      <div className='bg-gray-300 p-1 m-1 table-cell'>備考</div>
    </div>
  );
  const rows = props.regrets.map((x, i) => {
    return (
      <div className='table-row' key={x.uuid}>
        <div className='table-cell w-40'>
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
        </div>
        <div className='table-cell w-40'>
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
        </div>
        <div className='table-cell w-20'>
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
        </div>
        <div className='table-cell w-20'>
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
        </div>
        <div className='table-cell w-40'>
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
        </div>
        <div className='table-cell w-80'>
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
        </div>
        <div className='table-cell w-10'>
          <button
            className='mx-2'
            onClick={() => {
              const newRegrets = props.regrets.filter(
                (reg) => reg.uuid !== x.uuid,
              );
              props.setRegrets(newRegrets);
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
          ＋
        </button>
      </div>
    </div>
  );
}

export default Regrets;
