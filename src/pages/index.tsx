import type { NextPage } from 'next';
import fetch from 'node-fetch';
import { Sheet, Place } from '../models';
import { v4 as uuidv4 } from 'uuid';

const Home: NextPage<Sheet> = (sheet) => {
  return (
    <div className='flex m-10'>
      <div className='flex-initial inline-block border-solid border border-black rounded p-3 m-1'>
        <div className='bg-gray-400 p-1 rounded m-1'>パスワード</div>
        <div className='m-1'>
          <input
            type='password'
            className='shadow appearance-none border border-black rounded w-full py-2 px-3'
          ></input>
        </div>
        <div className='m-1'>
          <button className='shadow bg-gray-300 rounded p-1'>保存</button>
        </div>
        <div className='bg-gray-400 p-1 rounded m-1'>出力</div>
        <div className='m-1'>
          <button className='shadow bg-gray-300 rounded p-1'>Text出力</button>
        </div>
        <div className='bg-gray-400 p-1 rounded m-1'>タグ</div>
        <div className='m-1'>タグは以下に入力し、Enterで追加できます。</div>
        <div className='m-1'>
          <input
            type='text'
            className='shadow border border-black rounded w-full py-2 px-3'
          ></input>
        </div>
      </div>
      <div className='flex-auto inline-block m-1'>
        <ul className='align-top'>
          <li className='inline-block rounded border-solid border border-black border-b-0 rounded-b-none p-1'>
            パーソナル
          </li>
          <li className='inline-block rounded border-solid border border-black border-b-0 rounded-b-none p-1'>
            パーソナル
          </li>
        </ul>
        <div className='border-solid border border-black rounded p-3'></div>
      </div>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const hash = window.location.hash;
  if (!hash) {
    return {
      uuid: uuidv4(),
      isPrivate: false,
      tags: [],
      favors: [],
      usedFavors: [],
      tabs: [],
      profile: {
        name: '',
        race: '',
        age: '',
        place: Place.Purgatory,
        height: '',
        weight: '',
        implication: '',
        hair: '',
        eye: '',
        skin: '',
        memo: '',
        memories: [],
        regrets: [
          {
            uuid: uuidv4(),
            target: 'たからもの',
            name: '依存',
            currentVal: 3,
            maxVal: 4,
            negative: '最大行動値減少(-2)',
            description: 'パーツとして所持。破壊で狂気点+1',
          },
        ],
        karmas: [
          {
            uuid: uuidv4(),
            achieved: false,
            name: '記憶のカケラを獲得する',
            description: '',
          },
        ],
      },
      classes: {
        positions: [],
        subPositions: [],
        highTechs: [],
        classes: [],
        points: [],
      },
    };
  }
  const uuid = hash.split('/')[1];
  const res = await fetch(`${process.env.ENDPOINT}/${uuid}`);
  return (await res.json()) as Sheet;
};

export default Home;
