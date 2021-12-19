import React, { useState } from 'react';
import {
  ItemTab,
  ItemTabType,
  Maneuva,
  ManeuvaType,
  Region,
  Resource,
  Timing,
} from '../models';
import { v4 as uuidv4 } from 'uuid';
import ManeuvaRow from './maneuvaRow';
import ResourceRow from './resourceRow';
import Modal from 'react-modal';

type TabProps = {
  tab: ItemTab;
  setItemTab: (tab: ItemTab) => void;
};

const customStyles = {
  content: {
    width: '80%',
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Tab(props: TabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importsText, setImportsText] = useState('');
  const [remainsText, setRemainsText] = useState<Array<string>>([]);
  let content = null;
  if (props.tab.tabType === ItemTabType.ManeuvaTab) {
    const items = props.tab.items as Array<Maneuva>;
    const rows = items.map((x) => {
      return (
        <ManeuvaRow
          key={x.uuid}
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
            const newItems = props.tab.items
              .filter((item) => item.uuid !== uuid)
              .map((item, index) => {
                item.position = index;
                return item;
              });
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
              <th className='bg-gray-300 p-1 w-10'>寵愛</th>
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
          key={x.uuid}
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
  const remains =
    remainsText.length === 0 ? (
      <div></div>
    ) : (
      <div className='bg-red-400 p-1 text-xs'>
        <h3 className='font-bold'>以下の行のインポートに失敗しました。</h3>
        {remainsText.map((x) => {
          return <p key={uuidv4()}>{x}</p>;
        })}
      </div>
    );
  return (
    <div>
      {props.tab.tabType === ItemTabType.ManeuvaTab ? (
        <button
          className='text-xs border border-black p-1 m-1 rounded'
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          マニューバインポート
        </button>
      ) : (
        <span></span>
      )}
      {content}
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        onRequestClose={() => {
          setImportsText('');
          setRemainsText([]);
          setIsModalOpen(false);
        }}
        ariaHideApp={false}
      >
        <h2>マニューバインポート</h2>
        <p>
          以下のテキストボックスにマニューバのテキストを貼り付けてください。
        </p>
        <p>複数貼り付ける場合は、改行で区切って下さい。</p>
        <div>
          <textarea
            className='border border-black w-full text-xs p-1'
            rows={10}
            value={importsText}
            onInput={(e) => {
              setImportsText(e.currentTarget.value);
            }}
          ></textarea>
        </div>
        {remains}
        <div>
          <button
            className='m-1 p-1 rounded border border-black'
            onClick={() => {
              const { imported, remains } = importManeuva(importsText);
              if (imported.length > 0) {
                const newTab = { ...props.tab };
                newTab.items = newTab.items
                  .concat(imported)
                  .map((item, index) => {
                    item.position = index;
                    return item;
                  });
                props.setItemTab(newTab);
              }
              if (remains.length > 0) {
                setRemainsText(remains);
              } else {
                setRemainsText([]);
                setIsModalOpen(false);
              }
              setImportsText('');
            }}
          >
            OK
          </button>
          <button
            className='m-1 p-1 rounded border border-black'
            onClick={() => {
              setImportsText('');
              setRemainsText([]);
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

const effectRegex = new RegExp(
  '^<LPAREN>(.+)<RPAREN>エフェクト<LLPAREN>([^<>]+)<LRPAREN>([^/<>]+)/([^<>]+)<COLON>(.+)$',
);
const otherRegex = new RegExp(
  '^<LPAREN>(.+)<RPAREN>([^<>]+)<BAR>([^<>]+)<LLPAREN>(.+?)<LRPAREN>([^/<>]+)/([^<>]+)<COLON>(.+)$',
);
const hokanjyoRegex = new RegExp(
  '^<MLPAREN>([^<>]*)<MRPAREN>\\s*(.*?)\\s*<COLON>\\s*([^<>]*)\\s*<COLON>\\s*([^<>]*)\\s*<COLON>\\s*([^<>]*)\\s*<COLON>\\s*(.*)$',
);
const skillRegex = new RegExp(
  '^<MLPAREN>(.+)<MRPAREN>([^/<>]+)/([^/<>]+)/([^<>]+)<COLON>(.+)$',
);
const partRegex = new RegExp(
  '^([^<>]+)<MLPAREN>(.+)<MRPAREN>([^/<>]+)/([^/<>]+)/([^<>]+)<COLON>(.+)$',
);
const selfRegex = new RegExp(
  '^(.+)<BAR>(.+)<BAR>(.+)<BAR>(.+)<BAR>(.+)<BAR>(.+)<BAR>(.+)<BAR>(.+)<BAR>(.*)$',
);

function importManeuva(content: string) {
  const contents = content.split('\n').filter((x) => x !== '');
  const imported: Array<Maneuva> = [];
  const remains: Array<string> = [];
  contents.forEach((row, index) => {
    const normalEscaped = normalEscape(row);
    const hokanojyoEscaped = hokanojyoEscape(row);
    const partsEscaped = partsEscape(row);
    if (effectRegex.test(normalEscaped)) {
      const matchResult = normalEscaped.match(effectRegex) || [];
      const [_all, malice, name, cost, range, description] = matchResult;
      imported.push({
        uuid: uuidv4(),
        used: false,
        lost: false,
        maneuvaType: ManeuvaType.Effect,
        malice: +malice,
        category: '0',
        name: unescape(name),
        timing: Timing.AutoAlways,
        cost: unescape(cost),
        range: unescape(range),
        description: unescape(description),
        from: '',
        region: Region.NoRegion,
        position: index,
      });
      return;
    } else if (otherRegex.test(normalEscaped)) {
      const matchResult = normalEscaped.match(otherRegex) || [];
      const [_all, malice, region, timing, name, cost, range, description] =
        matchResult;
      imported.push({
        uuid: uuidv4(),
        used: false,
        lost: false,
        maneuvaType: timingToManeuvaType(timing),
        malice: +malice,
        category: '0',
        name: unescape(name),
        timing: stringToTiming(timing),
        cost: unescape(cost),
        range: unescape(range),
        description: unescape(description),
        from: '',
        region: stringToRegion(region),
        position: index,
      });
      return;
    } else if (hokanjyoRegex.test(hokanojyoEscaped)) {
      const matchResult = hokanojyoEscaped.match(hokanjyoRegex) || [];
      const [_all, region, name, timing, cost, range, description] =
        matchResult;
      imported.push({
        uuid: uuidv4(),
        used: false,
        lost: false,
        maneuvaType: regionToManeuvaType(region),
        category: '0',
        name: unescape(name),
        timing: stringToTiming(timing),
        cost: unescape(cost),
        range: unescape(range),
        description: unescape(description),
        from: '',
        region: stringToRegion(region),
        position: index,
      });
      return;
    } else if (skillRegex.test(normalEscaped)) {
      const matchResult = normalEscaped.match(skillRegex) || [];
      const [_all, name, timing, cost, range, description] = matchResult;
      imported.push({
        uuid: uuidv4(),
        used: false,
        lost: false,
        maneuvaType: ManeuvaType.Skill,
        category: '0',
        name: unescape(name),
        timing: stringToTiming(timing),
        cost: unescape(cost),
        range: unescape(range),
        description: unescape(description),
        from: '',
        region: Region.NoRegion,
        position: index,
      });
      return;
    } else if (partRegex.test(partsEscaped)) {
      const matchResult = partsEscaped.match(partRegex) || [];
      const [_all, region, name, timing, cost, range, description] =
        matchResult;
      imported.push({
        uuid: uuidv4(),
        used: false,
        lost: false,
        maneuvaType: ManeuvaType.Part,
        category: '0',
        name: unescape(name),
        timing: stringToTiming(timing),
        cost: unescape(cost),
        range: unescape(range),
        description: unescape(description),
        from: '',
        region: stringToRegion(region),
        position: index,
      });
      return;
    } else if (selfRegex.test(normalEscaped)) {
      const matchResult = normalEscaped.match(skillRegex) || [];
      const [
        _all,
        malice,
        region,
        maneuvaType,
        _category,
        name,
        timing,
        cost,
        range,
        description,
      ] = matchResult;
      imported.push({
        uuid: uuidv4(),
        used: false,
        lost: false,
        malice: +malice,
        maneuvaType: stringToManeuvaType(maneuvaType),
        category: '0',
        name: unescape(name),
        timing: stringToTiming(timing),
        cost: unescape(cost),
        range: unescape(range),
        description: unescape(description),
        from: '',
        region: stringToRegion(region),
        position: index,
      });
      return;
    }
    remains.push(row);
  });
  return {
    imported: imported,
    remains: remains,
  };
}
function stringToManeuvaType(str: string) {
  switch (str.trim()) {
    case 'アーカイブ':
      return ManeuvaType.Archive;
    case 'スキル':
      return ManeuvaType.Skill;
    case 'アイテム':
      return ManeuvaType.Item;
    case 'パーツ':
      return ManeuvaType.Part;
    case 'エフェクト':
      return ManeuvaType.Effect;
    case 'タグ':
      return ManeuvaType.Tag;
    case 'エアリアル':
      return ManeuvaType.Aerial;
    default:
      return ManeuvaType.Part;
  }
}
function regionToManeuvaType(region: string) {
  switch (region.trim()) {
    case 'なし':
      return ManeuvaType.Part;
    case '頭':
      return ManeuvaType.Part;
    case '腕':
      return ManeuvaType.Part;
    case '胴':
      return ManeuvaType.Part;
    case '脚':
      return ManeuvaType.Part;
    case '足':
      return ManeuvaType.Part;
    case '少女':
      return ManeuvaType.Part;
    case 'ポジション':
      return ManeuvaType.Skill;
    case 'メインクラス':
      return ManeuvaType.Skill;
    case 'サブクラス':
      return ManeuvaType.Skill;
    default:
      return ManeuvaType.Skill;
  }
}
function timingToManeuvaType(timing: string) {
  switch (timing.trim()) {
    case 'アーカイブ':
      return ManeuvaType.Archive;
    default:
      return ManeuvaType.Part;
  }
}
function stringToRegion(str: string) {
  switch (str.trim()) {
    case 'なし':
      return Region.NoRegion;
    case '頭':
      return Region.Head;
    case '胴':
      return Region.Body;
    case '脚':
      return Region.Leg;
    case '足':
      return Region.Leg;
    case '少女':
      return Region.Girl;
    default:
      return Region.OtherRegion;
  }
}
function stringToTiming(str: string) {
  switch (str.trim()) {
    case 'オート':
      return Timing.AutoAlways;
    case 'オート(常時)':
      return Timing.AutoAlways;
    case 'オート(宣言)':
      return Timing.AutoNeedsDeclearation;
    case 'オート(その他)':
      return Timing.AutoOthers;
    case 'アクション':
      return Timing.Action;
    case 'ジャッジ':
      return Timing.Judge;
    case 'ダメージ':
      return Timing.Damage;
    case 'ラピッド':
      return Timing.Rapid;
    case 'ラピット':
      return Timing.Rapid;
    case 'ファストラピッド':
      return Timing.FastRapid;
    case '戦闘開始前':
      return Timing.BeforeBattle;
    case '戦闘開始時':
      return Timing.BattleStart;
    case 'ターン開始':
      return Timing.TurnStart;
    case 'カウント開始':
      return Timing.CountStart;
    default:
      return Timing.AutoAlways;
  }
}
function unescape(text: string) {
  return text
    .replaceAll('<LPAREN>', '(')
    .replaceAll('<RPAREN>', ')')
    .replaceAll('<LLPAREN>', '【')
    .replaceAll('<LRPAREN>', '】')
    .replaceAll('<MLPAREN>', '[')
    .replaceAll('<MRPAREN>', ']')
    .replaceAll('<COLON>', '：')
    .replaceAll('<BAR>', '｜');
}

function partsEscape(text: string) {
  const normalized = text.normalize('NFKC');
  const normalizedBeforeColon = normalized
    .replaceAll('(', '<LPAREN>')
    .replaceAll(')', '<RPAREN>')
    .replaceAll('[', '<MLPAREN>')
    .replaceAll(']', '<MRPAREN>')
    .replaceAll('【', '<LLPAREN>')
    .replaceAll('】', '<LRPAREN>');
  const mrParenIndex = normalizedBeforeColon.indexOf('<MRPAREN>');
  const colonEscaped =
    normalizedBeforeColon
      .slice(0, mrParenIndex)
      .replaceAll(':', '<ESCAPED_COLON>') +
    normalizedBeforeColon.slice(mrParenIndex);
  return colonEscaped
    .replaceAll(':', '<COLON>')
    .replaceAll('|', '<BAR>')
    .replaceAll(' ', '')
    .replaceAll('<ESCAPED_COLON>', '：');
}

function hokanojyoEscape(text: string) {
  const normalized = text.normalize('NFKC');
  const normalizedBeforeColon = normalized
    .replaceAll('[', '<MLPAREN>')
    .replaceAll(']', '<MRPAREN>');
  const mrParenIndex = normalizedBeforeColon.indexOf('<MRPAREN>');
  const splitAtIndex =
    mrParenIndex == -1 ? normalizedBeforeColon.length : mrParenIndex;
  const colonEscaped =
    normalizedBeforeColon
      .slice(0, splitAtIndex)
      .replaceAll(':', '<ESCAPED_COLON>') +
    normalizedBeforeColon.slice(splitAtIndex);
  return colonEscaped
    .replaceAll(':', '<COLON>')
    .replaceAll('|', '<BAR>')
    .replaceAll(' ', '')
    .replaceAll('<ESCAPED_COLON>', '：');
}

function normalEscape(text: string) {
  const normalized = text.normalize('NFKC');
  const normalizedBeforeColon = normalized
    .replaceAll('(', '<LPAREN>')
    .replaceAll(')', '<RPAREN>')
    .replaceAll('[', '<MLPAREN>')
    .replaceAll(']', '<MRPAREN>')
    .replaceAll('【', '<LLPAREN>')
    .replaceAll('】', '<LRPAREN>');
  const lrParenIndex = normalizedBeforeColon.indexOf('<LRPAREN>');
  const colonEscaped =
    normalizedBeforeColon
      .slice(0, lrParenIndex)
      .replaceAll(':', '<ESCAPED_COLON>') +
    normalizedBeforeColon.slice(lrParenIndex);
  return colonEscaped
    .replaceAll(':', '<COLON>')
    .replaceAll('|', '<BAR>')
    .replaceAll(' ', '')
    .replaceAll('<ESCAPED_COLON>', '：');
}

export default Tab;
