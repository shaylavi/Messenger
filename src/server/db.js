/**
 * Database to hold all chat messages -
 * Separated to be able to be switched with other technologies.
 */

module.exports =
    {messages : [{
        username: 'shay',
        message: 'test1',
        status: 'sent',
        dirty:false
    }, {
        username: 'shay',
        message: 'test3',
        status: 'sent',
        dirty:false
    }, {
        username: 'shay',
        message: 'test5',
        status: 'sent',
        dirty:false
    }, {
        username: 'ziv',
        message: 'message from ziv',
        status: 'sent',
        dirty:false
    }, {
        username: 'ziv',
        message: 'hey',
        status: 'sent',
        dirty:false
    }, {
        username: 'shay',
        message: 'hows it going?',
        status: 'rejected',
        dirty:false
    }, {
        username: 'joe',
        message: 'great',
        status: 'deleted',
        dirty:false
    }],
     illegalWords: [
        'trump', 'insane', 'bomb', 'terror' 
    ]}
