import React, { useRef, useState } from 'react';
import { Maneuva, ManeuvaType, Region, Timing } from '../models';
import { v4 as uuidv4 } from 'uuid';
import {
  AddOutline,
  CloseOutline,
  LockClosedOutline,
  PencilOutline,
} from 'react-ionicons';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { DnDItems } from '../dnd/dndItems';

type ManeuvaRowProps = {
  maneuva: Maneuva;
  setManeuva: (maneuva: Maneuva) => void;
  removeManeuva: (uuid: string) => void;
  addManeuva: (maneuva: Maneuva) => void;
  moveManeuva: (drag: string, hovered: string) => void;
};

function regionToString(region: Region) {
  switch (region) {
    case Region.NoRegion:
      return 'なし';
    case Region.Head:
      return '頭';
    case Region.Arm:
      return '腕';
    case Region.Body:
      return '胴';
    case Region.Leg:
      return '脚';
    case Region.Girl:
      return '少女';
    case Region.OtherRegion:
      return 'その他';
    default:
      return 'なし';
  }
}

function maneuvaTypeToString(maneuvaType: ManeuvaType) {
  switch (maneuvaType) {
    case ManeuvaType.Skill:
      return 'スキル';
    case ManeuvaType.Part:
      return 'パーツ';
    case ManeuvaType.Item:
      return 'アイテム';
    case ManeuvaType.Effect:
      return 'エフェクト';
    case ManeuvaType.Archive:
      return 'アーカイブ';
    case ManeuvaType.Tag:
      return 'タグ';
    case ManeuvaType.Aerial:
      return 'エアリアル';
    default:
      return 'その他';
  }
}

function timingToString(timing: Timing) {
  switch (timing) {
    case Timing.AutoAlways:
      return 'オート(常時)';
    case Timing.AutoNeedsDeclearation:
      return 'オート(宣言)';
    case Timing.AutoOthers:
      return 'オート(その他)';
    case Timing.Action:
      return 'アクション';
    case Timing.Judge:
      return 'ジャッジ';
    case Timing.Damage:
      return 'ダメージ';
    case Timing.Rapid:
      return 'ラピッド';
    case Timing.FastRapid:
      return 'ファストラピッド';
    case Timing.BeforeBattle:
      return '戦闘開始前';
    case Timing.BattleStart:
      return '戦闘開始時';
    case Timing.TurnStart:
      return 'ターン開始時';
    case Timing.CountStart:
      return 'カウント開始時';
    default:
      return 'その他';
  }
}

enum RowMode {
  View,
  Edit,
}

export type DropResult = {
  rowNumber: number;
};

function ManeuvaRow(props: ManeuvaRowProps) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: DnDItems.Maneuva,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: Maneuva, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.position;
      const hoverIndex = props.maneuva.position;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.moveManeuva(item.uuid, props.maneuva.uuid);
      item.position = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DnDItems.Maneuva,
    item: () => {
      return props.maneuva;
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [mode, setMode] = useState<RowMode>(RowMode.View);
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  if (mode === RowMode.View) {
    return (
      <tr ref={ref} style={{ opacity }} key={props.maneuva.uuid}>
        <td className='border border-gray-300 p-1 truncate'>
          {props.maneuva.position + 1}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          <input
            className=' w-full'
            type='checkbox'
            defaultChecked={props.maneuva.lost}
            onInput={(e) => {
              props.maneuva.lost = e.currentTarget.checked;
              props.setManeuva(props.maneuva);
            }}
          ></input>
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          <input
            className=' w-full'
            type='checkbox'
            defaultChecked={props.maneuva.used}
            onInput={(e) => {
              props.maneuva.used = e.currentTarget.checked;
              props.setManeuva(props.maneuva);
            }}
          ></input>
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.maneuva.malice}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {regionToString(props.maneuva.region)}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {maneuvaTypeToString(props.maneuva.maneuvaType)}
        </td>
        <td
          title={props.maneuva.name}
          className='border border-gray-300 p-1 truncate'
        >
          {props.maneuva.name}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {timingToString(props.maneuva.timing)}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.maneuva.cost}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.maneuva.range}
        </td>
        <td
          title={props.maneuva.description}
          className='border border-gray-300 p-1 truncate'
        >
          {props.maneuva.description}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.maneuva.favor}
        </td>

        <td className='align-middle text-center'>
          {props.maneuva.position !== 0 ? (
            <button
              className='mx-2'
              onClick={() => {
                props.removeManeuva(props.maneuva.uuid);
              }}
            >
              <CloseOutline height='1rem' width='1rem'></CloseOutline>
            </button>
          ) : (
            <button className='mx-2'>
              <LockClosedOutline height='1rem' width='1rem'></LockClosedOutline>
            </button>
          )}
        </td>
        <td className='align-middle'>
          <button
            className='mx-2'
            onClick={() => {
              props.addManeuva({
                uuid: uuidv4(),
                used: false,
                lost: false,
                maneuvaType: ManeuvaType.Skill,
                category: '0',
                name: '',
                timing: Timing.AutoAlways,
                cost: '',
                range: '',
                description: '',
                from: '',
                region: Region.NoRegion,
                position: props.maneuva.position + 1,
              });
            }}
          >
            <AddOutline height='1rem' width='1rem'></AddOutline>
          </button>
        </td>
        <td className='align-middle'>
          <button
            className='mx-2'
            onClick={() => {
              setMode(RowMode.Edit);
            }}
          >
            <PencilOutline height='1rem' width='1rem'></PencilOutline>
          </button>
        </td>
      </tr>
    );
  }
  return (
    <tr
      ref={ref}
      style={{ opacity }}
      className='bg-yellow-300'
      key={props.maneuva.uuid}
    >
      <td className='border border-gray-300 p-1'>
        {props.maneuva.position + 1}
      </td>
      <td className='border border-gray-300 p-1'>
        <input
          className=' w-full'
          type='checkbox'
          defaultChecked={props.maneuva.lost}
          onInput={(e) => {
            props.maneuva.lost = e.currentTarget.checked;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td className='border border-gray-300 p-1'>
        <input
          className=' w-full'
          type='checkbox'
          defaultChecked={props.maneuva.used}
          onInput={(e) => {
            props.maneuva.used = e.currentTarget.checked;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td className='border border-gray-300'>
        <input
          className=' w-full'
          type='number'
          defaultValue={props.maneuva.malice}
          onInput={(e) => {
            props.maneuva.malice = +e.currentTarget.value;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td className='border border-gray-300 p-1 truncate'>
        <select
          className='border border-black p-1'
          defaultValue={props.maneuva.region}
          onInput={(e) => {
            props.maneuva.region = e.currentTarget.value as Region;
            props.setManeuva(props.maneuva);
          }}
        >
          <option value={Region.NoRegion}>なし</option>
          <option value={Region.Head}>頭</option>
          <option value={Region.Arm}>腕</option>
          <option value={Region.Body}>胴</option>
          <option value={Region.Leg}>脚</option>
          <option value={Region.Girl}>少女</option>
          <option value={Region.OtherRegion}>その他</option>
        </select>
      </td>
      <td className='border border-gray-300 p-1 truncate'>
        <select
          className='border border-black p-1'
          defaultValue={props.maneuva.maneuvaType}
          onInput={(e) => {
            props.maneuva.maneuvaType = e.currentTarget.value as ManeuvaType;
            props.setManeuva(props.maneuva);
          }}
        >
          <option value={ManeuvaType.Skill}>スキル</option>
          <option value={ManeuvaType.Part}>パーツ</option>
          <option value={ManeuvaType.Item}>アイテム</option>
          <option value={ManeuvaType.Effect}>エフェクト</option>
          <option value={ManeuvaType.Archive}>アーカイブ</option>
          <option value={ManeuvaType.Tag}>タグ</option>
          <option value={ManeuvaType.Aerial}>エアリアル</option>
        </select>
      </td>
      <td
        title={props.maneuva.name}
        className='border border-gray-300 p-1 truncate'
      >
        <input
          className=' w-full'
          type='text'
          defaultValue={props.maneuva.name}
          onInput={(e) => {
            props.maneuva.name = e.currentTarget.value;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td className='border border-gray-300 p-1 truncate'>
        <select
          className='border border-black p-1'
          defaultValue={props.maneuva.timing}
          onInput={(e) => {
            props.maneuva.timing = e.currentTarget.value as Timing;
            props.setManeuva(props.maneuva);
          }}
        >
          <option value={Timing.AutoAlways}>オート(常時)</option>
          <option value={Timing.AutoNeedsDeclearation}>オート(宣言)</option>
          <option value={Timing.AutoOthers}>オート(その他)</option>
          <option value={Timing.Action}>アクション</option>
          <option value={Timing.Judge}>ジャッジ</option>
          <option value={Timing.Damage}>ダメージ</option>
          <option value={Timing.Rapid}>ラピッド</option>
          <option value={Timing.FastRapid}>ファストラピッド</option>
          <option value={Timing.BeforeBattle}>戦闘開始前</option>
          <option value={Timing.BattleStart}>戦闘開始時</option>
          <option value={Timing.TurnStart}>ターン開始</option>
          <option value={Timing.CountStart}>カウント開始</option>
        </select>
      </td>
      <td className='border border-gray-300 p-1 truncate'>
        <input
          className=' w-full'
          type='text'
          defaultValue={props.maneuva.cost}
          onInput={(e) => {
            props.maneuva.cost = e.currentTarget.value;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td className='border border-gray-300 p-1 truncate'>
        <input
          className=' w-full'
          type='text'
          defaultValue={props.maneuva.range}
          onInput={(e) => {
            props.maneuva.range = e.currentTarget.value;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td
        title={props.maneuva.description}
        className='border border-gray-300 p-1 truncate'
      >
        <input
          className=' w-full'
          type='text'
          defaultValue={props.maneuva.description}
          onInput={(e) => {
            props.maneuva.description = e.currentTarget.value;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td className='border border-gray-300 p-1 truncate'>
        <input
          className=' w-full'
          type='number'
          defaultValue={props.maneuva.favor}
          onInput={(e) => {
            props.maneuva.favor = +e.currentTarget.value;
            props.setManeuva(props.maneuva);
          }}
        ></input>
      </td>
      <td className='align-middle text-center'>
        {props.maneuva.position !== 0 ? (
          <button
            className='mx-2'
            onClick={() => {
              props.removeManeuva(props.maneuva.uuid);
            }}
          >
            <CloseOutline height='1rem' width='1rem'></CloseOutline>
          </button>
        ) : (
          <button className='mx-2'>
            <LockClosedOutline height='1rem' width='1rem'></LockClosedOutline>
          </button>
        )}
      </td>
      <td className='align-middle'>
        <button
          className='mx-2'
          onClick={() => {
            props.addManeuva({
              uuid: uuidv4(),
              used: false,
              lost: false,
              maneuvaType: ManeuvaType.Skill,
              category: '0',
              name: '',
              timing: Timing.AutoAlways,
              cost: '',
              range: '',
              description: '',
              from: '',
              region: Region.NoRegion,
              position: props.maneuva.position + 1,
            });
          }}
        >
          <AddOutline height='1rem' width='1rem'></AddOutline>
        </button>
      </td>
      <td className='align-middle'>
        <button
          className='mx-2'
          onClick={() => {
            setMode(RowMode.View);
          }}
        >
          <PencilOutline height='1rem' width='1rem'></PencilOutline>
        </button>
      </td>
    </tr>
  );
}

export default ManeuvaRow;
