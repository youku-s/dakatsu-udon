import React from 'react';
import { Sheet } from '../models';
import Memories from './memories';
import Regrets from './regrets';
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
      <div className='bg-gray-400 p-1 rounded m-1'>メモ</div>
    </div>
  );
}

export default ProfileTab;
