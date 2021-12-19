import { NextPage } from 'next';
import { Sheet, Profile, Place, ItemTab } from '../models';
import ProfileTab from './profile';
import Tab from './tab';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { CloseOutline } from 'react-ionicons';

enum TabType {
  Profile,
  Classes,
  Favors,
  Other,
}

interface CurrentTab {
  tabType: TabType;
  uuid?: string;
}

function isTabSelected(current: CurrentTab, target: CurrentTab) {
  return current.tabType == target.tabType && current.uuid == target.uuid;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<CurrentTab>({
    tabType: TabType.Profile,
  });
  const [tag, setTag] = useState('');
  const [sheet, setSheet] = useState({
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
  } as Sheet);
  const [content, setContent] = useState(
    <ProfileTab sheet={sheet} updateSheet={setSheet} />,
  );
  useEffect(() => {
    if (process.env.IS_LOCAL) {
      const dummyData = {
        uuid: '2b49a41c-f2a4-4a79-81c5-fe1be29f466c',
        isPrivate: false,
        tags: [],
        profile: {
          name: 'youku_s',
          race: 'player',
          age: '',
          place: 'Garden',
          height: '',
          weight: '',
          implication: '',
          hair: '',
          eye: '',
          skin: '',
          memo: '',
          memories: [
            {
              uuid: '1b5b1505-6a0f-476c-9050-0d21f1294068',
              name: '',
              description: '',
            },
            {
              uuid: 'a819004c-5404-4ceb-91f9-c7e4af32e9b0',
              name: '',
              description: '',
            },
          ],
          regrets: [
            {
              uuid: 'b2fbe407-3944-49df-b38f-11e8a9f8d97c',
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
              uuid: '2c3752df-f381-4ef9-859d-8748b4a5cbbe',
              achieved: false,
              name: '記憶のカケラを獲得する',
              description: '',
            },
          ],
        },
        favors: [
          { uuid: '33f5dd6e-b70b-464c-b703-b070892d045b', memo: '' },
          { uuid: '486c5aa7-42e6-47be-84c1-6137be1339d2', memo: '' },
          { uuid: 'e45662f0-7009-470f-82a0-f6d7094b0a02', memo: '' },
        ],
        usedFavors: [
          {
            uuid: '4c02a943-ba03-4979-8024-cf65dbbe44db',
            purpose: '',
            favor: 0,
            memo: '',
          },
          {
            uuid: 'ab370eca-55a1-4be2-aba3-3137ddb9b0ca',
            purpose: '',
            favor: 0,
            memo: '',
          },
        ],
        classes: {
          positions: [
            { uuid: 'e893ba02-86fa-4930-8f4c-d80bac122a23', name: '' },
          ],
          subPositions: [
            { uuid: '8b412708-90cb-4299-9efe-29579bf3bbc4', name: '' },
          ],
          highTechs: [
            { uuid: '6fbd637a-88a3-48f9-8264-824d24705616', name: '' },
          ],
          classes: [
            {
              uuid: '9b8cc382-7f0c-4bc0-bb56-0e171d29676a',
              category: 'MainClass',
              from: '初期',
              name: '',
              number: 1,
            },
            {
              uuid: 'cbecfa70-7ee3-4eb5-86a2-548f3204563e',
              category: 'SubClass',
              from: '初期',
              name: '',
              number: 1,
            },
          ],
          points: [
            { uuid: '754e31bb-1df9-430f-b50f-35e08138ee12', name: '' },
            { uuid: '9e5ed8a6-9e68-4298-a490-edfd33f892e9', name: '' },
            { uuid: '121ad514-7dce-40f3-b01c-8e3e6357d1aa', name: 'ボーナス' },
          ],
        },
        tabs: [
          {
            uuid: 'fc1e70f9-3d60-44fb-8e43-ba39cb6924cf',
            title: 'マニューバ',
            tabType: 'ManeuvaTab',
            items: [
              {
                uuid: '4e47cf4d-dd18-4cdb-9642-f67b0708bba4',
                used: false,
                lost: false,
                maneuvaType: 'Skill',
                category: '0',
                name: '',
                timing: 'AutoAlways',
                cost: '',
                range: '',
                description: '',
                from: '',
                region: 'NoRegion',
                position: 0,
              },
            ],
          },
        ],
      } as Sheet;
      setSheet(dummyData);
      return;
    }
    const matchResult = router.asPath.match(/#([a-z0-9\-]+)/) || [];
    if (1 < matchResult.length) {
      const hash = matchResult[1];
      const fetchData = async () => {
        const res = await fetch(`${process.env.ENDPOINT}/${hash}`);
        const data = (await res.json()) as Sheet;
        setSheet(data);
      };
      fetchData();
    }
  }, []);
  useEffect(() => {
    if (currentTab.tabType == TabType.Profile) {
      setContent(<ProfileTab sheet={sheet} updateSheet={setSheet} />);
      return;
    }

    const tab = sheet.tabs.find((x) => x.uuid === currentTab.uuid);
    if (tab === undefined) {
      setContent(<ProfileTab sheet={sheet} updateSheet={setSheet} />);
      return;
    }
    setContent(
      <Tab
        tab={tab as ItemTab}
        setItemTab={(tab) => {
          const newSheet = { ...sheet };
          const newTabs = sheet.tabs.map((item) => {
            if (item.uuid === tab.uuid) {
              return tab;
            }
            return item;
          });
          newSheet.tabs = newTabs;
          setSheet(newSheet);
        }}
      />,
    );
  }, [currentTab, sheet]);
  return (
    <div className='m-5'>
      <div className='w-full text-xs border-solid border border-black rounded p-3 m-1'>
        <table className='table-fixed border-separate'>
          <tbody>
            <tr>
              <td className='bg-gray-400 p-1 m-1 w-24'>パスワード</td>
              <td className='m-1 p-1 w-36'>
                <input
                  type='password'
                  className='shadow appearance-none border border-black rounded w-full p-1'
                ></input>
              </td>
              <td className='m-1 p-1'>
                <button className='shadow bg-gray-300 rounded p-1'>保存</button>
              </td>
            </tr>
            <tr>
              <td className='bg-gray-400 p-1 m-1'>タグ</td>
              <td className='m-1 p-1'>
                <input
                  type='text'
                  className='shadow border border-black rounded w-full p-1'
                  value={tag}
                  placeholder='Enterで追加できます'
                  onInput={(e) => {
                    setTag(e.currentTarget.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const newSheet = { ...sheet };
                      newSheet.tags = [...sheet.tags, tag];
                      setSheet(newSheet);
                      setTag('');
                    }
                  }}
                ></input>
              </td>
              <td className='p-1'>
                {sheet.tags.map((x) => {
                  return (
                    <span
                      className='m-1 p-1 rounded bg-green-200'
                      key={uuidv4()}
                      onDoubleClick={() => {
                        const newSheet = { ...sheet };
                        newSheet.tags = newSheet.tags.filter((t) => t !== x);
                        setSheet(newSheet);
                      }}
                    >
                      {x}
                    </span>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='inline-block m-1 w-full'>
        <ul className='align-top m-0'>
          <li
            className={`inline-block rounded border border-black rounded-b-none p-1 ${
              isTabSelected(currentTab, { tabType: TabType.Profile })
                ? 'bg-white -mb-px'
                : 'bg-gray-300'
            }`}
            style={
              isTabSelected(currentTab, { tabType: TabType.Profile })
                ? { borderBottom: 'none' }
                : {}
            }
            onClick={() => setCurrentTab({ tabType: TabType.Profile })}
          >
            パーソナル
          </li>
          {sheet.tabs.map((tab, index) => {
            return (
              <li
                className={`inline-block rounded border border-black rounded-b-none p-1 ${
                  isTabSelected(currentTab, {
                    tabType: TabType.Other,
                    uuid: tab.uuid,
                  })
                    ? 'bg-white -mb-px'
                    : 'bg-gray-300'
                }`}
                style={
                  isTabSelected(currentTab, {
                    tabType: TabType.Other,
                    uuid: tab.uuid,
                  })
                    ? { borderBottom: 'none' }
                    : {}
                }
                key={index}
                onClick={() =>
                  setCurrentTab({ tabType: TabType.Other, uuid: tab.uuid })
                }
              >
                {tab.title}
              </li>
            );
          })}
        </ul>
        <div className='border-solid border border-black rounded rounded-tl-none p-3'>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Home;
