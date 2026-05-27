function NoteItem({note}){
    return (
        <div>
        <div>{note.title}</div>
        <p>{note.content}</p>
        </div>
    );

}

export default NoteItem;