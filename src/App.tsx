// App.tsx
import './App.css';
import { JournalList } from './JournalList';
import { ToDoList } from './ToDoList';

function App() {
  return (
      <div className="app-container">
        <div className="journal-list">
          <JournalList />
        </div>
        <div className="todo-list">
          <ToDoList />
        </div>
      </div>
    );
}

export default App;