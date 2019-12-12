var expect  = require('chai').expect;
var request = require('request');

describe('Test cases for user and products API', function() {
    
    it('should assert products', async (done) => { 
        request({url: 'http://localhost:3000/users/login', method: 'POST', json: {email: 'a@b.c', password: 'pass'}}, async function(err, res, body){
            let id = body.user._id;

            request(`http://localhost:3000/${id}/products`, function(error, response, body){
                let data = JSON.parse(body)['data']
                expect(data[0].name).to.equal('Printer')
                expect(data[1].name).to.equal('Screen')
            })
        })

        done();
    })
});