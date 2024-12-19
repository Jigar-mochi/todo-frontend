import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Header from '../../components/header';
import { AppDispatch, RootState } from '../../redux/store';
import { EditNote, handleAddNote, handleDeleteNote, handleFetchNotes } from '../../redux/api/notes/thunk';
import './style.scss';

const ToDoPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, notesListing } = useSelector((state: RootState) => state.notes);
    const [note, setNote] = useState('');
    const [desc, setDesc] = useState('');
    const [noteId, setNoteId] = useState('');

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

    const handleEditNote: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(EditNote({
            body: {
                title: note, description: desc
            },
            id: noteId,
            callBack: handleCallBack
        }));
    };

    const handleCallBack = () => {
        dispatch(handleFetchNotes());
        setNote('');
        setDesc('');
        setNoteId('');
    };

    const handleChangeTodo: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNote(e.target.value);
    };
    const handleChangeDesc: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDesc(e.target.value);
    };

    const accept = (id: string) => {
        dispatch(handleDeleteNote({ id, callBack: handleCallBack }));
    };

    const confirmDelete = (id: string) => {
        confirmDialog({
            message: 'Are you sure you want to delete this note?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            acceptClassName: 'p-button-danger',
            accept: () => accept(id),
        });
    };

    const handleEdit = (id: string, title: string, desc: string) => {
        setNoteId(id);
        setNote(title);
        setDesc(desc);
    };

    return (
        <div className='todo-container'>
            <Header />
            <div className='todo-section-wrapper'>
                <div className='todo-input-wrapper'>
                    <InputText type="text" placeholder="Add title here..." value={note} onChange={handleChangeTodo} />
                    <InputTextarea placeholder="Add description here..." value={desc} onChange={handleChangeDesc} rows={5} cols={30} />
                    <Button
                        loading={loading}
                        disabled={note.length === 0 || desc.length === 0}
                        onClick={noteId ? handleEditNote : handleTodo}
                    >
                        {noteId ? 'Edit' : 'Add'}
                    </Button>
                </div>
                <div className='notes-list-wrapper'>
                    {Array.isArray(notesListing) && notesListing.length > 0 &&
                        notesListing.map((ele) => {
                            return <Card className='notes-wrapper'>
                                <div className='title-wrapper'>
                                    <h3>{ele.title}</h3>
                                    <div className='icons-wrapper'>
                                        <i className="pi pi-file-edit" onClick={() => handleEdit(ele._id, ele.title, ele.description)}></i>
                                        <i className="pi pi-times" onClick={() => confirmDelete(ele._id)}></i>
                                    </div>
                                </div>
                                <p>{ele.description}</p>
                            </Card>;
                        })
                    }
                </div>
            </div>
            <ConfirmDialog />
        </div>
    );
};

export default ToDoPage;