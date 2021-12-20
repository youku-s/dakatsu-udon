import React, { useRef, useState } from 'react';
import { Resource } from '../models';
import { v4 as uuidv4 } from 'uuid';
import {
  AddOutline,
  CloseOutline,
  LockClosedOutline,
  PencilOutline,
} from 'react-ionicons';
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';
import { DnDItems } from '../dnd/dndItems';

type ResourceRowProps = {
  resource: Resource;
  setResource: (resource: Resource) => void;
  removeResource: (uuid: string) => void;
  addResource: (resource: Resource) => void;
  moveResource: (drag: string, hovered: string) => void;
};

enum RowMode {
  View,
  Edit,
}

function ResourceRow(props: ResourceRowProps) {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: DnDItems.Resource,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: Resource, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.position;
      const hoverIndex = props.resource.position;
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
      props.moveResource(item.uuid, props.resource.uuid);
      item.position = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DnDItems.Resource,
    item: () => {
      return props.resource;
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
      <tr ref={ref} style={{ opacity }} key={props.resource.uuid}>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.position + 1}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.name}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.description}
        </td>
        <td className='border border-gray-300 p-1 truncate'>
          {props.resource.favor}
        </td>
        <td className='align-middle text-center'>
          {props.resource.position !== 0 ? (
            <button
              className='mx-2'
              onClick={() => {
                props.removeResource(props.resource.uuid);
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
              props.addResource({
                uuid: uuidv4(),
                name: '',
                description: '',
                position: props.resource.position + 1,
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
      key={props.resource.uuid}
    >
      <td className='border border-gray-300 p-1'>
        {props.resource.position + 1}
      </td>
      <td
        title={props.resource.name}
        className='border border-gray-300 p-1 truncate'
      >
        <input
          className=' w-full'
          type='text'
          defaultValue={props.resource.name}
          onInput={(e) => {
            props.resource.name = e.currentTarget.value;
            props.setResource(props.resource);
          }}
        ></input>
      </td>
      <td
        title={props.resource.description}
        className='border border-gray-300 p-1 truncate'
      >
        <input
          className=' w-full'
          type='text'
          defaultValue={props.resource.description}
          onInput={(e) => {
            props.resource.description = e.currentTarget.value;
            props.setResource(props.resource);
          }}
        ></input>
      </td>
      <td className='border border-gray-300 p-1 truncate'>
        <input
          className=' w-full'
          type='number'
          defaultValue={props.resource.favor}
          onInput={(e) => {
            props.resource.favor = +e.currentTarget.value;
            props.setResource(props.resource);
          }}
        ></input>
      </td>
      <td className='align-middle text-center'>
        {props.resource.position !== 0 ? (
          <button
            className='mx-2'
            onClick={() => {
              props.removeResource(props.resource.uuid);
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
            props.addResource({
              uuid: uuidv4(),
              name: '',
              description: '',
              position: props.resource.position + 1,
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

export default ResourceRow;
