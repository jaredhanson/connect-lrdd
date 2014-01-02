# connect-lrdd

[![Build](https://travis-ci.org/jaredhanson/connect-lrdd.png)](https://travis-ci.org/jaredhanson/connect-lrdd)
[![Coverage](https://coveralls.io/repos/jaredhanson/connect-lrdd/badge.png)](https://coveralls.io/r/jaredhanson/connect-lrdd)
[![Quality](https://codeclimate.com/github/jaredhanson/connect-lrdd.png)](https://codeclimate.com/github/jaredhanson/connect-lrdd)
[![Dependencies](https://david-dm.org/jaredhanson/connect-lrdd.png)](https://david-dm.org/jaredhanson/connect-lrdd)


Link-based Resource Descriptor Document (LRDD) middleware middleware for [Connect](http://senchalabs.github.com/connect/)
and [Express](http://expressjs.com/).

LRDD is a mechanism used to discover metadata about resources available on the
Internet.  It defines the protocol and document formats used for other discovery
protocols such as [Web Host Metadata](http://tools.ietf.org/html/rfc6415) and
[WebFinger](http://code.google.com/p/webfinger/).

## Install

    $ npm install connect-lrdd

## Usage

#### Middleware

To service LRDD requests, use `lrdd.descriptor()` middleware in your application.

    app.get('/lrdd', lrdd.descriptor(function(uri, done) {
      Resource.findByUri({ uri: uri }, function (err, resource) {
        if (err) { return done(err); }
        var desc = new lrdd.Descriptor(uri);
        // add properties and links to descriptor...
        return done(null, desc);
      });
    }));

The function supplied to `lrdd.descriptor()` takes `uri` and a `done` callback
as arguments.  `uri` identifies a resource available at the host.  `done` is a
callback which should be called with descriptor for the resource.  If an
exception occurred, `err` should be set.

## Examples

For a complete, working example, refer to the [host-meta example](https://github.com/jaredhanson/connect-lrdd/tree/master/examples/host-meta).

## Tests

    $ npm install
    $ npm test

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2014 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
