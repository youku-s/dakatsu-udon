import React from 'react';
import { Sheet, Place } from '../models';

type PersonalProps = {
  sheet: Sheet;
  updateSheet: (sheet: Sheet) => void;
};

function Personal(props: PersonalProps) {
  return (
    <div>
      <div className='table w-full text-xs'>
        <div className='table-row-group'>
          <div className='table-row'>
            <div className='bg-gray-300 p-1 m-1 table-cell'>キャラクター名</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={55}
                type='text'
                defaultValue={props.sheet.profile.name}
                onInput={(e) => {
                  props.sheet.profile.name = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className='table w-full text-xs mb-1'>
        <div className='table-row-group'>
          <div className='table-row'>
            <div className='bg-gray-300 p-1 m-1 table-cell'>種族</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.race}
                onInput={(e) => {
                  props.sheet.profile.race = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
            <div className='bg-gray-300 p-1 m-1 table-cell'>享年</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.age}
                onInput={(e) => {
                  props.sheet.profile.age = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
            <div className='bg-gray-300 p-1 m-1 table-cell'>初期配置</div>
            <div className='table-cell'>
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
            </div>
          </div>
          <div className='table-row'>
            <div className='bg-gray-300 p-1 m-1 table-cell'>身長</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.height}
                onInput={(e) => {
                  props.sheet.profile.height = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
            <div className='bg-gray-300 p-1 m-1 table-cell'>体重</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.weight}
                onInput={(e) => {
                  props.sheet.profile.weight = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
            <div className='bg-gray-300 p-1 m-1 table-cell'>暗示</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.implication}
                onInput={(e) => {
                  props.sheet.profile.implication = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
          </div>
          <div className='table-row'>
            <div className='bg-gray-300 p-1 m-1 table-cell'>髪の色</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.hair}
                onInput={(e) => {
                  props.sheet.profile.hair = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
            <div className='bg-gray-300 p-1 m-1 table-cell'>瞳の色</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.eye}
                onInput={(e) => {
                  props.sheet.profile.eye = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
            <div className='bg-gray-300 p-1 m-1 table-cell'>肌の色</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                size={16}
                type='text'
                defaultValue={props.sheet.profile.skin}
                onInput={(e) => {
                  props.sheet.profile.skin = e.currentTarget.value;
                  props.updateSheet(props.sheet);
                }}
              ></input>
            </div>
          </div>
          <div className='table-row'>
            <div className='bg-gray-300 p-1 m-1 table-cell'>最大行動値</div>
            <div className='table-cell'>
              <input
                className='border border-black p-1'
                type='number'
                readOnly={true}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;
