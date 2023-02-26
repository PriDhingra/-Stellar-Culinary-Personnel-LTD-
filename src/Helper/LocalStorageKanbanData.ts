import { KanbanMockData } from './DummyData';
import { Board } from '../Interfaces/kanban';

export class KanbanBoardAPI {
    //Fetch Data from local storage, othewise get dummy data from DummyData.ts file
    fetchBoardData = async (): Promise<Board[]> => {
        const DummyData: Board[] = KanbanMockData;
        let BoardData: Board[] = [];
        if (localStorage.getItem('kanban-board')) {
            const localStorageData: Board[] = JSON.parse(
                localStorage.getItem('kanban-board') ?? "",
            );
            BoardData = [...localStorageData];
        } else {
            BoardData = [...DummyData];
            updateLocalStorageBoards(BoardData);
        }
        return BoardData;
    }
}

//Fetch Kanban Board Data
export const fetchKanbanBoardData = async (): Promise<Board[]> => {
    const KanbanBoard = new KanbanBoardAPI();
    return KanbanBoard.fetchBoardData();
};

//Update local storage data
export const updateLocalStorageBoards = (boards: Board[]) => localStorage.setItem('kanban-board', JSON.stringify(boards));
  