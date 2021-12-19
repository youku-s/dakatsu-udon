import React from 'react';
import { Sheet, Place } from '../models';

type PersonalProps = {
  sheet: Sheet;
  updateSheet: (sheet: Sheet) => void;
};

function Personal(props: PersonalProps) {
  return (
    <div>
      <table className='table-fixed text-xs border-separate'>
        <tr>
          <th className='bg-gray-300 p-1'>キャラクター名</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.name}
              onInput={(e) => {
                props.sheet.profile.name = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th className='bg-gray-300 p-1'>種族</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.race}
              onInput={(e) => {
                props.sheet.profile.race = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
          <th className='bg-gray-300 p-1'>享年</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.age}
              onInput={(e) => {
                props.sheet.profile.age = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
          <th className='bg-gray-300 p-1'>初期配置</th>
          <td>
            <select
              className='border border-black p-1'
              defaultValue={props.sheet.profile.place}
              onInput={(e) => {
                props.sheet.profile.place = e.currentTarget.value as Place;
                props.updateSheet(props.sheet);
              }}
            >
              <option value={Place.Purgatory}>煉獄</option>
              <option value={Place.Garden}>花園</option>
              <option value={Place.Paradise}>楽園</option>
            </select>
          </td>
        </tr>
        <tr>
          <th className='bg-gray-300 p-1'>身長</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.height}
              onInput={(e) => {
                props.sheet.profile.height = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
          <th className='bg-gray-300 p-1'>体重</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.weight}
              onInput={(e) => {
                props.sheet.profile.weight = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
          <th className='bg-gray-300 p-1'>暗示</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.implication}
              onInput={(e) => {
                props.sheet.profile.implication = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
        </tr>
        <tr className='table-row'>
          <th className='bg-gray-300 p-1'>髪の色</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.hair}
              onInput={(e) => {
                props.sheet.profile.hair = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
          <th className='bg-gray-300 p-1'>瞳の色</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.eye}
              onInput={(e) => {
                props.sheet.profile.eye = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
          <th className='bg-gray-300 p-1'>肌の色</th>
          <td>
            <input
              className='border border-black p-1'
              type='text'
              defaultValue={props.sheet.profile.skin}
              onInput={(e) => {
                props.sheet.profile.skin = e.currentTarget.value;
                props.updateSheet(props.sheet);
              }}
            ></input>
          </td>
        </tr>
        <tr className='table-row'>
          <th className='bg-gray-300 p-1'>最大行動値</th>
          <td>
            <input
              className='border border-black p-1'
              type='number'
              readOnly={true}
            ></input>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}

export default Personal;
