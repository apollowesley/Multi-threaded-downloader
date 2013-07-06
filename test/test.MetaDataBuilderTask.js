var should = require('should');
var DataBuilder = require('../lib/core/MetaDataBuilderSyncTask');


describe('MetaDataBuilderSyncTask', function() {

	it('test execute method', function(done) {
		var fileSize = 100,
			url = 'http://a.com/b',
			method = 'GET',
			port = '80',
			threads = {
				start: 0,
				position: 10,
				end: 20
			},
			options = {
				block: 100
			};

		var builder = new DataBuilder(threads, fileSize, url, method, port, options);

		builder.callback = function(err, response) {
			response.position.should.equal(100);
			response.data.length.should.equal(options.block);
			done();
		};
		builder.execute();


	});
});