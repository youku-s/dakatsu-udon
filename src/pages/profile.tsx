import React from 'react';
import { Sheet } from '../models';
import Memories from './memories';
import Regrets from './regrets';
import Karmas from './karmas';
import Personal from './personal';

type ProfileTabProps = {
  sheet: Sheet;
  updateSheet: (sheet: Sheet) => void;
};

function ProfileTab(props: ProfileTabProps) {
  return (
    <div>
      <div className='bg-gray-400 p-1 rounded mb-1'>パーソナル</div>
      <Personal sheet={props.sheet} updateSheet={props.updateSheet} />
      <div className='bg-gray-400 p-1 rounded m-1'>記憶のカケラ</div>
      <Memories
        memories={props.sheet.profile.memories}
        setMemories={(memories) => {
          const newSheet = { ...props.sheet };
          newSheet.profile.memories = memories;
          props.updateSheet(newSheet);
        }}
      />
      <div className='bg-gray-400 p-1 rounded m-1'>未練</div>
      <Regrets
        regrets={props.sheet.profile.regrets}
        setRegrets={(regrets) => {
          const newSheet = { ...props.sheet };
          newSheet.profile.regrets = regrets;
          props.updateSheet(newSheet);
        }}
      />
      <div className='bg-gray-400 p-1 rounded m-1'>カルマ</div>
      <Karmas
        karmas={props.sheet.profile.karmas}
        setKarmas={(karmas) => {
          const newSheet = { ...props.sheet };
          newSheet.profile.karmas = karmas;
          props.updateSheet(newSheet);
        }}
      />
      <div className='bg-gray-400 p-1 rounded m-1'>メモ</div>
      <textarea
        className='w-11/12 border border-black p-1 text-xs'
        rows={Math.max(props.sheet.profile.memo.split('\n').length + 1, 5)}
        defaultValue={props.sheet.profile.memo}
        onInput={(e) => {
          const newSheet = { ...props.sheet };
          newSheet.profile.memo = e.currentTarget.value;
          props.updateSheet(newSheet);
        }}
      ></textarea>
    </div>
  );
}

export default ProfileTab;
