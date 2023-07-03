import server from '../index';
import request from 'supertest';

describe('Test Payout Routes', () => {
    afterEach(() => {
        server.close();
    });

    it('POST /payouts 200', async () => {
        const response = await request(server)
            .post('/payouts')
            .send({
                expenses: [
                    { traveller_name: 'TEST_1', expense: 5 },
                    { traveller_name: 'TEST_2', expense: 5 },
                    { traveller_name: 'TEST_3', expense: 5 },
                    { traveller_name: 'TEST_4', expense: 5 },
                    { traveller_name: 'TEST_5', expense: 5 },
                    { traveller_name: 'TEST_5', expense: 5 },
                ],
            });

        expect(response.statusCode).toEqual(200);
    });

    it('POST /payouts valid body', async () => {
        const response = await request(server)
            .post('/payouts')
            .send({
                expenses: [
                    { traveller_name: 'TEST_1', expense: 5 },
                    { traveller_name: 'TEST_2', expense: 5 },
                    { traveller_name: 'TEST_3', expense: 5 },
                    { traveller_name: 'TEST_4', expense: 5 },
                    { traveller_name: 'TEST_5', expense: 5 },
                    { traveller_name: 'TEST_5', expense: 5 },
                ],
            });
        expect(response.body).toMatchObject({
            total: 30,
            equalShare: 6,
            payouts: [
                {
                    traveller_name: 'TEST_4',
                    traveller_owed: 'TEST_5',
                    amount: 1,
                },
                {
                    traveller_name: 'TEST_3',
                    traveller_owed: 'TEST_5',
                    amount: 1,
                },
                {
                    traveller_name: 'TEST_2',
                    traveller_owed: 'TEST_5',
                    amount: 1,
                },
                {
                    traveller_name: 'TEST_1',
                    traveller_owed: 'TEST_5',
                    amount: 1,
                },
            ],
        });
    });

    it('POST /payouts 400', async () => {
        const response = await request(server).post('/payouts').send({});

        expect(response.statusCode).toEqual(400);
    });

    it('POST /payouts invalid request body', async () => {
        const response = await request(server).post('/payouts').send({});

        expect(response.body).toMatchObject({
            status: 'failed',
            message: 'malformed data',
        });
    });
});
