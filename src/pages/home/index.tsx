import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Header from '../../components/header';
import { AppDispatch, RootState } from '../../redux/store';
import { handleAddNote, handleFetchNotes } from '../../redux/api/notes/thunk';
import './style.scss';

const ToDoPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, notesListing } = useSelector((state: RootState) => state.notes);
    const [note, setNote] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        dispatch(handleFetchNotes());
    }, []);

    const handleTodo: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(handleAddNote({
            body: {
                title: note, description: desc
            }, callBack: handleCallBack
        }));
    };

    const handleCallBack = () => {
        dispatch(handleFetchNotes());
        setNote('');
        setDesc('');
    };

    const handleChangeTodo: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNote(e.target.value);
    };
    const handleChangeDesc: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDesc(e.target.value);
    };

    return (
        <div className='todo-container'>
            <Header />
            <div className='todo-section-wrapper'>
                <div className='todo-input-wrapper'>
                    <InputText type="text" placeholder="Add title here..." value={note} onChange={handleChangeTodo} />
                    <InputTextarea placeholder="Add description here..." value={desc} onChange={handleChangeDesc} rows={5} cols={30} />
                    <Button loading={loading} disabled={note.length === 0 || desc.length === 0} onClick={handleTodo} >Add</Button>
                </div>
                <div className='notes-list-wrapper'>
                    {Array.isArray(notesListing) && notesListing.length > 0 &&
                        notesListing.map((ele) => {
                            return <Card className='notes-wrapper'>
                                <h3>{ele.title}</h3>
                                <p>{ele.description}</p>
                            </Card>;
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ToDoPage;