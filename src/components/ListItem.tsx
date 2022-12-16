import styles from './ListItem.module.css';
import {Trash} from "phosphor-react";
import {ChangeEvent, useState} from 'react';

interface ListItemProps{
    id: number,
    description: string,
    onDeleteToDo: (id: number) => void,
    onDone: (id: number) => void,
    totalDone: number
}
export function ListItem({id, description, onDeleteToDo, onDone, totalDone} : ListItemProps){
    const [done, setDone] = useState(false);

    function handleDeleteToDo(){
        onDeleteToDo(id);
        done && onDone(totalDone - 1); 
    }
    function handleToggleToDoAsDone(event: ChangeEvent<HTMLInputElement>){
        setDone(event.target.checked);
        event.target.checked ? onDone(totalDone+1) : onDone(totalDone-1) 
    }
    return (
        <div className={styles.listItem}>
            <input type="checkbox" onChange={handleToggleToDoAsDone}/>
            <p className={done ? styles.done : ''}>{description}</p>
            <Trash size={14} onClick={handleDeleteToDo}/>
        </div>
    );
}