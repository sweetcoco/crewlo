exports.index = {
    auth: false,
    handler: function (request, reply) {
        reply.file('front/index.html');
    }
};

exports.indexLocal = {
    auth: false,
    handler: {
        directory: {
            path: 'crewlo-frontend/dist'
        }
    }
};
