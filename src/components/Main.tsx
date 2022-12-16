import styles from './Main.module.css';
import clipboard from '../assets/Clipboard.svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ListItem } from './ListItem';
import { Plus } from 'phosphor-react';


export function Main() {
    const [toDoItems, setToDoItems] = useState([{
        id: 1,
        description: 'lavar roupa'
    }]);
    const [newToDoItem, setNewToDoItem] = useState('');
    const [count, setCount] = useState(2);
    const [countDone, setCountDone] = useState(0);
    function handleAddToDoItem(event: FormEvent){
        event.preventDefault();
        setToDoItems([...toDoItems, {
            id: count,
            description: newToDoItem
        }]);
        setNewToDoItem('');
        setCount(count+1);
    }
    function handleNewToDoChange(event:ChangeEvent<HTMLInputElement>){
        setNewToDoItem(event.target.value);
    }

    function deleteToDoItem(toDoToDelete: number){
        const toDoWithoutDeletedOne =  toDoItems.filter(toDo => {
            return toDo.id != toDoToDelete;
        })
        setToDoItems(toDoWithoutDeletedOne);
    }
    
    return (
        <main>
            <form className={styles.form} onSubmit={handleAddToDoItem}>
                <input type="text" onChange={handleNewToDoChange} value={newToDoItem} />
                <button type="submit">Criar <Plus size={16} /></button>
            </form>
            <div className={styles.toDoList}>
                <header>
                    <div>
                        <strong className={styles.textBlue}>Tarefas criadas</strong>
                        <span>{toDoItems.length}</span>
                    </div>
                    <div>
                        <strong className={styles.textPurple}>Tarefas concluídas</strong>
                        <span>{countDone}</span>
                    </div>
                </header>
                {
                    toDoItems.length > 0 ?
                    toDoItems.map(item => {
                        return(
                            <ListItem
                                key={item.id}
                                id = {item.id}
                                description = {item.description}
                                onDeleteToDo={deleteToDoItem}
                                onDone={setCountDone}
                                totalDone={countDone}
                            />
                            
                        )
                    }) : 
                    <div className={styles.emptyList}>
                        <img src={clipboard} alt="" className="" />
                        <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                }
            </div>
        </main>
    )
}