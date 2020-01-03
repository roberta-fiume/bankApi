const request = require('supertest');

jest.mock('./controllers/accountsController');

const mockAccountController = require('./controllers/accountsController');

mockAccountController.getHello.mockImplementation(() => {
    console.log("IM INSIDE MOCKKKKKKK");
});

mockAccountController.getHello123.mockImplementation(() => {
    return "omg hello";
});

const router = require('./router').router;
const helloThere = require('./router').helloThere;
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use("/", router);

describe("server test", () => {

    // it("should call getHello when calling helloThere", () => {
    //     //Given
    //     // jest.setTimeout(15000);
    //     //When
    //     helloThere();
    //     //Then
    //     expect(mockAccountController.getHello).toHaveBeenCalled();
    // })

    // it("should get hello", (done) => {
    it("should get hello", async () => {
        //Given
        jest.setTimeout(15000);
        console.log("IM HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE 000000000000");

        //When
        const response = await request(app).get('/hello123');
        console.log("IM HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE 1111111111");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({"hello123": "omg hello"});
        expect(mockAccountController.getHello123).toHaveBeenCalled();
            // .then(() => {
            //     console.log("IM HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE 1111111111");
            //     expect(mockAccountController.getHello).toHaveBeenCalled();
            //     // done();
            // });
        //Then
        // expect(mockAccountsController.getHello).toHaveBeenCalled();
        // expect(mockAccountController.getHello).toHaveBeenCalled();
    })
})