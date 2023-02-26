import { Board } from '../Interfaces/kanban';

const getRandomNumber = (): number => (Date.now() + Math.random() * 2);

export const KanbanMockData: Board[] = [
    {
        id: getRandomNumber(),
        title: "To Do",
        cards: [
            {
                id: getRandomNumber(),
                title: "Task 1"     
            },
            {
                id: getRandomNumber(),
                title: "Task 2"
            },
            {
                id: getRandomNumber(),
                title: "Task 3"
            }
            
        ]
    },
    {
        id: getRandomNumber(),
        title: "In Progess",
        cards: [
            {
                id: getRandomNumber(),
                title: "Task 4"
            }         
        ]
    },
    {
        id: getRandomNumber(),
        title: "Completed",
        cards: [
            {
                id: getRandomNumber(),
                title: "Task 5"
            },
            {
                id: getRandomNumber(),
                title: "Task 6"
            }
        ]
    }
]