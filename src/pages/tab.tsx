import React, { useState } from 'react';
import { ItemTab, ItemTabType, Maneuva, Region, Resource } from '../models';
import { v4 as uuidv4 } from 'uuid';
import ManeuvaRow from './maneuvaRow';
import ResourceRow from './resourceRow';

type TabProps = {
  tab: ItemTab;
  setItemTab: (tab: ItemTab) => void;
};

function Tab(props: TabProps) {
  let content = null;
  if (props.tab.tabType === ItemTabType.ManeuvaTab) {
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
        <table className='table-fixed text-xs border-separate w-full'>
          <thead>
            <tr>
              <th className='bg-gray-300 p-1 w-6'>No.</th>
              <th className='bg-gray-300 p-1 w-8'>損傷</th>
              <th className='bg-gray-300 p-1 w-8'>使用</th>
              <th className='bg-gray-300 p-1 w-10'>悪意</th>
              <th className='bg-gray-300 p-1 w-14'>部位</th>
              <th className='bg-gray-300 p-1 w-16'>種別</th>
              <th className='bg-gray-300 p-1 w-24'>名前</th>
              <th className='bg-gray-300 p-1 w-20'>タイミング</th>
              <th className='bg-gray-300 p-1 w-12'>コスト</th>
              <th className='bg-gray-300 p-1 w-12'>射程</th>
              <th className='bg-gray-300 p-1 w-24'>効果</th>
              <th className='bg-gray-300 p-1 w-16'>寵愛</th>
              <th className='bg-gray-300 p-1 w-6'></th>
              <th className='bg-gray-300 p-1 w-6'></th>
              <th className='bg-gray-300 p-1 w-6'></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  } else {
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
        <table className='table-fixed text-xs border-separate w-full'>
          <thead>
            <tr>
              <th className='bg-gray-300 p-1'>No.</th>
              <th className='bg-gray-300 p-1'>名前</th>
              <th className='bg-gray-300 p-1'>説明</th>
              <th className='bg-gray-300 p-1'>寵愛</th>
              <th className='bg-gray-300 p-1 w-6'></th>
              <th className='bg-gray-300 p-1 w-6'></th>
              <th className='bg-gray-300 p-1 w-6'></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  return (
    <div>
      {props.tab.tabType === ItemTabType.ManeuvaTab ? (
        <button
          className='text-xs border border-black p-1 m-1 rounded'
          onClick={() => {}}
        >
          マニューバインポート
        </button>
      ) : (
        <span></span>
      )}
      {content}
    </div>
  );
}

export default Tab;
