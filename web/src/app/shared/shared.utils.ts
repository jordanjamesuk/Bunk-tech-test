import { iTraveller } from './shared.interfaces';
import { v4 as uuid4 } from 'uuid';

// Mock traveller data
export const create_mock_object = (): iTraveller[] => {
    return [
        {
            id: uuid4(),
            traveller_name: 'Jordan',
            expense: 5.0,
        },
        {
            id: uuid4(),
            traveller_name: 'Alex',
            expense: 10.0,
        },
        {
            id: uuid4(),
            traveller_name: 'Jakob',
            expense: 1.0,
        },
        {
            id: uuid4(),
            traveller_name: 'Jakob',
            expense: 500.0,
        },
    ];
};
