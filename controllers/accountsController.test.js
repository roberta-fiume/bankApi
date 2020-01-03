const accountsController = require('./accountsController.js');
const httpMocks = require("node-mocks-http");

describe('accounts controller', () => {
    it('should return Hello in the response', () => {
        //Given 
        const mockRequest = httpMocks.createRequest();
        const mockResponse = httpMocks.createResponse();
        //When
        accountsController.getHello(mockRequest, mockResponse);
        //Then
        expect(mockResponse._getData()).toBe('HELLO');
    });
  });