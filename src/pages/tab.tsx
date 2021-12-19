import React, { useState } from 'react';
import { ItemTab, ItemTabType, Maneuva, Resource } from '../models';
import { v4 as uuidv4 } from 'uuid';
import ManeuvaRow from './maneuvaRow';
import ResourceRow from './resourceRow';

type TabProps = {
  tab: ItemTab;
  setItemTab: (tab: ItemTab) => void;
};

enum ItemTabMode {
  Normal,
  Text,
}

function Tab(props: TabProps) {
  const [pageMode, setPageMode] = useState(ItemTabMode.Normal);
  let content = null;
  if (pageMode === ItemTabMode.Normal) {
    if (props.tab.tabType === ItemTabType.ManeuvaTab) {
      const header = (
        <div className='table-row' key={uuidv4()}>
          <div className='bg-gray-300 p-1 m-1 table-cell'>No.</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>損傷</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>使用</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>悪意</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>行動値</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>カテゴリ</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>部位</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>種別</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>名前</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>タイミング</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>コスト</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>射程</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>効果</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>取得先</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>寵愛</div>
        </div>
      );
      const items = props.tab.items as Array<Maneuva>;
      const rows = items.map((x) => {
        return (
          <ManeuvaRow
            maneuva={x}
            setManeuva={(maneuva) => {
              const newTab = { ...props.tab };
              const newItems = props.tab.items.map((item) => {
                if (item.uuid === maneuva.uuid) {
                  return maneuva;
                }
                return item;
              }) as Array<Maneuva> | Array<Resource>;
              newTab.items = newItems;
              props.setItemTab(newTab);
            }}
            removeManeuva={(uuid) => {
              const newTab = { ...props.tab };
              const newItems = props.tab.items.filter(
                (item) => item.uuid !== uuid,
              );
              newTab.items = newItems;
              props.setItemTab(newTab);
            }}
            addManeuva={(maneuva) => {
              const newTab = { ...props.tab };
              const prevs = new Array<Maneuva>();
              const nexts = new Array<Maneuva>();
              items.forEach((item) => {
                if (item.position < maneuva.position) {
                  prevs.push(item);
                } else {
                  nexts.push(item);
                }
              });
              newTab.items = prevs
                .concat([maneuva])
                .concat(nexts)
                .map((item, index) => {
                  item.position = index;
                  return item;
                });
              props.setItemTab(newTab);
            }}
          ></ManeuvaRow>
        );
      });
      content = (
        <div>
          <div className='table w-full text-xs'>
            <div className='table-row-group'>{[header].concat(rows)}</div>
          </div>
        </div>
      );
    } else {
      const header = (
        <div className='table-row' key={uuidv4()}>
          <div className='bg-gray-300 p-1 m-1 table-cell'>No.</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>名前</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>説明</div>
          <div className='bg-gray-300 p-1 m-1 table-cell'>寵愛</div>
        </div>
      );
      const items = props.tab.items as Array<Resource>;
      const rows = items.map((x) => {
        return (
          <ResourceRow
            resource={x}
            setResource={(resource) => {
              const newTab = { ...props.tab };
              const newItems = props.tab.items.map((item) => {
                if (item.uuid === resource.uuid) {
                  return resource;
                }
              }) as Array<Maneuva> | Array<Resource>;
              newTab.items = newItems;
              props.setItemTab(newTab);
            }}
            removeResource={(uuid) => {
              const newTab = { ...props.tab };
              const newItems = props.tab.items.filter(
                (item) => item.uuid !== uuid,
              );
              newTab.items = newItems;
              props.setItemTab(newTab);
            }}
            addResource={(resource) => {
              const newTab = { ...props.tab };
              const prevs = new Array<Resource>();
              const nexts = new Array<Resource>();
              items.forEach((item) => {
                if (item.position < resource.position) {
                  prevs.push(item);
                } else {
                  nexts.push(item);
                }
              });
              newTab.items = prevs
                .concat([resource])
                .concat(nexts)
                .map((item, index) => {
                  item.position = index;
                  return item;
                });
              props.setItemTab(newTab);
            }}
          ></ResourceRow>
        );
      });
      content = (
        <div>
          <div className='table w-full text-xs'>
            <div className='table-row-group'>{[header].concat(rows)}</div>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      <button className='border border-black p-1 rounded'></button>
      <div className='w-full text-xs'>{content}</div>
    </div>
  );
}

export default Tab;
